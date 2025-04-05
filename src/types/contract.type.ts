
export type StatusType = "pendente" | "reagendar" | "conectado" | "cancelado";

export const StatusType = {
    pendente: "pendente" as StatusType,
    reagendar: "reagendar" as StatusType,
    conectado: "conectado" as StatusType,
    cancelado: "cancelado" as StatusType 
} as const;

export type ContractDataType = {
    id: string;
    number: number;
    local: string;
    observation: string;
    schedulingDate: Date;
    schedulingTime: string;
    status: StatusType;
    price: number;
    contact: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};