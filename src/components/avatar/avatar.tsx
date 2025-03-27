"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

export type AccountProps = {
    username: string;
    firstName: string;
    lastName: string;
    image: string;
}


export function Account({ data } : { data: AccountProps }) {

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer w-9 h-9">
                    <AvatarImage src={data.image}/>
                    <AvatarFallback>
                        {data.firstName.charAt(0).toUpperCase()}{data.lastName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs w-[220px] text-slate-600">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-0">
                        <span className="text-sm text-slate-600 font-semibold">{data.firstName} {data.lastName}</span>
                        <span className="text-xs text-slate-500">@{data.username}</span>
                    </div>
                </DropdownMenuLabel>
                <Separator/>
                <DropdownMenuItem className="cursor-pointer mt-1">
                    <Link href="/perfil">
                        <span>Perfil</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <Link href="/perfil">
                        <span>Configurações</span>
                    </Link>
                </DropdownMenuItem>
                <Separator className="my-2"/>
                <DropdownMenuItem 
                    className="bg-red-300 text-red-600 cursor-pointer">
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}