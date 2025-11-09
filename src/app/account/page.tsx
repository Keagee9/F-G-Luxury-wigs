'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Heart, Package, LogOut } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useEffect } from 'react';

const accountLinks = [
  { href: '/account/profile', icon: User, title: 'My Profile', description: 'View and edit your personal information.' },
  { href: '/account/orders', icon: Package, title: 'My Orders', description: 'Track your current and past orders.' },
  { href: '/account/favorites', icon: Heart, title: 'My Favorites', description: 'View your saved wigs.' },
];

export default function AccountPage() {
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile } = useDoc<{ firstName: string }>(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  const handleSignOut = () => {
    if (auth) {
      signOut(auth).then(() => {
        router.push('/login');
      });
    }
  };

  if (isUserLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold">My Account</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {userProfile?.firstName || ''}!</p>
        </div>
        <Button variant="outline" onClick={handleSignOut}><LogOut className="mr-2 h-4 w-4" />Sign Out</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accountLinks.map((link) => (
          <Link href={link.href} key={link.title}>
            <Card className="h-full hover:shadow-lg hover:border-primary transition-all">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <link.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="font-headline text-xl">{link.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
