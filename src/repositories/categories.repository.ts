import { prisma } from '../lib/prisma.js'
import type { Prisma, Category } from '../generated/prisma/client.js'

// Use Prisma generated types for create/update inputs to avoid importing from schema file
type CreateCategoryInput = Prisma.CategoryCreateInput
type UpdateCategoryInput = Prisma.CategoryUpdateInput

interface CategoryRepository {
  findAll:  ()                          => Promise<Category[]>
  findById: (id: number)                => Promise<Category | null>
  create:   (data: CreateCategoryInput) => Promise<Category>
  update:   (id: number, data: UpdateCategoryInput) => Promise<Category> // Añadido para la rúbrica
  remove:   (id: number)                => Promise<void>
}

export const categoriesRepository: CategoryRepository = {
  findAll: () =>
    prisma.category.findMany(),

  findById: (id) =>
    prisma.category.findUnique({ where: { id } }),

  create: (data) =>
    prisma.category.create({ data }),

  update: (id, data) =>
    prisma.category.update({ where: { id }, data }), // Añadido para la rúbrica

  remove: (id) =>
    prisma.category.delete({ where: { id } }).then(() => undefined)
}