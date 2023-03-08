import { z } from "zod";
import { BaseNormalizedEntitySchema } from "./BaseNormalizedEntitySchema.js";

export const SportSchema = BaseNormalizedEntitySchema.extend({
  name: z.string(),
});

export type Sport = z.infer<typeof SportSchema>;
