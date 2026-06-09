import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'poster',
  title: 'Poster',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Poster Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
  ],
})
