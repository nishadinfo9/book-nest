import { FormValue } from '@/app/admin/inventory/_components/inventory-form';
import { api } from './client';
import { AuthorFormValue } from '@/app/admin/authors/_components/authors-form';
import { LoggedInUserType, RegisterUserType } from '@/types/user.type';
import { CategoryFormValue } from '@/app/admin/category/_components/category-form';
import { PublisherFormValue } from '@/app/admin/publisher/_components/publisher-form';

export const getHomePageData = async () => {
  const response = await api.get('/home');
  return await response.data;
};

export const registerUser = async (data: RegisterUserType) => {
  const response = await api.post('/signup', data);
  return response.data;
};

export const loggedInUser = async (data: LoggedInUserType) => {
  const response = await api.post('/login', data);
  return response.data;
};

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
  const { data } = await api.get('/carts');
  return data;
};

export const removeCart = async (id: string) => {
  const { data } = await api.delete(`/carts/${id}`);
  return data;
};

export const updateCartQuantity = async (id: string, quantity: number) => {
  const { data } = await api.patch(`/carts/${id}`, {
    quantity,
  });

  return data;
};

export const addWishlist = async (id: string) => {
  const response = await api.post('/wishlist', { bookId: id });
  return response.data;
};

export const getMyWishlists = async () => {
  const { data } = await api.get('/wishlist');
  return data;
};

export const createReview = async (data: FormData) => {
  const response = await api.post('/reviews', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getReviews = async () => {
  const { data } = await api.get('/reviews');
  return data;
};

export const createPayment = async ({paymentMethod, shippingAddress}: {paymentMethod: string, shippingAddress: string}) => {
  const response = await api.post('/orders', {paymentMethod, shippingAddress}, );
  return response.data;
};

export const getAllOrders = async () => {
  const { data } = await api.get('/orders');
  return data;
};

export const getpaymantHistory = async () => {
  const { data } = await api.get('/payment/history');
  return data;
};

export const getDashboardData = async () => {
  const { data } = await api.get('/dashboard');
  return data;
};

export const getBookSuggestion = async ({search}:{search: string}) => {
  const { data } = await api.get(`/books/search/suggestion?q=${search}`);
  return data;
};

export const getBookSearchResult = async ({term}:{term: string}) => {
  console.log('term', term)
  const { data } = await api.get(`/books/search?q=${term}&page=${1}&limit=${10}`);
  return data;
};

export const createCategory = async (data: CategoryFormValue) => {
  const response = await api.post('/categories', data);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await api.get('/categories');
  return await response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await api.delete(`/categories/${id}`);
  return await response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await api.get(`/categories/${id}`);
  return await response.data;
};


export const createPublisher = async (data: PublisherFormValue) => {
  const response = await api.post('/publisher', data);
  return response.data;
};

export const getAllPublishers = async () => {
  const response = await api.get('/publisher');
  return await response.data;
};

export const deletePublisher = async (id: string) => {
  const response = await api.delete(`/publisher/${id}`);
  return await response.data;
};

export const getPublisherById = async (id: string) => {
  const response = await api.get(`/publisher/${id}`);
  return await response.data;
};