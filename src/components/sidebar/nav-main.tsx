"use client";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type ItemProps = {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    target?: React.HTMLAttributeAnchorTarget;
  }[];
};

export function NavMain({ items }: ItemProps) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
        <SidebarGroupLabel>Navegação</SidebarGroupLabel>
        <SidebarMenu className="text-slate-500 dark:text-slate-200">
            {items.map((item) => (
            <Collapsible key={item.title} asChild className="group/collapsible">
                <Link href={item.url}>
                    <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                            isActive={pathname === item.url ? true : false}
                            className="cursor-pointer data-[active=true]:bg-primary 
                            data-[active=true]:text-white"
                            tooltip={item.title}
                        >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    </SidebarMenuItem>
                </Link>
            </Collapsible>
            ))}
        </SidebarMenu>
        </SidebarGroup>
    );
}
