"use client";

import { LogOut, Settings, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Separator } from "../ui/separator";

export type AvatarAccountProps = {
  username: string;
  fallback: string;
  image?: string;
};

export function AvatarAccount({
  fallback,
  image,
  username,
}: AvatarAccountProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 cursor-pointer">
          <AvatarImage src={image} />
          <AvatarFallback>
            {fallback.split(" ").map((item) => item.charAt(0).toUpperCase())}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[250px]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span className="flex flex-col text-start justify-start gap-0">
              <span className="text-slate-600 font-medium text-sm">
                {fallback}
              </span>
              <span className="text-slate-400 font-light text-xs">
                @{username}
              </span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <Separator className="my-3"/>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href="/configuracoes"
              className="flex flex-row items-center gap-1 cursor-pointer"
            >
              <Settings size={12} />
              <span className="text-xs text-slate-500">Configurações</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href="/perfil"
              className="flex flex-row items-center gap-1 cursor-pointer"
            >
              <UserRound size={12} />
              <span className="text-xs text-slate-500">Conta</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <Separator className="my-3"/>
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex flex-row items-center gap-1 text-red-600 hover:text-red-700 cursor-pointer">
            <LogOut size={12} className="text-red-600 hover:text-red-700" />
            <span className="text-xs">Sair</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
