CREATE TABLE `decisions` (
	`job_id` text PRIMARY KEY NOT NULL,
	`decision` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
