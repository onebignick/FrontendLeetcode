import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export class UserRepository implements IBaseRepository<any> {

    async get(id: string): Promise<any> {
        const result = await db.select().from(user).where(eq(user.id, id));
        return result
    };


    async getAll(): Promise<any> {
        const result = await db.select().from(user);
        return result
    };


    async create(clerkUserId: string): Promise<any> {
        const result = await db.insert(user)
            .values({ clerkUserId: clerkUserId })
            .onConflictDoNothing();
        return result;
    };


    async update(clerkUserId: string): Promise<any> {
        return true;
    };


    async delete(clerkUserId: string): Promise<any> {
        const result = await db.delete(user)
            .where(eq(user.clerkUserId, clerkUserId));
        return result;
    };
}
