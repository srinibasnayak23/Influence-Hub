import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { influencers } from "@/lib/placeholder-data";
import { InfluencerCard } from "@/components/influencers/influencer-card";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function InfluencersPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Find Influencers
        </h1>
        <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or tag..." className="pl-9" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <div className="sticky top-20 rounded-lg border bg-card p-4 space-y-6">
              <h2 className="font-semibold">Filters</h2>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Followers</Label>
                <Slider defaultValue={[100000]} max={1000000} step={10000} />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>1M+</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Engagement Rate</Label>
                <Slider defaultValue={[5]} max={20} step={0.5} />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>20%</span>
                </div>
              </div>
          </div>
        </aside>
        <main className="lg:col-span-9">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {influencers.map((influencer) => (
                <InfluencerCard key={influencer.id} influencer={influencer} />
            ))}
            </div>
        </main>
      </div>
    </div>
  );
}
