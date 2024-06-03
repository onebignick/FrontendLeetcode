import { UserRepository } from "@/lib/repository/user/UserRepository";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const userRepository: UserRepository = new UserRepository();
	try {
		const event = (await request.json()) as WebhookEvent;
		const { id: clerkUserId } = event.data;
		if (!clerkUserId) {
			return NextResponse.json(
				{ error: "No user ID provided" },
				{ status: 400 },
			);
		}
		let user = null;
		switch (event.type) {
			case "user.created": {
				user = await userRepository.create(clerkUserId);
				console.log(user);
				break;
			}
			case "user.deleted": {
				user = await userRepository.delete(clerkUserId);
				console.log(user);
				break;
			}
			case "user.updated": {
				break;
			}
			default:
				break;
		}
		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
