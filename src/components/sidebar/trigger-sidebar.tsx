"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "../ui/sidebar";



export function TriggerSidebar() {
    const { toggleSidebar } = useSidebar();

    return (
        <span className="hover:bg-slate-100 p-1 w-fit duration-100 
            rounded-sm cursor-pointer dark:hover:bg-slate-700" onClick={toggleSidebar}>
            <Menu size={24} className="text-slate-600 dark:text-slate-200"/>
        </span>
    )
}