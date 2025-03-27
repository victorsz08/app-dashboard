"use client";

import { Inbox, X } from "lucide-react";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { set } from "date-fns";
import { useState } from "react";


export type NotificationProps = {
    title: string;
    description: string;
}


export function UserNotifications({ notifications }: { notifications: NotificationProps[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="relative cursor-pointer">
                <Inbox className="w-8 h-8 text-slate-600"/>
                {notifications.length > 0 && 
                    <span className="w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-1 flex items-center 
                        justify-center text-white text-xs">
                        {notifications.length}
                    </span>
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[400px] bg-white p-2 rounded-lg border border-slate-200" align="end">
                <DropdownMenuLabel className="flex mt-2 w-full flex-row items-center justify-between">
                    <h1 className="text-sm font-semibold">Notificações</h1>
                </DropdownMenuLabel>
                <Separator/>
                <DropdownMenuGroup>
                {notifications.length > 0 ? 
                    notifications.map((notification, index) => (
                        <DropdownMenuItem key={index} className="py-3 cursor-pointer">
                            <div className="flex flex-col gap-1 items-start border-l-5 border-l-primary px-3">
                                <h1 className="text-sm font-semibold text-slate-600">{notification.title}</h1>
                                <p className="text-sm text-slate-500">{notification.description}</p>
                            </div>
                        </DropdownMenuItem>
                    ))
                    :
                    <span className="text-center italic text-slate-500">
                        Sem notificações no momento
                    </span>    
            }
            </DropdownMenuGroup>
            <Separator/>
            <DropdownMenuGroup className="py-2 ">
                <Button onClick={() => setIsOpen(false)} variant="secondary" 
                className="w-full text-xs text-start cursor-pointer">Limpar Notificações</Button>
            </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}