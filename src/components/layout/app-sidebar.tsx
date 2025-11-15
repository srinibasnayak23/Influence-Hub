
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarContent } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Megaphone, Users, MessageSquare, ShieldCheck, Milestone, LogOut, Settings } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { useAuth } from '@/context/auth-context';
import { signOut } from '@/lib/firebase/auth';
import { Skeleton } from '../ui/skeleton';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/influencers', label: 'Influencers', icon: Users },
  { href: '/collaborations', label: 'Collaborations', icon: Milestone },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/moderation', label: 'Moderation', icon: ShieldCheck },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
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
                {loading ? (
                    <div className="flex items-center gap-3 w-full">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                ) : user ? (
                    <>
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                            <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-col flex min-w-0">
                            <span className="text-sm font-semibold truncate">{user.displayName || 'User'}</span>
                            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-auto" onClick={handleSignOut}>
                            <LogOut className="size-4" />
                        </Button>
                    </>
                ) : (
                    <div className="flex-1 text-sm text-muted-foreground">Not signed in.</div>
                )}
            </div>
        </SidebarFooter>
    </Sidebar>
  );
}
