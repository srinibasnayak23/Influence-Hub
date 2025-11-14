import Link from "next/link";
import { Logo } from "@/components/icons/logo";

export function LandingFooter() {
  return (
    <footer id="contact" className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-semibold">
                InfluenceHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting brands and influencers for powerful marketing campaigns.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Platform</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link href="#campaigns" className="text-muted-foreground hover:text-foreground">Campaigns</Link></li>
              <li><Link href="#influencers" className="text-muted-foreground hover:text-foreground">Influencers</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-foreground">Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Press</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} InfluenceHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
