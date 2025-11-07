import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
       <div className="flex items-center mb-8">
        <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/account"><ArrowLeft/></Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">My Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
           <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="Jane" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                </div>
                <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </div>
        <div>
           <Card>
             <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Manage your password.</CardDescription>
            </CardHeader>
             <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                </div>
                <Button>Update Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
