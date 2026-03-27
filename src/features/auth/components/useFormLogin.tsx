import { loginSchema } from '@/features/auth/schemas/login.schemas'
import type { LoginFormData } from '@/features/auth/schemas/login.schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ApiError } from '@/infra/http/api-error'
import { login } from '@/features/auth/services/login.service'
import { useAuth } from '@/features/auth/contexts/AuthContext'

export function useFormLogin() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setAuthUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
  try {
    const responseData = await login(data.email, data.password)

    console.log('LOGIN RESPONSE:', responseData)

    setAuthUser(responseData.user)

    console.log('USER SALVO NO CONTEXT')

    navigate('/feed')
  } catch (error) {
    if (error instanceof ApiError)
      setAuthError(error.message)
  }
}

  return {
    state: {
      showPass,
      authError,
      setShowPass,
    },
    onSubmit,
    useForm: {
      register,
      handleSubmit,
      isSubmitting,
      isValid,
      errors,
    },
  }
}