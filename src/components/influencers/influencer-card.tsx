import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap } from "lucide-react";
import type { Influencer } from "@/lib/types";

export function InfluencerCard({ influencer }: { influencer: Influencer }) {
  return (
    <Card className="text-center">
      <CardHeader className="items-center">
        <Image
          src={influencer.avatar}
          alt={influencer.name}
          width={80}
          height={80}
          className="rounded-full"
          data-ai-hint="person portrait"
        />
      </CardHeader>
      <CardContent className="flex-1">
        <CardTitle className="font-headline text-lg">{influencer.name}</CardTitle>
        <CardDescription className="mt-1 text-primary">{influencer.category}</CardDescription>
        <div className="mt-4 flex flex-wrap justify-center gap-1">
          {influencer.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-around p-4 bg-muted/50">
        <div className="text-center">
            <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground"/>
                <p className="font-semibold">{(influencer.followers / 1000).toFixed(0)}k</p>
            </div>
            <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div className="text-center">
            <div className="flex items-center justify-center gap-1">
                <Zap className="h-4 w-4 text-muted-foreground"/>
                <p className="font-semibold">{influencer.engagementRate}%</p>
            </div>
            <p className="text-xs text-muted-foreground">Engagement</p>
        </div>
      </CardFooter>
    </Card>
  );
}
