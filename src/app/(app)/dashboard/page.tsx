import { DollarSign, Megaphone, Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CampaignEngagementChart } from "@/components/dashboard/campaign-engagement-chart";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { conversations } from "@/lib/placeholder-data";

export default function DashboardPage() {
  const recentConversations = conversations.slice(0, 4);

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
          Create New Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Budget Spent"
          value="$45,231.89"
          change="+20.1%"
          Icon={DollarSign}
        />
        <KpiCard
          title="Active Campaigns"
          value="5"
          change="+2 since last month"
          Icon={Megaphone}
        />
        <KpiCard
          title="Engaged Influencers"
          value="12"
          change="+15.3%"
          Icon={Users}
        />
        <KpiCard
          title="Total Engagement"
          value="1.2M"
          change="+12.2%"
          Icon={Zap}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid gap-4">
            <PerformanceChart />
            <CampaignEngagementChart />
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                    Your latest conversations with influencers.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
                {recentConversations.map((convo) => (
                    <Link href="/messages" key={convo.id} className="flex items-start gap-4 p-2 -m-2 rounded-lg hover:bg-muted">
                        <Avatar className="h-10 w-10 border">
                            <AvatarImage src={convo.influencerAvatar} alt={convo.influencerName} data-ai-hint="person portrait" />
                            <AvatarFallback>{convo.influencerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-sm">{convo.influencerName}</p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(convo.lastMessageTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                        </div>
                    </Link>
                ))}
            </CardContent>
            <CardFooter>
                 <Button asChild variant="outline" className="w-full">
                    <Link href="/messages">
                        View All Messages
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
