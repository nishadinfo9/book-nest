import {
  boolean,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "CUSTOMER",
  "ADMIN",
  "MANAGER",
]);

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  provider: varchar("provider", { length: 20 }),
  externalId: varchar("external_id", { length: 100 }),
  image: text("image"),
  role: userRoleEnum("role").notNull().default("CUSTOMER"),
  isActive: boolean("is_active").default(true),
  emailVerified: boolean("email_verified").default(false).notNull(),
  createdAt: timestamp("created_at", {withTimezone: true,}).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {withTimezone: true,}).defaultNow().notNull(),
}, (table) => {
  return {
    emailIndex: index("idx_user_email").on(table.email),
  };
});


export const books = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  isbn13: varchar("isbn13", {length: 20,}).unique(),
  publisherId: uuid("publisher_id").references(() => publishers.id,{onDelete: 'set null'}),
  authorId: uuid("author_id").references(() => authors.id,{onDelete: 'set null'}),
  language: varchar("language", {length: 10,}).default("EN"),
  price: numeric("price", {precision: 10,scale: 2,}).notNull(),
  coverImage: varchar("cover_image", { length: 500 }),
  description: text("description"),
  categoryId: uuid("category_id").references(() => categories.id, {onDelete: 'set null'}),
  averageRating: numeric("average_rating", {precision: 3,scale: 2,}).default("0"),
  reviewCount: integer("review_count").default(0),
  status: varchar("status", {length: 20,}).default("PUBLISHED").notNull(),
  createdAt: timestamp("created_at", {withTimezone: true,}).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {withTimezone: true,}).defaultNow().notNull(),
});

export const publishers = pgTable("publishers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  logo: text("logo"),
  website: varchar("website", { length: 255 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).unique().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inventory = pgTable("inventory", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookId: uuid("book_id").references(() => books.id, {onDelete: 'cascade'}).notNull(),
  availableStock: integer("available_stock").default(0).notNull(),
  reservedStock: integer("reserved_stock").default(0).notNull(),
  soldStock: integer("sold_stock").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  bookId: uuid("book_id").references(() => books.id),
  quantity: integer("quantity").default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  status: varchar("status", { length: 20 }).default("PENDING").notNull(),
  totalAmount: numeric("total_amount", {precision: 10,scale: 2}).notNull(),
  paymentStatus: varchar("payment_status", { length: 20 }).default("UNPAID").notNull(),
  paymentMethod: varchar("payment_method", { length: 20 }),
  shippingAddress: text("shipping_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, {onDelete: 'cascade'}).notNull(),
  bookId: uuid("book_id").references(() => books.id, {onDelete: 'cascade'}).notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("price", {precision: 10,scale: 2}).notNull(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  bookId: uuid("book_id").references(() => books.id).notNull(),
  rating: integer("rating").notNull().notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const authors = pgTable("authors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  slug: varchar("slug", { length: 150 }).unique().notNull(),
  bio: text("bio"),
  image: text("image"),
  country: varchar("country", { length: 100 }),
  website: varchar("website", { length: 255 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const wishlists = pgTable("wishlists", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const wishlistItems = pgTable("wishlist_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  wishlistId: uuid("wishlist_id").references(() => wishlists.id).notNull(),
  bookId: uuid("book_id").references(() => books.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});