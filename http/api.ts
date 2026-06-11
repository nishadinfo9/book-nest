import { api } from "./client";

export const getBooks = async () => {
  const response = await api.get("/books");
  return await response.data;
};

export const getSingleBook = async (slug: string) => {
  const response = await api.get(`/books/${slug}`);
  return await response.data;
}