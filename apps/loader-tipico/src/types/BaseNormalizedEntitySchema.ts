import { z } from "zod";

export const BaseNormalizedEntitySchema = z.object({
  id: z.string(),
});

export type BaseNormalizedEntity = z.infer<typeof BaseNormalizedEntitySchema>;
