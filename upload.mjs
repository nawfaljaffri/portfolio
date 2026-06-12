import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'ix8hcmkh',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3szCPHroLkgP6msNB6BUPqd5gOmv6i95HgDSuC5fLuKcA6gztr3R4mhgJDWuo7jkTIkDKH20SkoXiqM5tyhAfCRu3AL92z1velLM1G4Etw5Z4fYJPJyH86te0ShI7gDDq9EEtoUNUU9v9jXWrma2O54bLWpval4xVTMTxx6S8Bqp56ruE4'
})

async function upload() {
  const dir = path.join(__dirname, 'public', 'bulk-posters')
  const files = fs.readdirSync(dir).filter(f => f.match(/\.(png|jpe?g|webp)$/i))
  
  console.log(`Found ${files.length} files.`)
  for (const file of files) {
    try {
      console.log(`Uploading ${file}...`)
      const filePath = path.join(dir, file)
      
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: file
      })
      
      const doc = {
        _type: 'poster',
        title: file.replace(/\.[^/.]+$/, ""),
        image: {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: asset._id
          }
        }
      }
      
      await client.create(doc)
      console.log(`Created poster for ${file}`)
    } catch(err) {
      console.error(`Failed ${file}:`, err)
    }
  }
  console.log('All uploads finished!')
}

upload().catch(console.error)
