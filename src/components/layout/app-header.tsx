import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { Logo } from "@/components/icons/logo"
import { PanelLeft } from "lucide-react"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="sr-only">InfluenceHub</span>
        </Link>
        <SidebarTrigger variant="ghost" size="icon">
          <PanelLeft />
          <span className="sr-only">Toggle Menu</span>
        </SidebarTrigger>
    </header>
  )
}
