import { z } from "zod";
import { BaseNormalizedEntitySchema } from "./BaseNormalizedEntitySchema.js";

export const EventSchema = BaseNormalizedEntitySchema.extend({
  competitionId: z.string(),
  name: z.string(),
  startTime: z.string().datetime(),
  status: z.string(),
  date: z.string(),
});

export type Event = z.infer<typeof EventSchema>;
