import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { wigs, blogPosts, PlaceHolderImages } from '@/lib/data';
import { ProductCard } from '@/components/shared/ProductCard';
import { ArrowRight, Sparkles, UserCheck } from 'lucide-react';

export default function Home() {
  const featuredWigs = wigs.slice(0, 3);
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
            {featuredWigs.map((wig) => (
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

      {/* AI Features Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
                Discover Your Perfect Match
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our innovative AI tools make finding your next look easier and more personal than ever.
              </p>
              <div className="space-y-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-primary text-primary-foreground rounded-full">
                       <Sparkles />
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-semibold mb-2">Virtual Try-On</h3>
                      <p className="text-muted-foreground mb-4">Upload your photo and instantly see how our wigs look on you. It's the modern way to shop for hair.</p>
                      <Button asChild variant="link" className="p-0 h-auto text-primary">
                        <Link href="/#">Try It Now <ArrowRight className="ml-2" /></Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-primary text-primary-foreground rounded-full">
                       <UserCheck />
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-semibold mb-2">Personalized Recommendations</h3>
                      <p className="text-muted-foreground mb-4">Answer a few questions and let our AI stylist suggest the perfect wigs for your face shape, skin tone, and style.</p>
                       <Button asChild variant="link" className="p-0 h-auto text-primary">
                        <Link href="/#">Get Recommendations <ArrowRight className="ml-2" /></Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
               <Image
                src="https://picsum.photos/seed/4/600/800"
                alt="Woman trying on a wig"
                fill
                className="object-cover"
                data-ai-hint="woman model"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Style Guide Section */}
      <section className="py-16 lg:py-24 bg-background">
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
