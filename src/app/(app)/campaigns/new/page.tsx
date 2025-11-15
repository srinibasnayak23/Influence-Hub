import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignForm } from "@/components/campaigns/campaign-form";

export default function NewCampaignPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
       <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Create a New Campaign</CardTitle>
                <CardDescription>
                    Fill out the details below to launch your next successful influencer marketing campaign.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CampaignForm />
            </CardContent>
        </Card>
    </div>
  );
}
