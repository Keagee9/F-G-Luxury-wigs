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
import { Logo } from '@/components/shared/Logo';
import PlaceHolderImages from '@/lib/placeholder-images.json';


export default function Home() {
  const firestore = useFirestore();
  
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), limit(3));
  }, [firestore]);

  const { data: featuredWigs } = useCollection<Wig>(productsQuery);

  const featuredPosts = blogPosts.slice(0, 2);
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-top"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-end text-center text-primary-foreground p-8">
          <div className="mb-4">
            <svg width="150" height="150" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="480" height="480" fill="#C5A880"/>
              <path d="M127.44 96.12V115.32H110.64V196.92H149.04V216.12H89.28V196.92H127.44V146.76C127.44 135.24 129.12 126.96 132.48 121.92C135.84 116.88 141.12 113.64 148.32 112.2V96.12H127.44ZM202.816 216.12C186.256 216.12 172.696 211.56 162.136 202.44C151.576 193.32 146.296 181.44 146.296 166.8C146.296 152.04 151.636 140.16 162.316 131.16C172.996 122.16 186.676 117.66 203.356 117.66C215.116 117.66 225.436 120.12 234.316 125.04L228.316 142.02C221.716 138.66 214.456 137.04 206.536 137.04C196.816 137.04 189.256 139.38 183.856 144.06C178.456 148.74 175.756 155.88 175.756 165.48C175.756 175.2 178.456 182.46 183.856 187.26C189.256 192.06 196.696 194.46 206.176 194.46C212.536 194.46 218.416 193.5 223.816 191.58V171.78H204.076V155.22H246.076V208.98C236.476 213.66 224.236 216.12 209.356 216.12H202.816Z" fill="black"/>
               <text x="50%" y="75%" dominantBaseline="middle" textAnchor="middle" fontSize="48" fontFamily="serif" fill="black">F&G LUXURY</text>
              <text x="50%" y="85%" dominantBaseline="middle" textAnchor="middle" fontSize="48" fontFamily="serif" fill="black">WIGS</text>
            </svg>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
            Find Your Signature Style
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl font-light drop-shadow-md">
            Experience the luxury of premium human hair wigs, tailored to your unique beauty.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 transition-transform hover:scale-105">
            <Link href="/products">Shop The Collection</Link>
          </Button>
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
