"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  FileText,
  BookOpen,
  Clock,
  Eye,
  Download,
  ChevronRight,
} from "lucide-react"

interface TrainingItem {
  id: string
  title: string
  description: string
  duration?: string
  views?: number
  category: string
  isNew?: boolean
}

const videos: TrainingItem[] = [
  {
    id: "v1",
    title: "Direção Defensiva - Módulo 1",
    description: "Fundamentos e técnicas essenciais para uma direção segura",
    duration: "45 min",
    views: 234,
    category: "Segurança",
    isNew: true,
  },
  {
    id: "v2",
    title: "Operação de Tacógrafo Digital",
    description: "Como utilizar e interpretar o tacógrafo corretamente",
    duration: "30 min",
    views: 189,
    category: "Operacional",
  },
  {
    id: "v3",
    title: "Checklist de Saída",
    description: "Procedimentos obrigatórios antes de iniciar a viagem",
    duration: "15 min",
    views: 312,
    category: "Procedimentos",
  },
  {
    id: "v4",
    title: "Economia de Combustível",
    description: "Técnicas para reduzir consumo e aumentar eficiência",
    duration: "25 min",
    views: 156,
    category: "Eficiência",
    isNew: true,
  },
]

const pdfs: TrainingItem[] = [
  {
    id: "p1",
    title: "Manual do Motorista 2026",
    description: "Guia completo com todas as normas e procedimentos",
    category: "Manual",
    views: 445,
  },
  {
    id: "p2",
    title: "Política de Segurança",
    description: "Regras e diretrizes de segurança da empresa",
    category: "Política",
    views: 289,
  },
  {
    id: "p3",
    title: "Tabela de Multas e Penalidades",
    description: "Referência rápida sobre infrações de trânsito",
    category: "Referência",
    isNew: true,
  },
  {
    id: "p4",
    title: "Procedimentos de Emergência",
    description: "O que fazer em caso de acidentes ou panes",
    category: "Segurança",
  },
]

const manuais: TrainingItem[] = [
  {
    id: "m1",
    title: "Como Preencher o Diário de Bordo",
    description: "Passo a passo completo para preenchimento correto",
    category: "Procedimento",
  },
  {
    id: "m2",
    title: "Inspeção Pré-Viagem",
    description: "Checklist detalhado de verificação do veículo",
    category: "Segurança",
    isNew: true,
  },
  {
    id: "m3",
    title: "Registro de Ocorrências",
    description: "Como reportar incidentes e anormalidades",
    category: "Procedimento",
  },
  {
    id: "m4",
    title: "Uso do Aplicativo de Rotas",
    description: "Tutorial completo da ferramenta de navegação",
    category: "Tecnologia",
  },
]

function VideoCard({ item }: { item: TrainingItem }) {
  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 cursor-pointer">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="h-7 w-7 text-primary-foreground ml-1" />
            </div>
          </div>
          {item.isNew && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Novo
            </Badge>
          )}
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground line-clamp-2">
              {item.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
            {item.duration && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {item.duration}
              </span>
            )}
            {item.views && (
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {item.views} views
              </span>
            )}
            <Badge variant="outline" className="text-xs">
              {item.category}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PDFCard({ item }: { item: TrainingItem }) {
  return (
    <Card className="group hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-destructive/10 shrink-0">
            <FileText className="h-6 w-6 text-destructive" />
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">
                {item.title}
              </h3>
              {item.isNew && (
                <Badge className="bg-primary text-primary-foreground text-xs">
                  Novo
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
              {item.views && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {item.views} downloads
                </span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-primary"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ManualCard({ item }: { item: TrainingItem }) {
  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 shrink-0">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">
                {item.title}
              </h3>
              {item.isNew && (
                <Badge className="bg-primary text-primary-foreground text-xs">
                  Novo
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
            <Badge variant="outline" className="text-xs mt-1">
              {item.category}
            </Badge>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>
      </CardContent>
    </Card>
  )
}

export function TreinamentosTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Treinamentos</h2>
        <p className="text-muted-foreground">
          Biblioteca de conteúdos para capacitação da equipe
        </p>
      </div>

      <Tabs defaultValue="videos" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="videos" className="gap-2">
            <Play className="h-4 w-4" />
            Vídeos
          </TabsTrigger>
          <TabsTrigger value="pdfs" className="gap-2">
            <FileText className="h-4 w-4" />
            PDFs
          </TabsTrigger>
          <TabsTrigger value="manuais" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Manuais Passo a Passo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard key={video.id} item={video} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pdfs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {pdfs.map((pdf) => (
              <PDFCard key={pdf.id} item={pdf} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manuais" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {manuais.map((manual) => (
              <ManualCard key={manual.id} item={manual} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
