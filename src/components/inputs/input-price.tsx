"use client"

import type { ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"

interface InputBRLProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  name?: string
  invalid?: boolean
  errorMessage?: string
  className?: string
  disabled?: boolean
}

export function InputPrice({
  value,
  onChange,
  placeholder = "R$ 0,00",
  label,
  name,
  invalid,
  disabled = false,
}: InputBRLProps) {


  const formatValueBRL = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor / 100)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const apenasNumeros = e.target.value.replace(/\D/g, "")
    const numero = Number.parseInt(apenasNumeros, 10) || 0
    const valorFormatado = formatValueBRL(numero)
    onChange(valorFormatado)
  }

  return (
      <div>
          {label && <Label htmlFor={name} className="text-xs font-semibold text-slate-600">{label}</Label>}
            <Input
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              className={cn(invalid && "border-destructive")}
              disabled={disabled}
            />
        </div>
  )
}

