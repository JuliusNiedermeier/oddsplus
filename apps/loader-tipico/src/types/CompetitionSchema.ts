import { z } from "zod";
import { BaseNormalizedEntitySchema } from "./BaseNormalizedEntitySchema.js";

export const CompetitionSchema = BaseNormalizedEntitySchema.extend({
  sportId: z.string(),
  name: z.string(),
});

export type Competition = z.infer<typeof CompetitionSchema>;
