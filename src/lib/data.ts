import type { Wig, BlogPost, Review } from './types';
import PlaceHolderImages from './placeholder-images.json';

export { PlaceHolderImages };

export const wigs: Wig[] = [
  {
    id: 'sleek-bob-1',
    name: 'Classic Sleek Bob',
    price: 299.99,
    description: 'A timeless classic, this sleek bob is crafted from 100% Remy human hair for a natural look and feel. Perfect for a sophisticated and polished appearance, day or night.',
    imageIds: ['wig-1', 'wig-2'],
    rating: 4.8,
    reviewCount: 152,
    isNew: true,
    details: {
      length: '10 inches',
      color: 'Natural Black',
      texture: 'Straight',
      material: 'Remy Human Hair',
    },
  },
  {
    id: 'beach-waves-2',
    name: 'Sunset Beach Waves',
    price: 379.99,
    description: 'Capture the essence of a summer sunset with these luscious beach waves. The balayage of warm tones gives a sun-kissed effect, while the high-quality human hair ensures a soft, flowing movement.',
    imageIds: ['wig-3', 'wig-4'],
    rating: 4.9,
    reviewCount: 210,
    isNew: true,
    details: {
      length: '22 inches',
      color: 'Sunset Balayage',
      texture: 'Wavy',
      material: 'Virgin Human Hair',
    },
  },
  {
    id: 'crimson-curl-3',
    name: 'Royal Crimson Curl',
    price: 349.99,
    description: 'Make a bold statement with these vibrant crimson curls. This wig is designed for those who love to stand out, offering voluminous texture and a rich, eye-catching color.',
    imageIds: ['wig-5', 'wig-6'],
    rating: 4.7,
    reviewCount: 98,
    isNew: false,
    details: {
      length: '18 inches',
      color: 'Deep Crimson Red',
      texture: 'Curly',
      material: 'Remy Human Hair',
    },
  },
  {
    id: 'platinum-pixie-4',
    name: 'Icy Platinum Pixie',
    price: 249.99,
    description: 'Chic and edgy, the Icy Platinum Pixie is a modern cut that exudes confidence. The striking platinum blonde shade is pre-toned to perfection, and the short style is easy to manage.',
    imageIds: ['wig-7', 'wig-8'],
    rating: 4.6,
    reviewCount: 75,
    isNew: false,
    details: {
      length: '6 inches',
      color: 'Platinum Blonde',
      texture: 'Straight',
      material: 'Remy Human Hair',
    },
  },
  {
    id: 'long-jet-black-5',
    name: 'Midnight Long & Straight',
    price: 429.99,
    description: 'Pure glamour in its longest form. This 26-inch wig in a deep jet black offers endless styling possibilities. The virgin hair quality ensures it remains tangle-free and silky smooth.',
    imageIds: ['wig-9', 'wig-10'],
    rating: 4.9,
    reviewCount: 180,
    isNew: false,
    details: {
      length: '26 inches',
      color: 'Jet Black',
      texture: 'Straight',
      material: 'Virgin Human Hair',
    },
  },
   {
    id: 'caramel-delight-6',
    name: 'Caramel Delight Layers',
    price: 389.99,
    description: 'Soft layers and warm caramel highlights create a beautiful, multi-dimensional look. This wig is perfect for adding volume and warmth, suitable for any occasion.',
    imageIds: ['wig-11', 'wig-12'],
    rating: 4.8,
    reviewCount: 115,
    isNew: true,
    details: {
      length: '20 inches',
      color: 'Caramel Highlights',
      texture: 'Wavy',
      material: 'Remy Human Hair',
    },
  },
];

export const reviews: Review[] = [
    {
        id: 'rev-1',
        wigId: 'sleek-bob-1',
        author: 'Jessica L.',
        rating: 5,
        comment: 'Absolutely stunning! The hair quality is top-notch and it looks so natural. I get compliments everywhere I go. Highly recommend!',
        date: '2023-10-15',
    },
    {
        id: 'rev-2',
        wigId: 'sleek-bob-1',
        author: 'Samantha P.',
        rating: 4,
        comment: 'Really beautiful and well-made. It shed a little at first but that stopped after the first wash. The cut is perfect.',
        date: '2023-10-12',
    },
    {
        id: 'rev-3',
        wigId: 'beach-waves-2',
        author: 'Emily R.',
        rating: 5,
        comment: 'I am in LOVE with this wig. The color is even more beautiful in person. It feels so light and comfortable to wear. Worth every penny.',
        date: '2023-11-01',
    },
    {
        id: 'rev-4',
        wigId: 'beach-waves-2',
        author: 'Chloe T.',
        rating: 5,
        comment: 'This is my new favorite wig. The waves are perfect and they hold their shape so well. The hairline is also very realistic.',
        date: '2023-10-28',
    },
    {
        id: 'rev-5',
        wigId: 'crimson-curl-3',
        author: 'Aisha K.',
        rating: 5,
        comment: 'The color is so vibrant and beautiful. The curls are soft and bouncy. I feel like a queen wearing this!',
        date: '2023-09-20',
    }
];

export const blogPosts: BlogPost[] = [
  {
    slug: '5-tips-for-maintaining-your-human-hair-wig',
    title: '5 Essential Tips for Maintaining Your Human Hair Wig',
    excerpt: 'Keep your investment looking flawless with our top five maintenance tips. From washing to storing, we cover everything you need to know to extend the life of your wig.',
    content: `
<p>Investing in a high-quality human hair wig is just the first step. To keep it looking beautiful and feeling soft, proper maintenance is key. Here are our top 5 essential tips:</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">1. Wash with Care</h3>
<p>Use sulfate-free shampoos and conditioners specifically designed for color-treated hair or wigs. Wash your wig on a mannequin head to avoid tangling, and use lukewarm water. Gently squeeze out excess water, but never wring or twist the hair.</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">2. Detangle Gently</h3>
<p>Always use a wide-tooth comb or your fingers to detangle, starting from the ends and working your way up to the roots. Detangle only when the hair is damp and saturated with conditioner to minimize breakage.</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">3. Minimize Heat Styling</h3>
<p>While human hair wigs can be heat-styled, excessive heat can cause damage over time. When you do use heat tools, apply a quality heat protectant spray and use the lowest effective temperature setting.</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">4. Store It Properly</h3>
<p>When you're not wearing your wig, store it on a wig stand or mannequin head. This helps maintain its shape and prevents tangles and matting. Keep it away from direct sunlight and dust.</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">5. Deep Condition Regularly</h3>
<p>Human hair wigs don't receive natural oils from the scalp, so they can become dry. A deep conditioning treatment once or twice a month will restore moisture, softness, and shine. </p>
`,
    author: 'Luxe Locks Stylists',
    date: '2023-10-25',
    imageId: 'blog-1',
  },
  {
    slug: 'choosing-the-right-wig-for-your-face-shape',
    title: 'Choosing the Right Wig for Your Face Shape',
    excerpt: 'Unlock your most flattering look by understanding which wig styles complement your unique face shape. Our guide breaks it down for you.',
    content: `
<p>The secret to a wig looking natural and flattering is choosing a style that complements your face shape. Here's a quick guide to get you started:</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">Oval Face</h3>
<p>Considered the "ideal" face shape, almost any style works well. Feel free to experiment with lengths, textures, and cuts. From short pixies to long layers, the options are endless.</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">Round Face</h3>
<p>To elongate a round face, choose styles that add height and volume on top, with less volume on the sides. Long, layered wigs, asymmetrical bobs, or styles with an off-center part are excellent choices.</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">Square Face</h3>
<p>Soften the strong jawline of a square face with styles that have texture, waves, or curls. Wigs with layers and length, especially around the face, can create a softer, more romantic look.</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">Heart-Shaped Face</h3>
<p>Balance a wider forehead and a narrower chin with styles that have volume at the bottom. Bobs, shoulder-length cuts, and styles with side-swept bangs are particularly flattering.</p>
`,
    author: 'Luxe Locks Stylists',
    date: '2023-10-18',
    imageId: 'blog-2',
  },
];
