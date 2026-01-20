"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Truck, Users, BookOpen, CheckCircle } from "lucide-react"

export default function WelcomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push("/dashboard")
      } else {
        setIsLoading(false)
      }
    }
    checkUser()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">
          <h1 className="text-3xl font-bold text-primary">
            Tramp<span className="text-foreground">oo</span>
          </h1>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: BarChart3,
      title: "Dashboard Inteligente",
      description: "Indicadores em tempo real com metas e alertas visuais",
    },
    {
      icon: Users,
      title: "Gestão de RH",
      description: "Controle de funcionários, férias e pendências",
    },
    {
      icon: BookOpen,
      title: "Treinamentos",
      description: "Biblioteca completa de vídeos, PDFs e manuais",
    },
    {
      icon: Truck,
      title: "Gestão de Frota",
      description: "Monitoramento de veículos, consumo e manutenções",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_50%)]" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-20">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Tramp</span>
              <span className="text-foreground">oo</span>
            </h1>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => router.push("/auth/login")}
                className="text-muted-foreground hover:text-foreground"
              >
                Entrar
              </Button>
              <Button 
                onClick={() => router.push("/auth/cadastro")}
                className="bg-primary hover:bg-primary/90"
              >
                Criar Conta
              </Button>
            </div>
          </header>

          {/* Main Hero */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4" />
              Seu parceiro de gestão operacional
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Bem-vindo ao{" "}
              <span className="text-primary">Trampoo</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              A plataforma completa para gestão operacional da sua empresa. 
              Controle sua frota, equipe, treinamentos e indicadores em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => router.push("/auth/cadastro")}
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push("/auth/login")}
                className="text-lg px-8 py-6 h-auto border-border hover:bg-accent"
              >
                Já tenho conta
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-border">
            {[
              { value: "99%", label: "Uptime" },
              { value: "+500", label: "Empresas" },
              { value: "24/7", label: "Suporte" },
              { value: "+10k", label: "Veículos" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            2026 Trampoo. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
