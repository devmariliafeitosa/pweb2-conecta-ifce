import Brand from '@/components/shared/brand'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue }
from '@/components/ui/select'

function RegisterPage() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')


  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault()
    setIsLoading(true)

    const response = await fetch(
      'https://conectaifce-api.proflucasmendes.com.br/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    )

    const data = await response.json()
    console.log(data)

    if (response.status === 200) {
      localStorage.setItem('token_access', data.token)
      setEmail('')
      setPassword('')
      setError(null)

    }

    if (data.error) {
      setError(data.error.message)
      setTimeout(() => setError(null), 3000)
    }

    setIsLoading(false)
  }

  return (
    <section className="flex-1 flex items-center justify-center py-20">
      <Card className="max-w-md border-border w-md">
        <CardHeader className="text-center">
          <div className="w-full flex justify-center mb-4">
            <Brand />
          </div>

          <CardTitle className="text-2xl font-bold text-foreground">
            Criar sua conta
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Prencha os campus abaixo para criar sua conta
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className='flex items-center gap-4'>
              <div className="flex flex-col gap-2">
                  <Label
                      htmlFor="name"
                      className={`text-foreground ${error && 'text-destructive'}`}>
                      Nome
                  </Label>
                  <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Digite seu nome"
                      required
                      className="h-11 bg-background"
                   />
              </div>
              <div className="flex flex-col gap-2">
                  <Label
                      htmlFor="surname"
                      className={`text-foreground ${error && 'text-destructive'}`}>
                      Sobrenome
                  </Label>
                  <Input
                      id="surname"
                      name="surname"
                      type="text"
                      placeholder="Seu sobrenome"
                      required
                      className="h-11 bg-background"
                  />
              </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className={`text-foreground ${error && 'text-destructive'}`}>
                  E-mail institucional
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.nome@ifce.edu.br"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                  className="h-11 bg-background"
                />
            </div>

              <div className='flex flex-col gap-4'>
                <Label htmlFor='role' className='text-foreground'>
                  Vínculo
                </Label>
                <Select required>
                  <SelectTrigger className='bg-background w-full h-11'>
                    <SelectValue placeholder='Selecione seu vínculo com o IFCE' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='aluno'>Aluno</SelectItem>
                    <SelectItem value='servidor'>Servidor</SelectItem>
                    <SelectItem value='técnico'>Técnico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-4'>
                <Label htmlFor='role' className='text-foreground'>
                  Campus
                </Label>
                <Select required>
                  <SelectTrigger className='bg-background w-full h-11' id='campus'>
                    <SelectValue placeholder='Selecione seu campus' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='taua'>Tauá</SelectItem>
                    <SelectItem value='boa_viagem'>Boa Viagem</SelectItem>
                    <SelectItem value='sobral'>Sobral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className={`text-foreground ${error && 'text-destructive'}`}   >
                  Senha
                </Label>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  required
                  className="h-11 bg-background"
                />

                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                >
                  {showPass ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Mínimo de 8 caracteres com letras e números
              </p>
            </div>

            <Button type="submit" className="mt-2 h-11" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2Icon className="animate-spin" />{' '}
                  <span>Entrando...</span>
                </>
              ) : (
                'Criar conta'
              )}
            </Button>

            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}
          </form>
        </CardContent>

        <CardFooter className="border-t border-border">
          <p className="text-sm text-muted-foreground text-center w-full">
            Já tem conta?{' '}
            <a href="/login" className="text-primary">
              Entrar
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default RegisterPage