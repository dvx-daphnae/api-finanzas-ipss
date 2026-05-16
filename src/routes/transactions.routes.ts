import { Hono } from 'hono'
import { transactionsController } from '../controllers/transactions.controller.js'

export const transactionsRouter = new Hono()

// /balance va antes de /:id para que Hono no se confunda
transactionsRouter.get('/balance', transactionsController.getBalance)
transactionsRouter.get('/', transactionsController.getAll)
transactionsRouter.get('/:id', transactionsController.getById)
transactionsRouter.post('/', transactionsController.create)
transactionsRouter.patch('/:id', transactionsController.update)
transactionsRouter.delete('/:id', transactionsController.delete)