import { z } from "zod";

export const SportSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Sport = z.infer<typeof SportSchema>;
