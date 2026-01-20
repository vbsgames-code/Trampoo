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
import { Button } from "@/components/ui/button"
import {
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type VehicleSize = "VUC" | "Toco" | "Truck"
type ConsumptionStatus = "excelente" | "bom" | "regular" | "ruim"

interface Vehicle {
  placa: string
  modelo: string
  tamanho: VehicleSize
  mediaConsumo: number
  metaConsumo: number
  vencimentoTacografo: string
  vencimentoPreventiva: string
  ultimaOS: string
  conserto: string
}

const vehicles: Vehicle[] = [
  {
    placa: "ABC-1234",
    modelo: "Volvo FH 540",
    tamanho: "Truck",
    mediaConsumo: 2.8,
    metaConsumo: 2.5,
    vencimentoTacografo: "15/03/2026",
    vencimentoPreventiva: "22/02/2026",
    ultimaOS: "OS-4521",
    conserto: "Troca de embreagem",
  },
  {
    placa: "DEF-5678",
    modelo: "Mercedes Actros",
    tamanho: "Truck",
    mediaConsumo: 2.4,
    metaConsumo: 2.5,
    vencimentoTacografo: "10/04/2026",
    vencimentoPreventiva: "05/03/2026",
    ultimaOS: "OS-4518",
    conserto: "Revisão geral",
  },
  {
    placa: "GHI-9012",
    modelo: "Scania R450",
    tamanho: "Toco",
    mediaConsumo: 3.2,
    metaConsumo: 3.0,
    vencimentoTacografo: "28/02/2026",
    vencimentoPreventiva: "15/04/2026",
    ultimaOS: "OS-4515",
    conserto: "Troca de pneus",
  },
  {
    placa: "JKL-3456",
    modelo: "VW Delivery",
    tamanho: "VUC",
    mediaConsumo: 7.8,
    metaConsumo: 8.0,
    vencimentoTacografo: "20/05/2026",
    vencimentoPreventiva: "10/03/2026",
    ultimaOS: "OS-4512",
    conserto: "Alinhamento e balanceamento",
  },
  {
    placa: "MNO-7890",
    modelo: "Iveco Daily",
    tamanho: "VUC",
    mediaConsumo: 8.5,
    metaConsumo: 8.0,
    vencimentoTacografo: "08/06/2026",
    vencimentoPreventiva: "25/02/2026",
    ultimaOS: "OS-4508",
    conserto: "Troca de freios",
  },
  {
    placa: "PQR-1122",
    modelo: "Volvo VM 270",
    tamanho: "Toco",
    mediaConsumo: 3.5,
    metaConsumo: 3.0,
    vencimentoTacografo: "12/03/2026",
    vencimentoPreventiva: "01/05/2026",
    ultimaOS: "OS-4505",
    conserto: "Reparo no ar condicionado",
  },
]

function getConsumptionStatus(atual: number, meta: number): ConsumptionStatus {
  const ratio = atual / meta
  if (ratio >= 1.0) return "excelente"
  if (ratio >= 0.9) return "bom"
  if (ratio >= 0.8) return "regular"
  return "ruim"
}

function isDateNear(dateStr: string): boolean {
  const [day, month, year] = dateStr.split("/").map(Number)
  const date = new Date(year, month - 1, day)
  const today = new Date()
  const diffDays = Math.ceil(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )
  return diffDays <= 30 && diffDays >= 0
}

function isDateExpired(dateStr: string): boolean {
  const [day, month, year] = dateStr.split("/").map(Number)
  const date = new Date(year, month - 1, day)
  const today = new Date()
  return date < today
}

const sizeColors: Record<VehicleSize, string> = {
  VUC: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Toco: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Truck: "bg-purple-500/20 text-purple-400 border-purple-500/30",
}

export function FrotaTab() {
  const [search, setSearch] = useState("")

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.placa.toLowerCase().includes(search.toLowerCase()) ||
      v.modelo.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Gestão de Frota
          </h2>
          <p className="text-muted-foreground">
            Controle de veículos, manutenção e desempenho
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Veículo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Veículos</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por placa ou modelo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Placa</TableHead>
                  <TableHead className="font-semibold">Modelo</TableHead>
                  <TableHead className="font-semibold">Tamanho</TableHead>
                  <TableHead className="font-semibold">
                    Consumo (km/l)
                  </TableHead>
                  <TableHead className="font-semibold">
                    Venc. Tacógrafo
                  </TableHead>
                  <TableHead className="font-semibold">
                    Venc. Preventiva
                  </TableHead>
                  <TableHead className="font-semibold">
                    Última OS / Conserto
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => {
                  const consumptionStatus = getConsumptionStatus(
                    vehicle.mediaConsumo,
                    vehicle.metaConsumo
                  )
                  const tacografoNear = isDateNear(vehicle.vencimentoTacografo)
                  const tacografoExpired = isDateExpired(
                    vehicle.vencimentoTacografo
                  )
                  const preventivaNear = isDateNear(vehicle.vencimentoPreventiva)
                  const preventivaExpired = isDateExpired(
                    vehicle.vencimentoPreventiva
                  )

                  return (
                    <TableRow
                      key={vehicle.placa}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-mono font-semibold">
                        {vehicle.placa}
                      </TableCell>
                      <TableCell className="font-medium">
                        {vehicle.modelo}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", sizeColors[vehicle.tamanho])}>
                          {vehicle.tamanho}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-semibold",
                              consumptionStatus === "excelente" && "text-success",
                              consumptionStatus === "bom" && "text-success",
                              consumptionStatus === "regular" && "text-warning",
                              consumptionStatus === "ruim" && "text-destructive"
                            )}
                          >
                            {vehicle.mediaConsumo.toFixed(1)}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            / {vehicle.metaConsumo.toFixed(1)}
                          </span>
                          {consumptionStatus === "excelente" && (
                            <TrendingUp className="h-4 w-4 text-success" />
                          )}
                          {consumptionStatus === "bom" && (
                            <TrendingUp className="h-4 w-4 text-success opacity-70" />
                          )}
                          {consumptionStatus === "regular" && (
                            <Minus className="h-4 w-4 text-warning" />
                          )}
                          {consumptionStatus === "ruim" && (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              tacografoExpired && "text-destructive",
                              tacografoNear &&
                                !tacografoExpired &&
                                "text-warning"
                            )}
                          >
                            {vehicle.vencimentoTacografo}
                          </span>
                          {tacografoExpired && (
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          )}
                          {tacografoNear && !tacografoExpired && (
                            <AlertTriangle className="h-4 w-4 text-warning" />
                          )}
                          {!tacografoNear && !tacografoExpired && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              preventivaExpired && "text-destructive",
                              preventivaNear &&
                                !preventivaExpired &&
                                "text-warning"
                            )}
                          >
                            {vehicle.vencimentoPreventiva}
                          </span>
                          {preventivaExpired && (
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          )}
                          {preventivaNear && !preventivaExpired && (
                            <AlertTriangle className="h-4 w-4 text-warning" />
                          )}
                          {!preventivaNear && !preventivaExpired && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span className="font-mono text-sm text-primary">
                            {vehicle.ultimaOS}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            {vehicle.conserto}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
