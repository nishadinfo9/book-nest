export interface BookType {
  id?: string
  title: string;
  isbn13?: string;
  publisherId?: string;
  language: string;
  price: number;
  coverImage?: string;
  description?: string;
  categoryId: string;
}
