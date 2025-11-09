'use client';
import Image from 'next/image';
import { wigs, reviews as allReviews } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Truck, ShieldCheck, Plus, Minus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const wig = wigs.find((w) => w.id === params.id);

  if (!wig) {
    notFound();
  }

  const productImages = wig.imageIds.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);
  const mainImage = productImages[0];
  const galleryImages = productImages.slice(1);
  const reviews = allReviews.filter(review => review.wigId === wig.id);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg mb-4">
            {mainImage && (
              <Image
                src={mainImage.imageUrl}
                alt={wig.name}
                fill
                className="object-cover"
                data-ai-hint={mainImage.imageHint}
                priority
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((image) => image && (
              <div key={image.id} className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md">
                <Image
                  src={image.imageUrl}
                  alt={`${wig.name} gallery image`}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">{wig.name}</h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="font-semibold">{wig.rating}</span>
              <span className="text-muted-foreground">({wig.reviewCount} reviews)</span>
            </div>
            {wig.isNew && <Badge className="bg-accent text-accent-foreground">New Arrival</Badge>}
          </div>
          <p className="text-4xl font-bold text-primary mt-6">${wig.price.toFixed(2)}</p>
          
          <p className="mt-6 text-muted-foreground leading-relaxed">{wig.description}</p>
          
          <div className="flex items-center space-x-4 my-8">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon"><Minus className="h-4 w-4" /></Button>
              <span className="w-12 text-center">1</span>
              <Button variant="ghost" size="icon"><Plus className="h-4 w-4" /></Button>
            </div>
            <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Add to Cart</Button>
          </div>
          
          <div className="space-y-4 text-sm text-muted-foreground border-t pt-6">
            <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary"/>
                <span>Free shipping on orders over $150</span>
            </div>
            <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary"/>
                <span>30-day return policy & quality guarantee</span>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>Length:</strong> {wig.details.length}</li>
                    <li><strong>Color:</strong> {wig.details.color}</li>
                    <li><strong>Texture:</strong> {wig.details.texture}</li>
                    <li><strong>Material:</strong> {wig.details.material}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Care Instructions</AccordionTrigger>
              <AccordionContent>
                Wash with sulfate-free shampoo, detangle gently with a wide-tooth comb, and air dry on a wig stand for best results. Avoid excessive heat.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 lg:mt-24 border-t pt-12">
        <h2 className="text-3xl font-headline font-bold mb-8">Customer Reviews</h2>
        <div className="space-y-8">
          {reviews.length > 0 ? reviews.map(review => {
            const avatar = PlaceHolderImages.find(img => img.id.startsWith('avatar'));
            return (
              <div key={review.id} className="flex gap-4">
                <Avatar>
                  {avatar && <AvatarImage src={avatar.imageUrl} alt={review.author} data-ai-hint={avatar.imageHint} />}
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{review.author}</h4>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            );
          }) : <p className="text-muted-foreground">No reviews yet. Be the first to share your thoughts!</p>}
        </div>
      </div>
    </div>
  );
}
