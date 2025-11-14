import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModerationForm } from "@/components/moderation/moderation-form";

export default function ModerationPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Content Moderation
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>AI Moderation Tool</CardTitle>
                <CardDescription>
                    Enter text below to check it against community guidelines using our AI-powered tool. 
                    This helps ensure all content is safe and appropriate for the platform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ModerationForm />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong>No hate speech or discrimination:</strong> Content that promotes violence, incites hatred, promotes discrimination, or disparages on the basis of race or ethnic origin, religion, disability, age, nationality, veteran status, sexual orientation, sex, gender identity, caste, or any other characteristic that is associated with systemic discrimination or marginalization.</p>
                <p><strong>No sexually explicit content:</strong> We don't allow content that contains nudity, graphic sex acts, or sexually explicit material.</p>
                <p><strong>No violent or graphic content:</strong> We do not allow content that is gratuitously violent, gruesome, or shocking.</p>
                <p><strong>No illegal activities:</strong> We prohibit the use of our services for any illegal activities, including the sale of regulated goods.</p>
                <p><strong>No spam or misleading information:</strong> We do not allow spam, scams, or other deceptive practices.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
