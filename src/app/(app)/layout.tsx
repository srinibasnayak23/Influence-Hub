import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
            <AppHeader />
            <main className="flex flex-1 flex-col">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
