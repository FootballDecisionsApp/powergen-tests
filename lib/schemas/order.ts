import { z } from 'zod'

export const OrderCustomerSchema = z.object({
  name: z
    .string()
    .min(3, 'Минимум 3 символа')
    .max(100, 'Максимум 100 символа'),
  email: z
    .string()
    .email('Невалиден имейл адрес'),
  phone: z
    .string()
    .regex(
      /^(\+359|0)\d{8,9}$/,
      'Невалиден телефонен номер — формат: +359XXXXXXXXX или 0XXXXXXXXX'
    ),
  address: z
    .string()
    .min(5, 'Въведете пълен адрес')
    .max(200),
  city: z
    .string()
    .min(2, 'Въведете град')
    .max(100),
  postalCode: z
    .string()
    .regex(/^\d{4}$/, 'Пощенски код трябва да е 4 цифри'),
  notes: z.string().max(500).optional(),
})

export const OrderItemSchema = z.object({
  productId: z.string().min(1),
  quantity:  z.number().int().min(1).max(10),
})

export const OrderSchema = z.object({
  customer: OrderCustomerSchema,
  items:    z.array(OrderItemSchema).min(1, 'Количката е празна'),
})

export type TOrder         = z.infer<typeof OrderSchema>
export type TOrderCustomer = z.infer<typeof OrderCustomerSchema>
export type TOrderItem     = z.infer<typeof OrderItemSchema>
