import {z} from "zod";

export const LIFT_OPTIONS = [
    "Overhead Press",
    "Bench Press",
    "Front Squat",
    "Back Squat",
    "Trapbar Deadlift",
    "Romanian Deadlift",
    "Pullups"
] as const;

export type Lift = (typeof LIFT_OPTIONS)[number];
export type WorkingSet = {reps: number, weight: number};
export type LogWorkoutForm = z.infer<typeof LogWorkoutSchema>;

export const LiftSchema = z.enum(LIFT_OPTIONS);

export const WorkingSetSchema = z.object({
    reps: z.number().int().positive(),
    weight: z.number().nonnegative()
})

export const LiftEntrySchema = z.object({
    liftName: LiftSchema.optional()
        .refine((v) => v !== undefined, { message: "Must select a lift"}),
    workingSets: z.array(WorkingSetSchema).min(1, "Add at least one working set"),
})


export const LogWorkoutSchema = z.object({
    lifts: z.array(LiftEntrySchema).min(1, "Add at least one lift")
})
