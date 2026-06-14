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
      name: 'order',
      title: 'Order (Number)',
      description: 'Lower numbers appear first (e.g. 1, 2, 3). Leave blank to put at the end.',
      type: 'number',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
  ],
})
