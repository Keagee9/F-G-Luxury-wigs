"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Wig } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/data";
import { Star, ShoppingCart, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth, useFirestore, useUser } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ProductCardProps = {
  wig: Wig;
};

export function ProductCard({ wig }: ProductCardProps) {
  const productImage = PlaceHolderImages.find((img) => img.id === wig.imageIds[0]);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    if (firestore) {
      const cartCollectionRef = collection(firestore, 'users', user.uid, 'cart_items');
      const newCartItem = {
        productId: wig.id,
        quantity: 1,
        userId: user.uid,
        name: wig.name,
        price: wig.price,
        imageUrl: productImage?.imageUrl || ''
      };
      addDocumentNonBlocking(cartCollectionRef, newCartItem);
      toast({
        title: "Added to Cart",
        description: `${wig.name} has been added to your cart.`,
      });
    }
  };

  const handlePurchase = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/checkout');
  };

  return (
    <>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <CardContent className="p-0">
          <div className="relative aspect-square w-full overflow-hidden">
            <Link href={`/products/${wig.id}`}>
              {productImage ? (
                <Image
                  src={productImage.imageUrl}
                  alt={wig.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={productImage.imageHint}
                />
              ) : (
                  <div className="w-full h-full bg-secondary"/>
              )}
            </Link>
            {wig.isNew && (
              <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">New</Badge>
            )}
             <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-2">
                  <Button size="sm" variant="secondary" onClick={handleAddToCart}>
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                  <Button size="sm" onClick={handlePurchase}>
                      <Zap className="mr-2 h-4 w-4" /> Purchase
                  </Button>
              </div>
          </div>
          <Link href={`/products/${wig.id}`} className="block p-4">
              <h3 className="font-headline text-lg font-semibold truncate">{wig.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xl font-bold text-primary">
                  ${wig.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm text-muted-foreground font-medium">{wig.rating} ({wig.reviewCount})</span>
                </div>
              </div>
          </Link>
        </CardContent>
      </Card>
      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Please Sign In</AlertDialogTitle>
            <AlertDialogDescription>
              You need to be logged in to add items to your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link href="/login">Sign In</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
