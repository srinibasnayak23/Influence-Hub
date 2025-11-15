
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { signInWithGoogle, signUpWithEmail } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Google</title>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .333 5.393.333 12.007S5.867 24 12.48 24c6.933 0 11.56-4.827 11.56-11.733 0-.747-.053-1.427-.187-2.133H12.48z" />
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'influencer' | 'brand'>('influencer');


  const handleSignup = async () => {
    if (!fullName || !email || !password) {
        toast({ variant: "destructive", title: "Error", description: "Please fill out all fields." });
        return;
    }
    try {
        await signUpWithEmail(fullName, email, password, role);
        router.push('/dashboard');
    } catch (error: any) {
        console.error("Email Sign-Up Error", error);
        toast({ variant: "destructive", title: "Sign-Up Failed", description: error.message });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(role);
      router.push('/dashboard');
    } catch (error) {
      console.error("Google Sign-In Error", error);
      toast({ variant: "destructive", title: "Sign-Up Failed", description: "Could not sign up with Google." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Logo className="h-8 w-8 text-primary" />
            </div>
          <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
          <CardDescription>Join InfluenceHub and start connecting.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input id="fullname" type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>I am a...</Label>
            <RadioGroup value={role} onValueChange={(value: any) => setRole(value)} className="flex gap-4 pt-1">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="influencer" id="r1" />
                    <Label htmlFor="r1">Influencer</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="brand" id="r2" />
                    <Label htmlFor="r2">Brand / Public User</Label>
                </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleSignup}>
            Create Account
          </Button>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                Or continue with
                </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            <GoogleIcon className="mr-2 h-4 w-4" />
            Sign up with Google
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
