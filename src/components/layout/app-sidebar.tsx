"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarContent, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Megaphone, Users, MessageSquare, ShieldCheck, Milestone, LogOut, Settings, PanelLeft } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/influencers', label: 'Influencers', icon: Users },
  { href: '/collaborations', label: 'Collaborations', icon: Milestone },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/moderation', label: 'Moderation', icon: ShieldCheck },
];

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen, isMobile, setOpenMobile, state } = useSidebar();

  const handleSignOut = () => {
    // Logic to be implemented later
    router.push('/login');
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
        <SidebarContent className="flex flex-col p-2">
            <div className="flex items-center justify-between p-2">
                <Link href="/" className="flex items-center gap-2" data-testid="logo-link">
                    <Button variant="outline" size="icon" className="size-9 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
                        <Logo className="size-5" />
                    </Button>
                    <span className="font-headline text-xl font-semibold text-primary">InfluenceHub</span>
                </Link>
            </div>
            <SidebarMenu className="flex-1 mt-4">
            {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                        asChild 
                        isActive={pathname.startsWith(item.href)}
                        onClick={handleLinkClick}
                    >
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex-col gap-2 p-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="#">
                            <Settings />
                            <span>Settings</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <div className="flex items-center gap-3 rounded-md bg-muted p-2">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={userAvatar?.imageUrl} alt="Brand Co." data-ai-hint={userAvatar?.imageHint} />
                    <AvatarFallback>BC</AvatarFallback>
                </Avatar>
                <div className="flex-col flex">
                    <span className="text-sm font-semibold">Brand Co.</span>
                    <span className="text-xs text-muted-foreground">brand@co.com</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={handleSignOut}>
                    <LogOut className="size-4" />
                </Button>
            </div>
        </SidebarFooter>
    </Sidebar>
  );
}
