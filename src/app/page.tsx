import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignCard } from '@/components/campaigns/campaign-card';
import { InfluencerCard } from '@/components/influencers/influencer-card';
import { campaigns, influencers } from '@/lib/placeholder-data';
import { LandingNavbar } from '@/components/layout/landing-navbar';
import { LandingFooter } from '@/components/layout/landing-footer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function LandingPage() {
  const featuredCampaigns = campaigns.slice(0, 3);
  const featuredInfluencers = influencers.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNavbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 lg:py-32">
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://picsum.photos/seed/hero/1600/900"
              alt="Background"
              fill
              className="object-cover"
              data-ai-hint="abstract background"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="container mx-auto px-4 text-center text-white">
            <div className="flex flex-col items-center">
              <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Where Brands and Influencers Connect
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-gray-300">
                InfluenceHub is the premier platform for discovering marketing
                campaigns, collaborating with top brands, and growing your
                influence.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/signup">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white bg-transparent text-white hover:bg-white hover:text-black">
                  <Link href="#campaigns">
                    Browse Campaigns
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose InfluenceHub?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              A comprehensive suite of tools to streamline your influencer marketing.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Zap className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline mt-4">Powerful Connections</CardTitle>
                  <CardDescription>
                    Easily find and connect with the perfect brands or influencers for your campaigns.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline mt-4">Secure & Transparent</CardTitle>
                  <CardDescription>
                    Manage contracts, milestones, and payments securely all in one place.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline mt-4">Community Focused</CardTitle>
                  <CardDescription>
                    Join a growing community of creators and brands dedicated to authentic marketing.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Campaigns Section */}
        <section id="campaigns" className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Campaigns
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Discover exciting opportunities from leading brands across various
              industries.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Influencers Section */}
        <section id="influencers" className="bg-muted py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Top Influencers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Collaborate with creative and impactful influencers to elevate
              your brand.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {featuredInfluencers.map((influencer) => (
                <InfluencerCard key={influencer.id} influencer={influencer} />
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                            About InfluenceHub
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            InfluenceHub was founded with a simple mission: to bridge the gap between innovative brands and creative influencers. We believe in the power of authentic storytelling and aim to provide a platform that fosters meaningful and successful collaborations.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                            Our team is passionate about building a transparent, efficient, and supportive ecosystem where both brands and influencers can thrive.
                        </p>
                    </div>
                    <div>
                        <Image 
                            src="https://picsum.photos/seed/about/600/400"
                            alt="Team collaborating"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="team collaboration"
                        />
                    </div>
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
