import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Campaign } from "@/lib/types";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-cover"
                data-ai-hint="campaign image"
            />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Badge variant="secondary" className="mb-2">{campaign.category}</Badge>
        <CardTitle className="font-headline text-lg mb-2">{campaign.title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Image src={campaign.brandLogo} alt={campaign.brandName} width={24} height={24} className="rounded-full" data-ai-hint="brand logo" />
            <span>{campaign.brandName}</span>
        </div>
        <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 bg-muted/50">
        <div>
            <p className="text-sm text-muted-foreground">Budget</p>
            <p className="font-semibold text-lg">${campaign.budget.toLocaleString()}</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/campaigns/${campaign.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
