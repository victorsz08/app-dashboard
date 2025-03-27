"use client";


export interface StatusBadgeProps {
    variant: "pendente" | "conectado" | "cancelado"; 
    children: React.ReactNode;
};

export function StatusBadge({ variant, children } : StatusBadgeProps) {
    return (
        <span className={`inline-flex items-center px-2 py-1 text-xs 
            font-medium rounded-lg ${variant === "pendente" ? "bg-yellow-100 text-yellow-800" :
             variant === "conectado" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {children}
        </span>
    );

}