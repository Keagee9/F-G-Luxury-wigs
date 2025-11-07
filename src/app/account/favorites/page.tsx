import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { wigs } from '@/lib/data';
import { ProductCard } from '@/components/shared/ProductCard';
import { ArrowLeft, HeartOff } from 'lucide-react';

const favoriteWigs = wigs.slice(2, 5);

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex items-center mb-8">
         <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/account"><ArrowLeft/></Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">My Favorites</h1>
      </div>

      {favoriteWigs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteWigs.map((wig) => (
            <div key={wig.id} className="relative group">
              <ProductCard wig={wig} />
              <Button size="icon" variant="destructive" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <HeartOff className="h-4 w-4" />
                <span className="sr-only">Remove from favorites</span>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">You have no favorite wigs yet.</h2>
          <p className="text-muted-foreground mt-2">Browse our collection and save the styles you love.</p>
          <Button asChild className="mt-4">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
