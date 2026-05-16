import { z } from 'zod';

// Valida los datos que entran cuando alguien crea una categoría
export const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre de la categoría es requerido').max(50),
});

export const updateCategorySchema = createCategorySchema.partial();

// 💡 Aquí definimos los tipos de TypeScript infiriéndolos de Zod
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;