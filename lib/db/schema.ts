import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("CUSTOMER"),
  // CUSTOMER | ADMIN | MANAGER

  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const books = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  author: text("author").notNull(),

  price: integer("price").notNull(),
  stock: integer("stock").default(0),

  description: text("description"),

  image: text("image"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id").references(() => users.id),
  bookId: uuid("book_id").references(() => books.id),

  quantity: integer("quantity").default(1),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id").references(() => users.id),

  totalPrice: integer("total_price").notNull(),

  status: text("status").default("PENDING"),
  // PENDING | SHIPPED | DELIVERED

  address: text("address").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id").references(() => users.id),
  bookId: uuid("book_id").references(() => books.id),

  rating: integer("rating").notNull(),
  comment: text("comment"),

  createdAt: timestamp("created_at").defaultNow(),
});