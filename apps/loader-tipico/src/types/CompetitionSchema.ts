import { z } from "zod";

export const CompetitionSchema = z.object({
  id: z.string(),
  sportId: z.string(),
  name: z.string(),
});

export type Competition = z.infer<typeof CompetitionSchema>;
