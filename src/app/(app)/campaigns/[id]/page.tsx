"use client";

import { useState } from 'react';
import Image from "next/image";
import { campaigns } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, CheckCircle, DollarSign, Target, Tag } from 'lucide-react';
import { ProposalForm } from '@/components/campaigns/proposal-form';

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const campaign = campaigns.find((c) => c.id === params.id);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        <Image 
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover"
            data-ai-hint="campaign image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-white">{campaign.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-200 mt-2">
                <Image src={campaign.brandLogo} alt={campaign.brandName} width={24} height={24} className="rounded-full" data-ai-hint="brand logo" />
                <span>{campaign.brandName}</span>
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{campaign.description}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Deliverables</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {campaign.deliverables.map((item, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="text-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Key Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-accent" />
                        <div>
                            <p className="text-muted-foreground">Budget</p>
                            <p className="font-semibold">${campaign.budget.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-accent" />
                        <div>
                            <p className="text-muted-foreground">Timeline</p>
                            <p className="font-semibold">{new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-accent" />
                        <div>
                            <p className="text-muted-foreground">Category</p>
                            <p className="font-semibold">{campaign.category}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Tag className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                            <p className="text-muted-foreground">Tags</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {campaign.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Dialog open={isProposalOpen} onOpenChange={setIsProposalOpen}>
                <DialogTrigger asChild>
                    <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Submit Proposal</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Submit Proposal for {campaign.title}</DialogTitle>
                    </DialogHeader>
                    <ProposalForm onSubmitted={() => setIsProposalOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
      </div>
    </div>
  );
}
