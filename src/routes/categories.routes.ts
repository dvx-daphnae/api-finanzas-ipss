import { Hono } from 'hono'
import { categoriesController } from '../controllers/categories.controller.js'

export const categoriesRouter = new Hono()

// Mapeo de rutas según la tabla de endpoints esperados en tu rúbrica
categoriesRouter.get('/', categoriesController.getAll)          // GET /categories
categoriesRouter.get('/:id', categoriesController.getById)      // GET /categories/:id
categoriesRouter.post('/', categoriesController.create)         // POST /categories
categoriesRouter.patch('/:id', categoriesController.update)     // PATCH /categories/:id
categoriesRouter.delete('/:id', categoriesController.delete)   // DELETE /categories/:id