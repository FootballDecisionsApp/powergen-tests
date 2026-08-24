import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Продукти',
  type: 'document',
  groups: [
    { name: 'main',  title: 'Основни данни' },
    { name: 'tech',  title: 'Технически' },
    { name: 'media', title: 'Снимки' },
    { name: 'seo',   title: 'SEO' },
  ],
  fields: [
    // ─── Main ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Наименование (BG)',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'name_en',
      title: 'Name (EN)',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'main',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание (BG)',
      type: 'text',
      rows: 4,
      group: 'main',
    }),
    defineField({
      name: 'description_en',
      title: 'Description (EN)',
      type: 'text',
      rows: 4,
      group: 'main',
    }),
    defineField({
      name: 'priceOnRequest',
      title: 'Цена по запитване',
      type: 'boolean',
      group: 'main',
      initialValue: false,
      description: 'Ако е включено, вместо цена се показва "Поискай оферта" и продуктът не може да се добавя в количката.',
    }),
    defineField({
      name: 'price',
      title: 'Цена (EUR)',
      type: 'number',
      group: 'main',
      description: 'Цена в EUR — напр. 7490. Оставете празно ако е включено „Цена по запитване“.',
      validation: (Rule) =>
        Rule.min(1).custom((price, context) => {
          const priceOnRequest = (context.parent as { priceOnRequest?: boolean } | undefined)?.priceOnRequest
          if (!priceOnRequest && (price === undefined || price === null)) {
            return 'Задължително, освен ако не е включено „Цена по запитване“'
          }
          return true
        }),
    }),
    defineField({
      name: 'oldPrice',
      title: 'Стара цена (EUR)',
      type: 'number',
      group: 'main',
      description: 'Оставете празно ако няма намаление',
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'reference',
      group: 'main',
      to: [{ type: 'category' }],
    }),

    // ─── Technical ────────────────────────────────────────────────────────────
    defineField({
      name: 'powerKW',
      title: 'Мощност (kW)',
      type: 'number',
      group: 'tech',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'powerKVA',
      title: 'Мощност (kVA)',
      type: 'number',
      group: 'tech',
    }),
    defineField({
      name: 'fuelType',
      title: 'Тип гориво',
      type: 'string',
      group: 'tech',
      options: {
        list: [
          { title: 'Дизел',       value: 'diesel' },
          { title: 'Бензин',      value: 'petrol' },
          { title: 'Газ',         value: 'gas' },
          { title: 'Инверторен',  value: 'inverter' },
          { title: 'Регенератор', value: 'regenerator' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phases',
      title: 'Фази',
      type: 'string',
      group: 'tech',
      options: {
        list: [
          { title: '1-фазов', value: '1phase' },
          { title: '3-фазов', value: '3phase' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'inStock',
      title: 'В наличност',
      type: 'boolean',
      group: 'tech',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Препоръчан',
      type: 'boolean',
      group: 'tech',
      initialValue: false,
      description: 'Показва се на началната страница',
    }),
    defineField({
      name: 'autoStart',
      title: 'Автостарт',
      type: 'boolean',
      group: 'tech',
      initialValue: false,
    }),
    defineField({
      name: 'specifications',
      title: 'Спецификации',
      type: 'array',
      group: 'tech',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'definition',
              title: 'Параметър',
              type: 'reference',
              to: [{ type: 'specDefinition' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Стойност',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value_en',
              title: 'Value (EN)',
              type: 'string',
              description:
                'Попълнете само ако стойността съдържа текст на български (напр. "4 (3 линейни, 1 нулева)"). Ако е празно, EN сайтът показва българската стойност.',
            }),
          ],
          preview: {
            select: {
              title:    'definition.label_bg',
              subtitle: 'value',
            },
          },
        },
      ],
    }),

    // ─── Media ────────────────────────────────────────────────────────────────
    defineField({
      name: 'images',
      title: 'Снимки',
      type: 'array',
      group: 'media',
      description: 'Оставете празно, докато няма реални продуктови снимки — сайтът показва схематична илюстрация вместо липсваща снимка.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt текст',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),

    // ─── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      validation: (Rule) => Rule.max(155),
    }),
  ],

  preview: {
    select: {
      title:          'name',
      price:          'price',
      priceOnRequest: 'priceOnRequest',
      media:          'images.0',
    },
    prepare({ title, price, priceOnRequest, media }: { title?: string; price?: number; priceOnRequest?: boolean; media?: string }) {
      return {
        title:    title ?? 'Без наименование',
        subtitle: priceOnRequest ? 'Цена по запитване' : price ? `${price} EUR` : 'Без цена',
        media,
      }
    },
  },
})
