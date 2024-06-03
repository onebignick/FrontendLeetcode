CREATE TABLE IF NOT EXISTS "frontendLeetcode_question" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(1024) NOT NULL,
	"question" varchar(10000) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp,
	"expected_output" varchar(10000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "frontendLeetcode_submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(32),
	"question_id" integer,
	"language" varchar(256) NOT NULL,
	"code" varchar(10000) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "frontendLeetcode_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp,
	"clerkUserId" varchar(32)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "frontendLeetcode_submission" ADD CONSTRAINT "frontendLeetcode_submission_username_frontendLeetcode_user_id_fk" FOREIGN KEY ("username") REFERENCES "public"."frontendLeetcode_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "frontendLeetcode_submission" ADD CONSTRAINT "frontendLeetcode_submission_question_id_frontendLeetcode_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."frontendLeetcode_question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
