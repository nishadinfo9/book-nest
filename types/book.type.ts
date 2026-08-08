export interface BookType {
  id: string
  slug: string
  title: string;
  isbn13?: string;
  publisherId?: string;
  authorId?: string;
  authorSlug?: string;
  language: string;
  price: number;
  coverImage?: string;
  description?: string;
  categoryId: string;
  averageRating?: number;
  author?: string;
  discountPrice?: number;
  wishlisted: boolean
}
