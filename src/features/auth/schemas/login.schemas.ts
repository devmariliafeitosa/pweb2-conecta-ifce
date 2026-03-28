import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Digite um email válido')
  .endsWith('@ifce.edu.br', 'O email deve ser institucional'),
  password: z.string().min(1, 'A senha é obrigatória'),
})

export type LoginFormData = z.infer<typeof loginSchema>