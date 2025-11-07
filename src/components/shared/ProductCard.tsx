import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Wig } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/data";
import { Star } from "lucide-react";

type ProductCardProps = {
  wig: Wig;
};

export function ProductCard({ wig }: ProductCardProps) {
  const productImage = PlaceHolderImages.find((img) => img.id === wig.imageIds[0]);

  return (
    <Link href={`/products/${wig.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative aspect-square w-full overflow-hidden">
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
            {wig.isNew && (
              <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">New</Badge>
            )}
          </div>
          <div className="p-4">
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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
