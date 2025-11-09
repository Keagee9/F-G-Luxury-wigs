'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/firebase';
import { sendPasswordResetEmail, AuthError } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { MailCheck, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth || !email) return;

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setIsSubmitted(true);
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Error sending email",
        description: authError.message || "Could not send password reset email. Please try again.",
      });
      console.error('Error sending password reset email:', error);
    } finally {
        setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-background px-4">
            <Card className="w-full max-w-sm text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                        <MailCheck className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-headline mt-4">Check Your Email</CardTitle>
                    <CardDescription>
                        We've sent a password reset link to <br/>
                        <span className="font-semibold text-foreground">{email}</span>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        If you don't see it, please check your spam folder.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full" variant="outline">
                        <Link href="/login">Back to Sign In</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-background px-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleResetPassword}>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    "Send Reset Email"
                )}
            </Button>
            <Button variant="link" asChild className="text-sm text-muted-foreground">
                <Link href="/login">Back to Sign In</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
