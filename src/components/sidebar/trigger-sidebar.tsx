"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";


export function TriggerSidebar() {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            variant="secondary"
            className="text-slate-500 cursor-pointer"
            onClick={toggleSidebar}
        >
            <Menu size={24}/>
        </Button>
    )
}