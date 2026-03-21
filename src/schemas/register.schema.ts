import {z} from 'zod'

export const registerSchema = z.object({
  firstname: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres').max(100),
  lastname: z.string().trim().min(2, 'O sobrenome deve ter pelo menos 2 caracteres').max(100),
  email: z.email('Digite um email válido') .endsWith('@ifce.edu.br', 'O email deve ser institucional'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/\d/, 'A senha deve conter pelo menos um número')
    .regex(/[@$!%*?&]/, 'A senha deve conter pelo menos um caractere especial'),
  role: z.enum(['aluno', 'servidor', 'técnico']),
  campus: z.enum(['taua', 'boa_viagem', 'sobral'])
})

export type RegisterFormData = z.infer<typeof registerSchema>