// Note: This is a UI-only implementation.
"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Upload, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const availableTimes = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM",
];

type BookingStep = 'selection' | 'payment' | 'details' | 'confirmed';

type UserDetails = {
    name: string;
    email: string;
    phone: string;
};

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<BookingStep>('selection');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>({name: '', email: '', phone: ''});

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && selectedTime) {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      setUserDetails({
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: '', // Phone will be collected in the 'details' step
      });
      setStep('payment');
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };
  
  const handleConfirmPurchase = (e: React.FormEvent) => {
      e.preventDefault();
      if(receipt) {
        // Here you would typically handle form submission and receipt upload
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        console.log("Purchase confirmed for:", {
            ...userDetails,
            phone: formData.get('phone') as string,
            date,
            selectedTime,
            receipt,
        });
        setStep('confirmed');
      } else {
        alert("Please upload a receipt to confirm your purchase.");
      }
  }

  const resetBooking = () => {
    setDate(new Date());
    setSelectedTime(null);
    setReceipt(null);
    setUserDetails({name: '', email: '', phone: ''});
    setStep('selection');
  }

  if (step === 'confirmed') {
      return (
          <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
              <Card className="max-w-md w-full text-center p-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                  <h1 className="text-2xl font-headline font-bold">Booking Confirmed!</h1>
                  <p className="text-muted-foreground mt-2">
                      Your virtual consultation for {date?.toLocaleDateString()} at {selectedTime} is booked. We've sent a confirmation to {userDetails.email}.
                  </p>
                   <Button onClick={resetBooking} className="mt-6 w-full">Book Another Appointment</Button>
              </Card>
          </div>
      )
  }

  if (step === 'payment') {
    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
             <div className="max-w-2xl mx-auto">
                 <Button variant="ghost" onClick={() => setStep('selection')} className="mb-4">
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     Back
                 </Button>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Payment Instructions - Zelle Only</CardTitle>
                        <CardDescription>Send Your Deposit via Zelle to confirm your appointment.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Alert>
                            <AlertTitle className="font-semibold">Zelle Account Details</AlertTitle>
                            <AlertDescription className="space-y-2 mt-2">
                                <p><strong>Account Name:</strong> Goodness Abengowe</p>
                                <p><strong>Account Number / Phone:</strong> (323) 471-8770</p>
                            </AlertDescription>
                        </Alert>
                         <p className="text-sm text-muted-foreground">A <strong className="text-primary">25% deposit</strong> is required to secure your booking. This will be applied to your total service cost.</p>
                        
                         <Button onClick={() => setStep('details')} className="w-full">
                            I've Sent The Deposit, Proceed to Upload Receipt
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                            For users who are not on WhatsApp, you can share your proof of payment and booking info to this Gmail address: goodnessabengowe8@gmail.com
                        </p>
                    </CardContent>
                </Card>
             </div>
        </div>
    )
  }

   if (step === 'details') {
    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
             <div className="max-w-2xl mx-auto">
                 <Button variant="ghost" onClick={() => setStep('payment')} className="mb-4">
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     Back
                 </Button>
                <Card>
                    <form onSubmit={handleConfirmPurchase}>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Final Step: Confirm Your Details</CardTitle>
                            <CardDescription>Please provide your contact information and upload your payment receipt.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="full-name">Full Name</Label>
                                <Input id="full-name" name="name" defaultValue={userDetails.name} placeholder="Your full name" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" name="phone" type="tel" placeholder="Your phone number" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email-confirm">Email Address</Label>
                                <Input id="email-confirm" name="email" type="email" defaultValue={userDetails.email} placeholder="Your email address" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="receipt-upload">Proof of Payment</Label>
                                <div className="relative flex justify-center items-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                                      onClick={() => document.getElementById('receipt-upload-input')?.click()}>
                                    <Input id="receipt-upload-input" type="file" className="sr-only" onChange={handleReceiptUpload} accept="image/*,.pdf" />
                                    {receipt ? (
                                        <p className="font-medium text-green-600 px-4 text-center">{receipt.name}</p>
                                    ) : (
                                        <div className="text-center text-muted-foreground">
                                        <Upload className="mx-auto h-8 w-8" />
                                        <p className="mt-2 text-sm">Upload a screenshot or photo of your Zelle payment confirmation.</p>
                                        </div>
                                    )}
                                </div>
                                {receipt === null && <p className="text-sm text-muted-foreground">No file chosen</p>}
                            </div>
                        </CardContent>
                        <CardContent>
                             <Button type="submit" className="w-full" disabled={!receipt}>
                                Send Notification & Confirm Purchase
                            </Button>
                        </CardContent>
                    </form>
                </Card>
             </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Book a Virtual Consultation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get personalized advice from our expert stylists. Schedule a one-on-one virtual session to discuss your needs and find the perfect wig for you.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
        <div className="p-6 border-b md:border-b-0 md:border-r">
          <h2 className="font-headline text-xl font-semibold mb-4 text-center">1. Select a Date</h2>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
            />
          </div>
        </div>
        <form onSubmit={handleDetailsSubmit} className="p-6">
          <div className="flex flex-col h-full">
            <div>
              <h2 className="font-headline text-xl font-semibold mb-4 text-center">2. Select a Time</h2>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {availableTimes.map(time => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {selectedTime && (
              <div className="mt-auto space-y-4">
                 <h2 className="font-headline text-xl font-semibold mb-4 text-center">3. Your Details</h2>
                 <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Jane Doe" required defaultValue={userDetails.name}/>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="jane@example.com" required defaultValue={userDetails.email}/>
                 </div>
                <Button type="submit" className="w-full" disabled={!date || !selectedTime}>
                  Proceed to Payment for {date?.toLocaleDateString()} at {selectedTime}
                </Button>
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
