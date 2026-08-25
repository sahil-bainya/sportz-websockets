ALTER TABLE "admin" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_created_by_admin_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."admin"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin" ADD CONSTRAINT "admin_email_unique" UNIQUE("email");