import { Client } from "pg";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
    POSTGRES_USER,
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
} = process.env;

export const createClientAndConnect = async (): Promise<Client | null> => {
    try {
        const client = new Client({
            user: POSTGRES_USER,
            host: POSTGRES_HOST || "localhost",
            database: POSTGRES_DB,
            password: POSTGRES_PASSWORD,
            port: Number(POSTGRES_PORT) || 5432,
        });

        await client.connect();

        const res = await client.query("SELECT NOW()");
        console.log("  ➜ 🎸 Connected to the database at:", res?.rows?.[0].now);
        client.end();

        return client;
    } catch (e) {
        console.error(e);
    }

    return null;
};

export const sequelize = new Sequelize({
    dialect: "postgres",
    database: POSTGRES_DB,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST || "localhost",
    port: Number(POSTGRES_PORT) || 5432,
});
