import FormLogin from '@/features/auth/components/form-login'
import Brand from '@/shared/components/brand'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/ui/card'

function LoginPage() {

  return (
    <section className="flex-1 flex items-center justify-center py-20">
      <Card className="max-w-md w-md border-border">
        <CardHeader className="text-center">
          <div className="w-full flex justify-center mb-4">
            <Brand />
          </div>

          <CardTitle className="text-2xl font-bold text-foreground">
            Bem-vindo de volta
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            Entre com seu e-mail institucional
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FormLogin />
        </CardContent>

        <CardFooter className="border-t border-border">
          <p className="text-sm text-muted-foreground text-center w-full">
            Não tem conta? <a href="/register"></a> Criar conta
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default LoginPage