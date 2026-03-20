import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'specDefinition',
  title: 'Дефиниции на спецификации',
  type: 'document',
  fields: [
    defineField({
      name: 'label_bg',
      title: 'Наименование (BG)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label_en',
      title: 'Label (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Мерна единица',
      type: 'string',
      description: 'напр. kW, dB, L/h — оставете празно ако е включено в стойността',
    }),
  ],

  preview: {
    select: { title: 'label_bg', subtitle: 'label_en' },
  },
})
