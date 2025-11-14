"use client";

import { moderateContent, type ModerateContentOutput } from "@/ai/flows/content-moderation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Shield, ShieldAlert, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  content: z.string().min(1, "Content is required."),
});

export function ModerationForm() {
  const [result, setResult] = useState<ModerateContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const moderationResult = await moderateContent({
        content: values.content,
        contentType: 'text',
      });
      setResult(moderationResult);
    } catch (error) {
      console.error("Moderation failed:", error);
      setResult({ isSafe: false, reasons: ["An error occurred during moderation."] });
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content to Moderate</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter text to check for policy violations..." {...field} rows={6} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
            Moderate Content
          </Button>
        </form>
      </Form>

      {result && (
        <Alert variant={result.isSafe ? "default" : "destructive"}>
          {result.isSafe ? <ShieldCheck className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
          <AlertTitle>{result.isSafe ? "Content is Safe" : "Content Violation Detected"}</AlertTitle>
          <AlertDescription>
            {result.isSafe 
              ? "This content appears to comply with community guidelines." 
              : (
                <ul className="list-disc pl-5 mt-2">
                  {result.reasons.map((reason, i) => <li key={i}>{reason}</li>)}
                </ul>
              )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
