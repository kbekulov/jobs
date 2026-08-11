PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_decisions` (
	`user_id` text NOT NULL,
	`job_id` text NOT NULL,
	`decision` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`user_id`, `job_id`)
);
--> statement-breakpoint
INSERT INTO `__new_decisions`("user_id", "job_id", "decision", "updated_at") SELECT 'kiril', "job_id", "decision", "updated_at" FROM `decisions`;--> statement-breakpoint
DROP TABLE `decisions`;--> statement-breakpoint
ALTER TABLE `__new_decisions` RENAME TO `decisions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `idx_decisions_user_updated_at` ON `decisions` (`user_id`,`updated_at`);
