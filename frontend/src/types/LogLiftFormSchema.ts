import {z} from "zod";
import {LiftSchema} from "@/types/LiftOptions.ts";
import {WorkingSetSchema} from "@/types/WorkingSet.ts";

export const logLiftFormSchema = z.object({
    liftName: LiftSchema,
    workingSets: z.array(WorkingSetSchema).min(1),
})