import {z} from "zod";

export const WorkingSetSchema = z.object({
    reps: z.number().int().positive(),
    weight: z.number().nonnegative()
})