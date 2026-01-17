import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar-01/app-sidebar"; // ← your copied/custom sidebar
import { TopBar } from "@/components/layout/TopBar"; // your existing top bar

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <AppSidebar /> {/* ← the blocks.so component you pasted */}
      <SidebarInset>
        <TopBar />
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
