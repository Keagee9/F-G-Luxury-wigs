// Note: This is a UI-only implementation.
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { wigs } from '@/lib/data';
import Image from 'next/image';
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { Lock } from 'lucide-react';

const cartItems = [
  { ...wigs[0], quantity: 1 },
  { ...wigs[1], quantity: 1 },
];
const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping & Payment Form */}
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Checkout</h1>
          <form className="space-y-8">
            <div>
              <h2 className="text-2xl font-headline font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Luxury Lane" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="NY" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="10001" />
                </div>
              </div>
            </div>
             <div>
              <h2 className="text-2xl font-headline font-semibold mb-4">Payment Details</h2>
               <div className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="**** **** **** 1234" />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="expiry-date">Expiry Date</Label>
                        <Input id="expiry-date" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                    </div>
                </div>
              </div>
            </div>
             <Button size="lg" className="w-full">
                <Lock className="mr-2 h-4 w-4"/>
                Pay ${total.toFixed(2)} Securely
             </Button>
          </form>
        </div>

        {/* Order Summary */}
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
