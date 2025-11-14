import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, FileCheck, ThumbsUp, Wallet } from "lucide-react";
import type { Milestone } from "@/lib/types";

const statusConfig = {
    Pending: { icon: Clock, color: "bg-gray-500", label: "Pending Submission" },
    Submitted: { icon: FileCheck, color: "bg-blue-500", label: "Submitted" },
    'In Review': { icon: FileCheck, color: "bg-yellow-500", label: "In Review" },
    Approved: { icon: ThumbsUp, color: "bg-green-500", label: "Approved" },
    Paid: { icon: CheckCircle, color: "bg-primary", label: "Paid" },
};

export function MilestoneItem({ milestone }: { milestone: Milestone }) {
    const config = statusConfig[milestone.status];

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-lg">{milestone.title}</CardTitle>
                        <CardDescription>Due by: {new Date(milestone.dueDate).toLocaleDateString()}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-2">
                        <Wallet className="h-3 w-3" />
                        ${milestone.payout.toLocaleString()}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${config.color}`}></div>
                    <span className="text-sm font-medium">{config.label}</span>
                </div>
            </CardContent>
            {milestone.status === 'In Review' && (
                <CardFooter className="flex gap-2">
                    <Button variant="outline">Request Revision</Button>
                    <Button>Approve & Pay</Button>
                </CardFooter>
            )}
        </Card>
    );
}
