'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function SignUpPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (auth && firestore && email && password && firstName && lastName) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        if (user) {
          const userRef = doc(firestore, 'users', user.uid);
          const userData = {
            id: user.uid,
            firstName,
            lastName,
            email,
          };
          setDocumentNonBlocking(userRef, userData, { merge: true });
          router.push('/account');
        }
      } catch (error) {
        const authError = error as AuthError;
        if (authError.code === 'auth/email-already-in-use') {
          toast({
            variant: "destructive",
            title: "Sign-up failed",
            description: "An account with this email address already exists.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: authError.message || "Could not create your account.",
          });
        }
        console.error('Error signing up:', error);
      }
    }
  };

  return (
     <div className="flex items-center justify-center min-h-[80vh] bg-background px-4">
        <Card className="w-full max-w-sm">
          <form onSubmit={handleSignUp}>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
                <CardDescription>Enter your information to create an account and unlock exclusive benefits.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" name="first-name" placeholder="Max" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" name="last-name" placeholder="Robinson" required />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col">
                <Button className="w-full" type="submit">Create Account</Button>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="underline text-primary">
                        Sign in
                    </Link>
                </div>
            </CardFooter>
          </form>
        </Card>
    </div>
  );
}
