import { z } from 'zod'

export const createTransactionSchema = z.object({
  amount: z.number().positive('El monto debe ser un número positivo'),
  type: z.string().refine(val => ['income', 'expense'].includes(val), {
    message: 'El tipo debe ser "income" o "expense"',
  }),
  description: z.string().max(255).optional(),
  categoryId: z.number().int('ID de categoría inválido'),
})

export const updateTransactionSchema = createTransactionSchema.partial()

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>