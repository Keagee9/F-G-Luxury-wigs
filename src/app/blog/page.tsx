import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Style Guide & Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your expert resource for wig care, styling tips, and trend inspiration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {blogPosts.map((post) => {
          const postImage = PlaceHolderImages.find((img) => img.id === post.imageId);
          return (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
              <Card className="overflow-hidden h-full flex flex-col transition-shadow hover:shadow-xl">
                {postImage && (
                  <div className="relative h-56 w-full">
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
                  <p className="text-sm text-muted-foreground mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <h2 className="font-headline text-2xl font-semibold mb-2 flex-grow">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                   <span className="font-semibold text-primary group-hover:underline mt-auto">
                    Read More <ArrowRight className="inline-block ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
