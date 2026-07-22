import { z } from 'zod'

export const ChatMessageSchema = z.object({
  role:    z.enum(['user', 'assistant']),
  content: z.string().min(1).max(500),
})

export const ChatRequestSchema = z.object({
  message: z.string().min(1, 'Съобщението е празно').max(300, 'Максимум 300 символа'),
  history: z.array(ChatMessageSchema).max(6).default([]),
  locale:  z.enum(['bg', 'en']),
})

export type TChatMessage = z.infer<typeof ChatMessageSchema>
export type TChatRequest = z.infer<typeof ChatRequestSchema>
