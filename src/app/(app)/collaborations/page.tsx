import Image from "next/image";
import Link from "next/link";
import { collaborations } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CollaborationsPage() {

  const getProgress = (collab: typeof collaborations[0]) => {
    const total = collab.milestones.length;
    if (total === 0) return 0;
    const completed = collab.milestones.filter(m => m.status === 'Approved' || m.status === 'Paid').length;
    return (completed / total) * 100;
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Your Collaborations
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collaborations.map((collab) => (
          <Card key={collab.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardDescription>{collab.campaignTitle}</CardDescription>
                  <CardTitle className="font-headline text-lg mt-1">{collab.influencerName}</CardTitle>
                </div>
                <Image src={collab.influencerAvatar} alt={collab.influencerName} width={48} height={48} className="rounded-full" data-ai-hint="person portrait" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <Badge variant={collab.status === 'Active' ? 'default' : 'secondary'}>{collab.status}</Badge>
              <div>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-sm font-medium">{getProgress(collab).toFixed(0)}%</p>
                </div>
                <Progress value={getProgress(collab)} />
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/50">
              <Button asChild className="w-full">
                <Link href={`/collaborations/${collab.id}`}>
                  Manage Collaboration <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
