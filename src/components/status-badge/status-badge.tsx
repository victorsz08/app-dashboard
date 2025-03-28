"use client";

import React from "react";
import { CircleCheckBig, LucideIcon, Loader, LoaderCircle, CircleX } from "lucide-react";
import { Badge } from "../ui/badge";

export type StatusBadgeVariant = "pendente" | "conectado" | "cancelado" | "reagendar";

export interface StatusBadgeProps {
  variant: StatusBadgeVariant;
}

export function StatusBadge({ variant }: StatusBadgeProps) {
  const variantMap: Record<StatusBadgeVariant, { label: string; classes: string; icon: LucideIcon }> = {
    pendente: {
      label: "Pendente",
      classes: "bg-yellow-50 text-yellow-700",
      icon: Loader
    },
    conectado: {
      label: "Conectado",
      classes: "bg-green-50 text-green-700",
      icon: CircleCheckBig
    },
    cancelado: {
      label: "Cancelado",
      classes: "bg-red-50 text-red-700",
      icon: CircleX
    },
    reagendar: {
      label: "Reagendar",
      classes: "bg-blue-50 text-blue-700",
      icon: LoaderCircle
    }
  };

  const { label, classes, icon: Icon } = variantMap[variant];

  return (
    <Badge variant="secondary" className={`${classes} text-[12px] rounded-full font-normal flex items-center gap-1`}>
      {<Icon size={14} strokeWidth={1}/>}
      <span>{label}</span>
    </Badge>
  );
}
