ALTER TYPE "public"."issue_dimension" ADD VALUE 'agent_readiness';--> statement-breakpoint
ALTER TABLE "competitors" ADD COLUMN "score_agent_readiness" integer;--> statement-breakpoint
ALTER TABLE "scans" ADD COLUMN "score_agent_readiness" integer;