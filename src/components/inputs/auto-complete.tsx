"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Tipo para as opções do combobox
export type AutoCompleteOption = {
  value: string
  label: string
}

interface AutoCompleteProps {
  options: AutoCompleteOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  label?: string
  name?: string
  error?: boolean
  errorMessage?: string
  className?: string
}

export function AutoComplete({
  options,
  value,
  onChange,
  placeholder = "Selecione uma opção",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhuma opção encontrada.",
  label,
  name,
  error,
  errorMessage,
  className,
}: AutoCompleteProps) {
  const [open, setOpen] = useState(false)

  return (
    <FormItem className={cn("flex flex-col", className)}>
      {label && <FormLabel htmlFor={name} className="text-xs font-medium text-slate-600">{label}</FormLabel>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between", !value && "text-muted-foreground", error && "border-destructive")}
              id={name}
            >
              {value ? options.find((option) => option.value === value)?.label : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup className="max-h-60 overflow-y-auto">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onChange(option.value)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", option.value === value ? "opacity-100" : "opacity-0")} />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && errorMessage && <FormMessage className="text-[12px]">{errorMessage}</FormMessage>}
    </FormItem>
  )
}

