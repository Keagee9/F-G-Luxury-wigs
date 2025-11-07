export type Wig = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageIds: string[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  details: {
    length: string;
    color: string;
    texture: string;
    material: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageId: string;
};

export type Review = {
    id: string;
    wigId: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
};
