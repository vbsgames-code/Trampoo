"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Target, TrendingUp, TrendingDown, Percent, Clock, Package, Users, Fuel } from "lucide-react"

interface Indicator {
  id: string
  name: string
  meta: number
  unit: string
  icon: React.ElementType
}

const initialIndicators: Indicator[] = [
  { id: "entregas", name: "Entregas no Prazo", meta: 95, unit: "%", icon: Package },
  { id: "satisfacao", name: "Satisfação do Cliente", meta: 90, unit: "%", icon: TrendingUp },
  { id: "produtividade", name: "Produtividade", meta: 85, unit: "%", icon: Target },
  { id: "absenteismo", name: "Absenteísmo", meta: 5, unit: "%", icon: Users },
  { id: "manutencao", name: "Disponibilidade Frota", meta: 90, unit: "%", icon: Clock },
  { id: "consumo", name: "Meta de Consumo", meta: 8, unit: "km/l", icon: Fuel },
]

export function DashboardTab() {
  const [values, setValues] = useState<Record<string, string>>({
    entregas: "97",
    satisfacao: "88",
    produtividade: "91",
    absenteismo: "7",
    manutencao: "94",
    consumo: "7.5",
  })

  const handleValueChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const getStatus = (indicator: Indicator, currentValue: string) => {
    const value = parseFloat(currentValue) || 0
    // Para absenteísmo, menor é melhor
    if (indicator.id === "absenteismo") {
      return value <= indicator.meta ? "success" : "danger"
    }
    return value >= indicator.meta ? "success" : "danger"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Indicadores</h2>
        <p className="text-muted-foreground">
          Acompanhe os principais KPIs da operação em tempo real
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {initialIndicators.map((indicator) => {
          const currentValue = values[indicator.id] || "0"
          const status = getStatus(indicator, currentValue)
          const numericValue = parseFloat(currentValue) || 0
          const Icon = indicator.icon

          return (
            <Card
              key={indicator.id}
              className={cn(
                "transition-all duration-300 border-2",
                status === "success"
                  ? "border-success/50 bg-success/5"
                  : "border-destructive/50 bg-destructive/5"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-foreground">
                  {indicator.name}
                </CardTitle>
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    status === "success" ? "bg-success/20" : "bg-destructive/20"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      status === "success" ? "text-success" : "text-destructive"
                    )}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "text-3xl font-bold",
                      status === "success" ? "text-success" : "text-destructive"
                    )}
                  >
                    {currentValue || "0"}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {indicator.unit}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    {status === "success" ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    Meta: {indicator.meta}
                    {indicator.unit}
                  </span>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={indicator.id}
                    className="text-xs text-muted-foreground"
                  >
                    Valor Atual
                  </Label>
                  <Input
                    id={indicator.id}
                    type="number"
                    step="0.1"
                    value={currentValue}
                    onChange={(e) =>
                      handleValueChange(indicator.id, e.target.value)
                    }
                    className="h-9 bg-background"
                  />
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-500 rounded-full",
                      status === "success" ? "bg-success" : "bg-destructive"
                    )}
                    style={{
                      width: `${Math.min(
                        (numericValue / indicator.meta) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
