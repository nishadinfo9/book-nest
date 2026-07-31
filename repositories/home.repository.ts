import { baseBookSelection } from "@/lib/db/book.select";
import { db } from "@/lib/db/db";
import {
    authors,
    books,
    categories,
    inventory,
    publishers,
} from "@/lib/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";



export const HomeRepository = {

    async getNewArrival() {
        const newArrival= await db.select(baseBookSelection)
            .from(books).where(eq(books.status, 'PUBLISHED'))
            .innerJoin(categories, eq(categories.id, books.categoryId))
            .innerJoin(authors, eq(authors.id, books.authorId))
            .innerJoin(publishers, eq(publishers.id, books.publisherId))
            .orderBy(desc(books.createdAt))
            .limit(10)

            console.log('newArrival',newArrival)

            return newArrival
    },

    async getBestSeller() {
        return db.select(baseBookSelection).from(inventory)
            .innerJoin(books, eq(books.id, inventory.bookId))
            .innerJoin(categories, eq(categories.id, books.categoryId))
            .innerJoin(authors, eq(authors.id, books.authorId))
            .innerJoin(publishers, eq(publishers.id, books.publisherId))
            .where(eq(books.status, "PUBLISHED"))
            .orderBy(desc(inventory.soldStock))
            .limit(10)
    },

    async getEnglishBooks() {
        return db.select(baseBookSelection).from(books)
            .innerJoin(categories, eq(categories.id, books.categoryId))
            .innerJoin(authors, eq(authors.id, books.authorId))
            .innerJoin(publishers, eq(publishers.id, books.publisherId))
            .where(and(eq(books.language, 'EN'), eq(books.status, 'PUBLISHED')))
            .orderBy(desc(books.createdAt))
            .limit(10)
    },

    async getCategoryBooks(slug: string) {
        return db.select(baseBookSelection).from(books)
            .innerJoin(categories, eq(categories.id, books.categoryId))
            .innerJoin(authors, eq(authors.id, books.authorId))
            .innerJoin(publishers, eq(publishers.id, books.publisherId))
            .where(and(eq(categories.slug, slug), eq(books.status, 'PUBLISHED')))
            .limit(10)
    },

    async getPopularPublishers() {
        return db.select({
            id: publishers.id,
            name: publishers.name,
            logo: publishers.logo,
            totalSold: sql<number>`SUM(${inventory.soldStock})`,
        }).from(publishers)
            .leftJoin(books, eq(books.publisherId, publishers.id))
            .leftJoin(inventory, eq(inventory.bookId, books.id))
            .groupBy(publishers.id, publishers.name, publishers.logo)
            .orderBy(desc(sql`SUM(${inventory.soldStock})`)).limit(10)
    },
};