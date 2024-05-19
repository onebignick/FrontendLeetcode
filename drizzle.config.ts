import { defineConfig } from "drizzle-kit";
import "./envConfig.ts";

export default defineConfig({
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.POSTGRES_URL as string
    },
    schema: "./src/server/db/schema.ts",
    tablesFilter: ["frontendLeetcode_*"]
});