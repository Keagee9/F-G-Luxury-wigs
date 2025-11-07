import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find((img) => img.id === post.imageId);

  return (
    <article className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">{post.title}</h1>
        <div className="text-muted-foreground text-sm">
          <span>By {post.author}</span> | <span>Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </header>
      
      {postImage && (
        <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={postImage.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint={postImage.imageHint}
            priority
          />
        </div>
      )}

      <div 
        className="prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-p:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Separator className="my-12" />

      <footer className="text-center">
          <p className="text-muted-foreground">Thank you for reading!</p>
          <p className="font-headline text-lg mt-2">Luxe Locks Boutique</p>
      </footer>
    </article>
  );
}
