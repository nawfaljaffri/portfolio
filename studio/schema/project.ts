import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Artworks', 'Coding', 'Events', 'Design'],
      }
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mockupDevice',
      title: 'Mockup Device',
      type: 'string',
      options: {
        list: [
          { title: 'iPhone', value: 'mockup-iphone' },
          { title: 'iPad', value: 'mockup-ipad' },
          { title: 'Terminal', value: 'terminal' },
          { title: 'Pixel Art', value: 'pixel-art' },
          { title: 'Full/None', value: 'full' }
        ],
        layout: 'radio'
      },
      initialValue: 'full'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image (for Mockup)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    }),
  ],
})
