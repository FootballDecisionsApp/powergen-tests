import { z } from 'zod'

export const ContactMessageSchema = z.object({
  name: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символа'),
  email: z
    .string()
    .email('Невалиден имейл адрес'),
  message: z
    .string()
    .min(10, 'Съобщението трябва да е поне 10 символа')
    .max(2000, 'Максимум 2000 символа'),
})

export type TContactMessage = z.infer<typeof ContactMessageSchema>
