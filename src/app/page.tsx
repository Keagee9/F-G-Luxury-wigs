'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { blogPosts } from '@/lib/data';
import { ProductCard } from '@/components/shared/ProductCard';
import { ArrowRight } from 'lucide-react';
import type { Wig } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, limit, query } from 'firebase/firestore';
import PlaceHolderImages from '@/lib/placeholder-images.json';


export default function Home() {
  const firestore = useFirestore();
  
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), limit(3));
  }, [firestore]);

  const { data: featuredWigs } = useCollection<Wig>(productsQuery);

  const featuredPosts = blogPosts.slice(0, 2);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full bg-primary/20">
        <div className="container mx-auto px-4 h-full">
          <div className="relative z-10 grid md:grid-cols-2 items-center h-full">
            <div className="text-center md:text-left">
              <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg text-primary">
                Find Your Signature Style
              </h1>
              <p className="mt-4 max-w-2xl text-lg md:text-xl font-light drop-shadow-md text-foreground">
                Experience the luxury of premium human hair wigs, tailored to your unique beauty.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 transition-transform hover:scale-105">
                <Link href="/products">Shop The Collection</Link>
              </Button>
            </div>
            <div className="hidden md:block relative w-full h-full">
               <Image
                src="https://picsum.photos/seed/logo/600/600"
                alt="Brand Logo"
                fill
                className="object-contain"
                data-ai-hint="logo company"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Featured Wigs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWigs?.map((wig) => (
              <ProductCard key={wig.id} wig={wig} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">View All Wigs <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Style Guide Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Your Guide to Effortless Style
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => {
              const postImage = PlaceHolderImages.find((img) => img.id === post.imageId);
              return (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                  <Card className="overflow-hidden h-full flex flex-col transition-shadow hover:shadow-xl">
                    {postImage && (
                       <div className="relative h-64 w-full">
                        <Image
                          src={postImage.imageUrl}
                          alt={postImage.description}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          data-ai-hint={postImage.imageHint}
                        />
                      </div>
                    )}
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <h3 className="font-headline text-2xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                      <span className="font-semibold text-primary group-hover:underline">
                        Read More <ArrowRight className="inline-block ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
           <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Visit The Blog <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
