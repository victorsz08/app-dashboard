"use client"

import type { ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"

interface InputNumberProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string;
  label?: string;
  name?: string;
  invalid?: boolean;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  formatFn?: (value: string) => string;
}

export function InputNumber({
  value,
  onChange,
  invalid,
  placeholder,
  label,
  name,
  disabled,
  maxLength,
  formatFn,
}: InputNumberProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength)
    };

    if (formatFn) {
      value = formatFn(value)
    };
    onChange?.(value);
  };

  return (
    <div>
      {label && <Label htmlFor={name} className="text-xs font-medium text-slate-600">{label}</Label>}
        <Input
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={cn(invalid && "border-destructive")}
          disabled={disabled}
          inputMode="numeric"
        />
      </div>
  )
}

