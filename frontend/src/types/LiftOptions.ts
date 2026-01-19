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

export const LiftSchema = z.enum(LIFT_OPTIONS);