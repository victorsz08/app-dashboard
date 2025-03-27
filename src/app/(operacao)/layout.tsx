import { Account } from "@/components/avatar/avatar";
import { UserNotifications } from "@/components/notifications/user-notifications";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TriggerSidebar } from "@/components/sidebar/trigger-sidebar";
import { SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


const data = {
  username: "victorsz08",
  firstName: "Victor",
  lastName: "Siqueira",
  image: "https://www.github.com/victorsz08.png"
};


const notifications =  [
  {
    title: "Notificação 1",
    description: "Descrição da notificação 1"
  },
  {
    title: "Notificação 2",
    description: "Descrição da notificação 2"
  },
  {
    title: "Notificação 3",
    description: "Descrição da notificação 3"
  }
]


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen>
        <AppSidebar variant="sidebar"/>
        <main className="min-h-screen w-full">
            <SidebarHeader 
              className="bg-white flex items-center flex-row justify-between 
              dark:bg-slate-900 w-full py-5 px-4 border-b border-b-slate-200"
              >
                <TriggerSidebar/>
                <div className="flex items-center gap-4">
                  <UserNotifications notifications={notifications}/>
                  <Account data={data}/>
                </div>
            </SidebarHeader>
            {children}
        </main>
    </SidebarProvider>
  );
};