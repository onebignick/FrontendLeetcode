import { UserRepository } from "@/lib/repository/user/UserRepository";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
	const userRepository: UserRepository = new UserRepository();

	if (!WEBHOOK_SECRET) {
		throw new Error("CLERK_WEBHOOK_SECRET not found");
	}

	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("No svix headers found", {
			status: 400
		});
	}

	try {
		const payload = await request.json();
		const body = JSON.stringify(payload);

		const wh = new Webhook(WEBHOOK_SECRET);
		let event: WebhookEvent;

		event = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;

		const { id: clerkUserId } = event.data;
		if (!clerkUserId) {
			return NextResponse.json(
				{ error: "No user ID provided" },
				{ status: 400 },
			);
		}
		let user = null;
		switch (event.type) {
			case "session.created": {
				break;
			};
			case "user.created": {
				user = await userRepository.create(clerkUserId);
				break;
			}
			case "user.deleted": {
				user = await userRepository.delete(clerkUserId);
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
