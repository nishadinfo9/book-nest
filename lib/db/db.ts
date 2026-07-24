
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryString = process.env.DATABASE_URL as string;
export const connection = postgres(queryString, {
    max: 5,
    idle_timeout: 20,
    connect_timeout: 20
});

export const db = drizzle({ client: connection });