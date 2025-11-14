import { DollarSign, Megaphone, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CampaignEngagementChart } from "@/components/dashboard/campaign-engagement-chart";

export default function DashboardPage() {
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

      <div className="grid gap-4 md:grid-cols-2">
        <PerformanceChart />
        <CampaignEngagementChart />
      </div>
    </div>
  );
}
