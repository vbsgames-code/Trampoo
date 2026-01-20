"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Employee {
  matricula: string
  nome: string
  cargo: string
  dataFerias: string
  pendencias: "em_dia" | "pendente" | "urgente"
}

const employees: Employee[] = [
  {
    matricula: "001245",
    nome: "Carlos Eduardo Silva",
    cargo: "Motorista",
    dataFerias: "15/03/2026",
    pendencias: "em_dia",
  },
  {
    matricula: "001312",
    nome: "Ana Paula Santos",
    cargo: "Coordenadora de Logística",
    dataFerias: "22/04/2026",
    pendencias: "pendente",
  },
  {
    matricula: "001456",
    nome: "Roberto Almeida",
    cargo: "Motorista",
    dataFerias: "10/02/2026",
    pendencias: "urgente",
  },
  {
    matricula: "001523",
    nome: "Fernanda Costa",
    cargo: "Analista de Frotas",
    dataFerias: "05/05/2026",
    pendencias: "em_dia",
  },
  {
    matricula: "001634",
    nome: "Marcos Oliveira",
    cargo: "Motorista",
    dataFerias: "18/06/2026",
    pendencias: "em_dia",
  },
  {
    matricula: "001745",
    nome: "Juliana Pereira",
    cargo: "Assistente Administrativo",
    dataFerias: "01/03/2026",
    pendencias: "pendente",
  },
  {
    matricula: "001856",
    nome: "Ricardo Lima",
    cargo: "Motorista",
    dataFerias: "25/07/2026",
    pendencias: "urgente",
  },
  {
    matricula: "001967",
    nome: "Patricia Mendes",
    cargo: "Supervisora de Operações",
    dataFerias: "12/08/2026",
    pendencias: "em_dia",
  },
]

const pendenciasConfig = {
  em_dia: { label: "Em Dia", variant: "success" as const },
  pendente: { label: "Pendente", variant: "warning" as const },
  urgente: { label: "Urgente", variant: "destructive" as const },
}

export function RHTab() {
  const [search, setSearch] = useState("")

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.nome.toLowerCase().includes(search.toLowerCase()) ||
      emp.matricula.includes(search) ||
      emp.cargo.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Recursos Humanos
          </h2>
          <p className="text-muted-foreground">
            Gerencie colaboradores, férias e pendências
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Colaborador
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Colaboradores</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, matrícula ou cargo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Matrícula</TableHead>
                  <TableHead className="font-semibold">Nome</TableHead>
                  <TableHead className="font-semibold">Cargo</TableHead>
                  <TableHead className="font-semibold">Data de Férias</TableHead>
                  <TableHead className="font-semibold">Pendências</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow
                    key={employee.matricula}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-mono text-sm">
                      {employee.matricula}
                    </TableCell>
                    <TableCell className="font-medium">
                      {employee.nome}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {employee.cargo}
                    </TableCell>
                    <TableCell>{employee.dataFerias}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "text-xs",
                          employee.pendencias === "em_dia" &&
                            "bg-success/20 text-success border-success/30 hover:bg-success/30",
                          employee.pendencias === "pendente" &&
                            "bg-warning/20 text-warning border-warning/30 hover:bg-warning/30",
                          employee.pendencias === "urgente" &&
                            "bg-destructive/20 text-destructive border-destructive/30 hover:bg-destructive/30"
                        )}
                      >
                        {pendenciasConfig[employee.pendencias].label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
