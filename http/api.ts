import { FormValue } from '@/app/admin/inventory/_components/inventory-form';
import { api } from './client';
import { AuthorFormValue } from '@/app/admin/authors/_components/authors-form';

export const getBooks = async () => {
  const response = await api.get('/books');
  return await response.data;
};

export const getSingleBook = async (slug: string) => {
  const response = await api.get(`/books/${slug}`);
  return await response.data;
};

export const getSingleBookById = async (id: string) => {
  const response = await api.get(`/books/single/${id}`);
  return await response.data;
};

export const createBook = async (data: FormData) => {
  const response = await api.post('/books', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteBook = async (slug: string) => {
  const response = await api.delete(`/books/${slug}`);
  return await response.data;
};

export const getAllCategories = async () => {
  const response = await api.get('/categories');
  return await response.data;
};

export const getAllPublisher = async () => {
  const response = await api.get('/publisher');
  return await response.data;
};

export const getAllAuthors = async () => {
  const response = await api.get('/authors');
  return await response.data;
};

export const getAuthorById = async (id: string) => {
  const response = await api.get(`/authors/${id}`);
  return await response.data;
};

export const deleteAuthor = async (id: string) => {
  const response = await api.delete(`/authors/${id}`);
  return await response.data;
};

export const createAuthor = async (data: AuthorFormValue) => {
  const response = await api.post('/authors', data);
  return response.data;
};

export const createInventory = async (data: FormValue) => {
  const response = await api.post('/inventories', data);
  return response.data;
};

export const getInventories = async () => {
  const response = await api.get('/inventories');
  return await response.data;
};

export const deleteInventory = async (id: string) => {
  const response = await api.delete(`/inventories/${id}`);
  return await response.data;
};

export const getInventoryById = async (id: string) => {
  const response = await api.get(`/inventories/${id}`);
  return await response.data;
};

export const createCart = async (id: string) => {
  const response = await api.post('/carts', { bookId: id });
  return response.data;
};

export const getCart = async () => {
  const { data } = await api.get("/carts");
  return data;
};

export const removeCart = async (id: string) => {
  const { data } = await api.delete(`/carts/${id}`);
  return data;
}

export const updateCartQuantity = async (id: string, quantity: number) => {
  const { data } = await api.patch(`/carts/${id}`, {
    quantity,
  });

  return data;
};
