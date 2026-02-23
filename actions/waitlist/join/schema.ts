import { z } from "zod/v4";

export const joinWaitlistSchema = z.object({
  email: z.email("Please enter a valid email address"),
});
