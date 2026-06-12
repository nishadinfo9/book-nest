import { api } from "./client";

export const getBooks = async () => {
  const response = await api.get("/books");
  return await response.data;
};

export const getSingleBook = async (slug: string) => {
  const response = await api.get(`/books/${slug}`);
  return await response.data;
}

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/books", { body: formData });
  return await response.data;
};