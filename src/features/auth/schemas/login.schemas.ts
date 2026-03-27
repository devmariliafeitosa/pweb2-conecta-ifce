import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Digite um email válido')
  .endsWith('@ifce.edu.br', 'O email deve ser institucional'),
})

export type LoginFormData = z.infer<typeof loginSchema>