export interface ReviewType {
  id: string;
  rating: string;
  comment: string;
  image: string;
  avatar?:string
  user?: string;
}
