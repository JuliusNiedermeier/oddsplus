import { z } from "zod";

export const EventSchema = z.object({
  id: z.string(),
  competitionId: z.string(),
  name: z.string(),
  startTime: z.string().datetime(),
  status: z.string(),
  date: z.string(),
});

export type Event = z.infer<typeof EventSchema>;
