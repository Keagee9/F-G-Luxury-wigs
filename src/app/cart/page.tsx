'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { X, Plus, Minus } from 'lucide-react';
import { collection, doc } from 'firebase/firestore';
import { updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const cartCollectionRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'cart_items');
  }, [user, firestore]);

  const { data: cartItems, isLoading: isCartLoading } = useCollection<{
    productId: string;
    quantity: number;
    name: string;
    price: number;
    imageUrl: string;
  }>(cartCollectionRef);

  const subtotal = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const shipping = 0;
  const total = subtotal + shipping;
  
  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (!user || !firestore) return;
    if (newQuantity < 1) {
      handleRemoveItem(cartItemId);
      return;
    }
    const cartItemRef = doc(firestore, 'users', user.uid, 'cart_items', cartItemId);
    updateDocumentNonBlocking(cartItemRef, { quantity: newQuantity });
  };

  const handleRemoveItem = (cartItemId: string) => {
    if (!user || !firestore) return;
    const cartItemRef = doc(firestore, 'users', user.uid, 'cart_items', cartItemId);
    deleteDocumentNonBlocking(cartItemRef);
  };
  
  const isLoading = isUserLoading || isCartLoading;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-8">Shopping Cart</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
          <div className="lg:col-span-1 sticky top-24">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      ) : !user ? (
         <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">Please log in to view your cart.</h2>
          <Button asChild className="mt-4">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      ) : cartItems && cartItems.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <Button asChild className="mt-4">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            {cartItems?.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg shadow-sm">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />}
                  </div>
                  <div className="flex-grow flex flex-col sm:flex-row justify-between">
                    <div>
                      <h2 className="font-headline font-semibold text-lg">{item.name}</h2>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center sm:justify-end gap-4 mt-2 sm:mt-0">
                      <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                      </div>
                      <p className="font-bold text-lg w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(item.id)}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="lg:col-span-1 sticky top-24">
            <div className="border rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-headline font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button asChild size="lg" className="w-full mt-6" disabled={cartItems?.length === 0}>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
