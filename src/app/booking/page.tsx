// Note: This is a UI-only implementation.
"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const availableTimes = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM",
];

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && selectedTime) {
      setIsBooked(true);
    }
  };
  
  if (isBooked) {
      return (
          <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
              <Card className="max-w-md w-full text-center p-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                  <h1 className="text-2xl font-headline font-bold">Booking Confirmed!</h1>
                  <p className="text-muted-foreground mt-2">
                      Your virtual consultation for {date?.toLocaleDateString()} at {selectedTime} is booked. We've sent a confirmation to your email.
                  </p>
                   <Button onClick={() => setIsBooked(false)} className="mt-6 w-full">Book Another Appointment</Button>
              </Card>
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
        <form onSubmit={handleSubmit} className="p-6">
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
                    <Input id="name" placeholder="Jane Doe" required/>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="jane@example.com" required/>
                 </div>
                <Button type="submit" className="w-full" disabled={!date || !selectedTime}>
                  Book Appointment for {date?.toLocaleDateString()} at {selectedTime}
                </Button>
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
