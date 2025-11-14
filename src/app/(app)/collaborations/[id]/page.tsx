import Image from "next/image";
import { collaborations } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { MilestoneItem } from "@/components/collaborations/milestone-item";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function CollaborationDetailPage({ params }: { params: { id: string } }) {
  const collaboration = collaborations.find((c) => c.id === params.id);

  if (!collaboration) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
                {collaboration.campaignTitle}
            </h1>
            <p className="text-muted-foreground">Collaboration with {collaboration.influencerName}</p>
        </div>
        <Button asChild variant="outline">
            <Link href="/messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with {collaboration.influencerName}
            </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="font-headline text-2xl font-semibold">Milestones</h2>
            {collaboration.milestones.map((milestone) => (
                <MilestoneItem key={milestone.id} milestone={milestone} />
            ))}
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Image src={collaboration.influencerAvatar} alt={collaboration.influencerName} width={64} height={64} className="rounded-full" data-ai-hint="person portrait" />
                    <div>
                        <CardTitle className="font-headline">{collaboration.influencerName}</CardTitle>
                        <CardDescription>Influencer</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Image src={collaboration.brandLogo} alt={collaboration.brandName} width={64} height={64} className="rounded-full" data-ai-hint="brand logo" />
                    <div>
                        <CardTitle className="font-headline">{collaboration.brandName}</CardTitle>
                        <CardDescription>Brand</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
      </div>
    </div>
  );
}
