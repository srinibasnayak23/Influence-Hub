import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { ContactForm } from "@/components/landing/contact-form";

export function LandingFooter() {
  return (
    <footer id="contact" className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h2>
                <p className="mt-4 text-muted-foreground">
                    Have questions or want to learn more? Drop us a line.
                </p>
                <div className="mt-8">
                    <ContactForm />
                </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-4 col-span-2 md:col-span-4">
                        <Link href="/" className="flex items-center gap-2">
                        <Logo className="h-6 w-6 text-primary" />
                        <span className="font-headline text-lg font-semibold">
                            InfluenceHub
                        </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-sm">
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
                        <li><Link href="#about" className="text-muted-foreground hovertext-foreground">About Us</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground">Press</Link></li>
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
            </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} InfluenceHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
