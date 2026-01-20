import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, Mail } from "lucide-react"

export default function SucessoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="text-primary">Tramp</span>
          <span className="text-foreground">oo</span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-border shadow-xl text-center">
            <CardHeader className="space-y-4 pb-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Conta Criada com Sucesso!
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Sua conta foi criada. Verifique seu email para confirmar o cadastro.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-center gap-3 text-primary">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Email de confirmação enviado
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Clique no link enviado para seu email para ativar sua conta. 
                Após confirmar, você poderá acessar o sistema.
              </p>

              <div className="space-y-3">
                <Button 
                  asChild 
                  className="w-full h-11 bg-primary hover:bg-primary/90"
                >
                  <Link href="/auth/login">
                    Ir para Login
                  </Link>
                </Button>

                <Button 
                  variant="outline" 
                  asChild 
                  className="w-full h-11 border-border bg-transparent"
                >
                  <Link href="/">
                    Voltar ao Início
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-muted-foreground">
        2026 Trampoo. Todos os direitos reservados.
      </footer>
    </div>
  )
}
