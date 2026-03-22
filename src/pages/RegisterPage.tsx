import Brand from "@/components/shared/brand";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/register.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";


function RegisterPage() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [campuses, setCampuses] = useState<Array<{ id: string; name: string }>>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCampuses() {
      const response = await fetch("https://conectaifce-api.proflucasmendes.com.br/campuses");
      if (response.ok) {
        const data = await response.json();
        setCampuses(data);
      }
    }
    fetchCampuses();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true); // Ativa o loading

    // Aqui a lógica idêntica à sua, com o "as any" para o VS Code não reclamar
    const { course, ...rest } = data as any;
    const payload = data.role === "aluno" ? data : rest;

    const response = await fetch("https://conectaifce-api.proflucasmendes.com.br/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const responseData = await response.json()
      console.log(responseData)
      localStorage.setItem('access_token', responseData.token)
      navigate("/feed")

    }

    setIsLoading(false);
  };

  return (
    <section className="flex-1 flex items-center justify-center py-20">
      <Card className="max-w-md border-border w-full">
        <CardHeader className="text-center">
          <div className="w-full flex justify-center mb-4">
            <Brand />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Criar sua conta
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Preencha os campos abaixo para criar sua conta
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="firstname">Nome</Label>
                <Input
                  id="firstname"
                  placeholder="Digite seu nome"
                  className="h-11 bg-background"
                  {...register("firstname")}
                />
                {errors.firstname && (
                  <p className="text-xs text-destructive">{errors.firstname.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="lastname">Sobrenome</Label>
                <Input
                  id="lastname"
                  placeholder="Seu sobrenome"
                  className="h-11 bg-background"
                  {...register("lastname")}
                />
                {errors.lastname && (
                  <p className="text-xs text-destructive">{errors.lastname.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="handle">Nome de Usuário</Label>
              <Input
                id="handle"
                placeholder="Ex: @joao"
                className="h-11 bg-background"
                {...register("handle")}
              />
              {errors.handle && (
                <p className="text-xs text-destructive">{errors.handle.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail institucional</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.nome@ifce.edu.br"
                className="h-11 bg-background"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="role">Vínculo</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <SelectTrigger className="bg-background w-full h-11" id="role">
                      <SelectValue placeholder="Selecione seu vínculo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aluno">Aluno</SelectItem>
                      <SelectItem value="servidor">Servidor</SelectItem>
                      <SelectItem value="técnico">Técnico(a)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-xs text-destructive">{errors.role.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="campus">Campus</Label>
              <Controller
                name="campus"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <SelectTrigger className="bg-background w-full h-11" id="campus">
                      <SelectValue placeholder="Selecione seu campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {campuses.map((campus) => (
                        <SelectItem value={campus.id} key={campus.id}>
                          {campus.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.campus && (
                <p className="text-xs text-destructive">{errors.campus.message}</p>
              )}
            </div>

            {watch("role") === "aluno" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="course">Curso</Label>
                <Input
                  id="course"
                  placeholder="Seu curso"
                  className="h-11 bg-background"
                  {...register("course")}
                />
                {errors.course && (
                  <p className="text-xs text-destructive">{errors.course.message}</p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="h-11 bg-background pr-10"
                  {...register("password")}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                >
                  {showPass ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="mt-2 h-11" disabled={isSubmitting || !isValid}>
              {

                isSubmitting ? (
                  <span  className="flex items-center gap-4">
                    <Loader2Icon className="animate-spin size-4" /> <span>Criando Conta...</span>
                  </span>
                ) :
                  "Criar Conta"
              }
            </Button>
          </form>
        </CardContent>

        <CardFooter className="border-t border-border mt-4 pt-6">
          <p className="text-sm text-muted-foreground text-center w-full">
            Já tem conta?{" "}
            <a href="/login" className="text-primary hover:underline font-medium">
              Entrar
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}

export default RegisterPage;