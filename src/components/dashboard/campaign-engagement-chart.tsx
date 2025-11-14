"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { campaignEngagementData } from "@/lib/placeholder-data"

const chartConfig = {
  engagement: {
    label: "Engagement (%)",
    color: "hsl(var(--chart-2))",
  },
}

export function CampaignEngagementChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Engagement</CardTitle>
        <CardDescription>Comparison of engagement rates</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={campaignEngagementData}>
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="engagement"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="engagement" fill="var(--color-engagement)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
