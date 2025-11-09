
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { wigs } from '@/lib/data';
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { Lock, ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const cartItems = [
  { ...wigs[0], quantity: 1 },
  { ...wigs[1], quantity: 1 },
];
const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

type CheckoutStep = 'shipping' | 'payment' | 'details' | 'confirmed';

type ShippingDetails = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone: string;
};

export default function CheckoutPage() {
    const [step, setStep] = useState<CheckoutStep>('shipping');
    const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        phone: ''
    });
    const [receipt, setReceipt] = useState<File | null>(null);

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        setShippingDetails({
            firstName: formData.get('first-name') as string,
            lastName: formData.get('last-name') as string,
            address: formData.get('address') as string,
            city: formData.get('city') as string,
            state: formData.get('state') as string,
            zip: formData.get('zip') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string
        });
        setStep('payment');
    };

    const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setReceipt(e.target.files[0]);
        }
    };

    const handleConfirmPurchase = (e: React.FormEvent) => {
        e.preventDefault();
        if (receipt) {
            const message = `New Purchase:%0A%0A*Name:* ${shippingDetails.firstName} ${shippingDetails.lastName}%0A*Email:* ${shippingDetails.email}%0A*Phone:* ${shippingDetails.phone}%0A*Address:* ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zip}%0A*Total:* $${total.toFixed(2)}`;
            const whatsappUrl = `https://wa.me/13234718770?text=${message}`;
            window.open(whatsappUrl, '_blank');
            setStep('confirmed');
        } else {
            alert("Please upload a receipt to confirm your purchase.");
        }
    };

    if (step === 'confirmed') {
        return (
            <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
                <Card className="max-w-md w-full text-center p-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-headline font-bold">Thank you for your order!</h1>
                    <p className="text-muted-foreground mt-2">
                        Your order has been placed and is being processed. A confirmation will be sent to {shippingDetails.email} shortly.
                    </p>
                </Card>
            </div>
        )
    }

    if (step === 'payment') {
        return (
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="max-w-2xl mx-auto">
                    <Button variant="ghost" onClick={() => setStep('shipping')} className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Shipping
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
                        Back to Payment
                    </Button>
                    <Card>
                        <form onSubmit={handleConfirmPurchase}>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Final Step: Confirm Your Purchase</CardTitle>
                                <CardDescription>Please upload your payment receipt to finalize your order.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="receipt-upload">Proof of Payment</Label>
                                    <div className="relative flex justify-center items-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                                        onClick={() => document.getElementById('receipt-upload-input')?.click()}>
                                        <Input id="receipt-upload-input" type="file" className="sr-only" onChange={handleReceiptUpload} accept="image/*,.pdf" required />
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Checkout</h1>
          <form className="space-y-8" onSubmit={handleShippingSubmit}>
            <div>
              <h2 className="text-2xl font-headline font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" name="first-name" placeholder="Jane" required defaultValue={shippingDetails.firstName}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" name="last-name" placeholder="Doe" required defaultValue={shippingDetails.lastName}/>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" placeholder="123 Luxury Lane" required defaultValue={shippingDetails.address}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="New York" required defaultValue={shippingDetails.city}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" placeholder="NY" required defaultValue={shippingDetails.state}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" name="zip" placeholder="10001" required defaultValue={shippingDetails.zip}/>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="jane@example.com" required defaultValue={shippingDetails.email}/>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" required defaultValue={shippingDetails.phone}/>
                </div>
              </div>
            </div>
            
             <Button size="lg" className="w-full" type="submit">
                <Lock className="mr-2 h-4 w-4"/>
                Proceed to Payment
             </Button>
          </form>
        </div>

        <div className="bg-secondary/50 p-8 rounded-lg">
          <h2 className="text-2xl font-headline font-bold mb-6">Your Order</h2>
          <div className="space-y-4">
            {cartItems.map(item => {
              const image = PlaceHolderImages.find(img => img.id === item.imageIds[0]);
              return (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    {image && <Image src={image.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={image.imageHint}/>}
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            )})}
          </div>
          <Separator className="my-6" />
          <div className="space-y-2">
             <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator className="my-4"/>
               <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
