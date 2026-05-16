import type { Context } from 'hono'
import { categoriesRepository } from '../repositories/categories.repository.js'
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema.js'

export const categoriesController = {
  // 1. GET /categories (Listar todas)
  getAll: async (c: Context) => {
    const categories = await categoriesRepository.findAll()
    return c.json(categories, 200)
  },

  // 2. GET /categories/:id (Detalle de una)
  getById: async (c: Context) => {
    const id = Number(c.req.param('id'))
    const category = await categoriesRepository.findById(id)
    
    if (!category) {
      return c.json({ error: 'Categoría no encontrada' }, 404)
    }
    
    return c.json(category, 200)
  },

  // 3. POST /categories (Crear una)
  create: async (c: Context) => {
    const body = await c.req.json()
    
    // Validamos con nuestro Schema de Zod
    const result = createCategorySchema.safeParse(body)
    if (!result.success) {
      return c.json({ error: 'Datos inválidos', details: result.error.format() }, 400)
    }

    const newCategory = await categoriesRepository.create(result.data)
    return c.json(newCategory, 201)
  },

  // 4. PATCH /categories/:id (Editar una)
  update: async (c: Context) => {
    const id = Number(c.req.param('id'))
    const body = await c.req.json()

    // Validamos parcialmente con Zod
    const result = updateCategorySchema.safeParse(body)
    if (!result.success) {
      return c.json({ error: 'Datos inválidos', details: result.error.format() }, 400)
    }

    try {
      const updatedCategory = await categoriesRepository.update(id, result.data)
      return c.json(updatedCategory, 200)
    } catch (error) {
      return c.json({ error: 'Categoría no encontrada o no se pudo actualizar' }, 404)
    }
  },

  // 5. DELETE /categories/:id (Eliminar una)
  delete: async (c: Context) => {
    const id = Number(c.req.param('id'))
    
    try {
      await categoriesRepository.remove(id)
      return c.json({ message: 'Categoría eliminada con éxito' }, 200)
    } catch (error) {
      return c.json({ error: 'Categoría no encontrada o contiene transacciones asociadas' }, 400)
    }
  }
}