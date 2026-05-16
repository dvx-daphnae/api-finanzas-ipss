import type { Context } from 'hono'
import { transactionsRepository } from '../repositories/transactions.repository.js'
import { createTransactionSchema, updateTransactionSchema } from '../schemas/transaction.schema.js'

export const transactionsController = {
  // 1. GET /transactions/balance (Balance General) - ¡Va primero para que Hono no lo confunda con un :id!
  getBalance: async (c: Context) => {
    const balanceData = await transactionsRepository.getBalance()
    return c.json(balanceData, 200)
  },

  // 2. GET /transactions (Listar todas)
  getAll: async (c: Context) => {
    const transactions = await transactionsRepository.findAll()
    return c.json(transactions, 200)
  },

  // 3. GET /transactions/:id (Detalle de una)
  getById: async (c: Context) => {
    const id = Number(c.req.param('id'))
    const transaction = await transactionsRepository.findById(id)
    
    if (!transaction) {
      return c.json({ error: 'Transacción no encontrada' }, 404)
    }
    
    return c.json(transaction, 200)
  },

  // 4. POST /transactions (Crear una)
create: async (c: Context) => {
    try {
      const body = await c.req.json();
      const result = createTransactionSchema.safeParse(body);

      if (!result.success) {
        return c.json({ error: 'Validación fallida', details: result.error.format() }, 400);
      }

      const newTransaction = await transactionsRepository.create(result.data);
      return c.json(newTransaction, 201);

    } catch (error: any) {
      console.error("❌ ERROR FINAL EN CONTROLADOR:", error.message);
      return c.json({ 
        error: 'No se pudo crear la transacción', 
        sqlError: error.message 
      }, 500);
    }
  },
  

  // 5. PATCH /transactions/:id (Editar una)
  update: async (c: Context) => {
    const id = Number(c.req.param('id'))
    const body = await c.req.json()

    const result = updateTransactionSchema.safeParse(body)
    if (!result.success) {
      return c.json({ error: 'Datos inválidos', details: result.error.format() }, 400)
    }

    try {
      const updatedTransaction = await transactionsRepository.update(id, result.data)
      return c.json(updatedTransaction, 200)
    } catch (error) {
      return c.json({ error: 'Transacción no encontrada' }, 404)
    }
  },

  // 6. DELETE /transactions/:id (Eliminar una)
  delete: async (c: Context) => {
    const id = Number(c.req.param('id'))
    
    try {
      await transactionsRepository.remove(id)
      return c.json({ message: 'Transacción eliminada con éxito' }, 200)
    } catch (error) {
      return c.json({ error: 'Transacción no encontrada' }, 404)
    }
  }
}