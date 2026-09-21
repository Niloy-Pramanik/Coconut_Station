CREATE TABLE "subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact" text NOT NULL,
	"city" text NOT NULL,
	"consent" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
