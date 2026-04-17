import { Hono } from 'hono'
import { serve } from '@hono/node-server'

// Tipo Transaction
type Transaction = {
  id: number
  description: string
  amount: number
  type: 'income' | 'expense'
}

const app = new Hono()

// Base de datos en memoria
let transactions: Transaction[] = [
  { id: 1, description: 'Salario', amount: 2500, type: 'income' },
  { id: 2, description: 'Compra supermercado', amount: 150, type: 'expense' }
]

let nextId = 3

// GET todos las transacciones
app.get('/transactions', (c) => {
  return c.json(transactions, 200)
})

// GET una transacción por ID
app.get('/transactions/:id', (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const transaction = transactions.find(t => t.id === id)

  if (!transaction) {
    return c.json({ error: 'Transaction not found' }, 404)
  }

  return c.json(transaction, 200)
})

// POST crear transacción
app.post('/transactions', async (c) => {
  const body = await c.req.json() as { description: string, amount: number, type: 'income' | 'expense' }

  // Validar campos
  if (!body.description || !body.amount || !body.type) {
    return c.json({ error: 'Missing required fields' }, 400)
  }

  if (body.type !== 'income' && body.type !== 'expense') {
    return c.json({ error: 'Type must be income or expense' }, 400)
  }

  const newTransaction: Transaction = {
    id: nextId++,
    description: body.description,
    amount: body.amount,
    type: body.type
  }

  transactions.push(newTransaction)
  return c.json(newTransaction, 201)
})

// PUT actualizar transacción
app.put('/transactions/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const body = await c.req.json() as { description?: string, amount?: number, type?: 'income' | 'expense' }

  const transaction = transactions.find(t => t.id === id)

  if (!transaction) {
    return c.json({ error: 'Transaction not found' }, 404)
  }

  // Actualizar solo los campos proporcionados
  if (body.description !== undefined) transaction.description = body.description
  if (body.amount !== undefined) transaction.amount = body.amount
  if (body.type !== undefined) {
    if (body.type !== 'income' && body.type !== 'expense') {
      return c.json({ error: 'Type must be income or expense' }, 400)
    }
    transaction.type = body.type
  }

  return c.json(transaction, 200)
})

// DELETE eliminar transacción
app.delete('/transactions/:id', (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const index = transactions.findIndex(t => t.id === id)

  if (index === -1) {
    return c.json({ error: 'Transaction not found' }, 404)
  }

  const deleted = transactions.splice(index, 1)
  return c.json({ message: 'Transaction deleted', data: deleted[0] }, 200)
})

serve({
  fetch: app.fetch,
  port: 3000
}, () => {
  console.log('Server is running on http://localhost:3000')
})
