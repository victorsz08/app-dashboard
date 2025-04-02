import { AvatarAccount } from "@/components/avatar/avatar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { TriggerSidebar } from "@/components/sidebar/trigger-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";


export default function Layout({ children } : { children: React.ReactNode }) {


  return (
    <SidebarProvider>
      <AppSidebar variant="inset"/>
      <SidebarInset>
      <SidebarHeader className="flex flex-row justify-between items-center py-4">
        <TriggerSidebar/>
        <AvatarAccount fallback="Victor Siqueira" username="victrsz08"/>
      </SidebarHeader>
      <Separator/>
        <main>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
};