import { IBaseRepository } from "../BaseRepository";
import { db } from "@/server/db/index";
import { user } from "@/server/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export class UserRepository implements IBaseRepository<any> {

    async get(clerkUserId: string): Promise<any> {
        const result = await db.select().from(user).where(eq(user.id, clerkUserId));
        return result
    };


    async getAll(): Promise<any> {
        const result = await db.select().from(user);
        return result
    };


    async create(clerkUserId: string): Promise<any> {
        const newUser = await clerkClient.users.getUser(clerkUserId);

        const result = await db.insert(user)
            .values({
                id: clerkUserId,
                username: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            })
            .onConflictDoNothing();
        return result;
    };


    async update(clerkUserId: string): Promise<any> {
        return true;
    };


    async delete(clerkUserId: string): Promise<any> {
        const result = await db.delete(user)
            .where(eq(user.id, clerkUserId));
        return result;
    };
}
