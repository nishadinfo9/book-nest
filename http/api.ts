import { api } from "./client";

export const getBooks = async () => {
  const response = await api.get("/books");
  return await response.data;
};

export const getSingleBook = async (slug: string) => {
  const response = await api.get(`/books/${slug}`);
  return await response.data;
};

export const createBook = async (data: FormData) => {
  const response = await api.post("/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteBook = async (slug: string) => {
  const response = await api.delete(`/books/${slug}`);
  return await response.data;
};


export const getAllCategories = async () => {
  const response = await api.get("/categories");
  return await response.data;
};

export const getAllPublisher = async () => {
  const response = await api.get("/publisher");
  return await response.data;
};

export const getAllAuthors = async () => {
  const response = await api.get("/authors");
  return await response.data;
};