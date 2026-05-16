import { prisma } from '../lib/prisma.js'
import type { CreateTransactionInput, UpdateTransactionInput } from '../schemas/transaction.schema.js'
import type { Transaction } from '../generated/prisma/index.js'

interface TransactionRepository {
  findAll:  ()                             => Promise<Transaction[]>
  findById: (id: number)                   => Promise<Transaction | null>
  create:   (data: CreateTransactionInput) => Promise<Transaction>
  update:   (id: number, data: UpdateTransactionInput) => Promise<Transaction>
  remove:   (id: number)                   => Promise<void>
  getBalance: ()                           => Promise<{ incomes: number; expenses: number; balance: number }>
}

export const transactionsRepository: TransactionRepository = {
  findAll: () =>
    prisma.transaction.findMany({ include: { category: true } }),

  findById: (id) =>
    prisma.transaction.findUnique({ where: { id }, include: { category: true } }),

  create: (data) =>
    prisma.transaction.create({
      data: {
        amount: Number(data.amount),
        type: String(data.type),
        description: data.description,
        categoryId: Number(data.categoryId)
      }
    }),

  update: (id, data) =>
    prisma.transaction.update({ where: { id }, data }),

  remove: (id) =>
    prisma.transaction.delete({ where: { id } }).then(() => undefined),

  getBalance: async () => {
    const transactions = await prisma.transaction.findMany()

    const incomes = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    return { incomes, expenses, balance: incomes - expenses }
  }
}
