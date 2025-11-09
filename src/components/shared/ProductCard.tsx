"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Wig } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/data";
import { Star, ShoppingCart, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  wig: Wig;
};

export function ProductCard({ wig }: ProductCardProps) {
  const productImage = PlaceHolderImages.find((img) => img.id === wig.imageIds[0]);

  return (
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
                <Button size="sm" variant="secondary" onClick={(e) => e.stopPropagation()}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button size="sm" onClick={(e) => e.stopPropagation()}>
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
  );
}
