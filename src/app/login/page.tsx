'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    if (email && password) {
      initiateEmailSignIn(auth, email, password);
      router.push('/account');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-background px-4">
        <Card className="w-full max-w-sm">
            <form onSubmit={handleSignIn}>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
                    <CardDescription>Enter your email below to login to your account.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" name="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="w-full" type="submit">Sign In</Button>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="underline text-primary">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    </div>
  );
}
