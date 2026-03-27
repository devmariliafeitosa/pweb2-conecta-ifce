import { useFormLogin } from "@/features/auth/components/useFormLogin"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

function FormLogin() {
  const { state, onSubmit, useForm } = useFormLogin()

  return (
    <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-foreground">
                E-mail Institucional
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.nome@ifce.edu.br"
                required
                className="h-11 bg-background"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Senha
                </Label>
                <a href="/recover" className="text-primary text-sm">
                  Esqueceu a senha?
                </a>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={state.showPass ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  required
                  className="h-11 bg-background"
                />

                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  type="button"
                  onClick={() => state.setShowPass((prev: boolean) => !prev)}
                >
                  {state.showPass ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="mt-2 h-11">
              Entrar
            </Button>

            {state.authError && (
              <p className="text-xs text-destructive">{state.authError}</p>
            )}
          </form>
  )
}

export default FormLogin