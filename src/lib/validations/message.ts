import { z } from "zod";

export const messagValidator = z.object({
  id: z.string(),
  senderId: z.string(),
  text: z.string(),
  timestamp: z.number(),
});

export const messageArrayValidator = z.array(messagValidator);

export type Message = z.infer<typeof messagValidator>;
