"use server"

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(formData: FormData) {
	if (!checkRole("admin")) {
		return { message: "Not Authorized" };
	}

	try {
		const res = await clerkClient.users.updateUser(
			formData.get("id") as string,
			{
				publicMetadata: { role: formData.get("role") },
			}
		);
		return { message: res.publicMetadata };
	} catch (err) {
		return { message: err };
	}
}
