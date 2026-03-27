import {z} from 'zod'

export const registerSchema = z.object({
  firstName: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres').max(100),
  lastName: z.string().trim().min(2, 'O sobrenome deve ter pelo menos 2 caracteres').max(100),
  handle: z.string().trim().min(3, 'O nome de usuário deve ter pelo menos 3 caracteres').max(50)
    .regex(/^[a-zA-Z0-9_]+$/, 'O nome de usuário só pode conter letras, números e underscores') ,
  email: z.email('Digite um email válido') .endsWith('@ifce.edu.br', 'O email deve ser institucional'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/\d/, 'A senha deve conter pelo menos um número')
    .regex(/[@$!%*?&]/, 'A senha deve conter pelo menos um caractere especial'),
  role: z.enum(['ALUNO', 'PROFESSOR', 'TECNICO']),
  campus: z.string().nonempty(),
  course: z.string().trim().min(3, 'O curso deve ter pelo menos 3 caracteres').max(100).optional(),
})

export type RegisterFormData = z.infer<typeof registerSchema>