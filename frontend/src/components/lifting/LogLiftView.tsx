import {Controller, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    type Lift,
    LIFT_OPTIONS,
    type LogWorkoutForm,
    LogWorkoutSchema,
    type WorkingSet
} from "@/types/LiftLogEntrySchema.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {toast} from "sonner";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";


// default factories
const createDefaultWorkingSet = ():WorkingSet => ({reps: 5, weight: 0})
const createEmptyWorkout = (): LogWorkoutForm => ({
    lifts: [{liftName: undefined, workingSets: [createDefaultWorkingSet()]}]
})

export default function LogLiftView() {


    const form = useForm<LogWorkoutForm>({
        resolver: zodResolver(LogWorkoutSchema),
        defaultValues: createEmptyWorkout(),
        mode: "onTouched"
    })

    const liftsArray = useFieldArray({
        control: form.control,
        name: "lifts"
    })

    function onSubmit(data: LogWorkoutForm) {

        toast("Submitted!");
        console.log(data);

        form.reset(createEmptyWorkout());
    }

    return (
        <div className={"p-4"}>
            <Card className={"max-w-2/3"}>
                <CardHeader>
                    <CardTitle>Log Lift</CardTitle>
                    <CardDescription>Log your working sets for the day</CardDescription>

                </CardHeader>
                <CardContent>
                    <form id={"log-lift-form"} onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>

                        <Button type={"button"} variant={"secondary"} onClick={() => liftsArray.append(
                            {liftName: undefined, workingSets: [createDefaultWorkingSet()]}
                        )}>
                            Add Lift
                        </Button>
                        <FieldGroup>
                            {liftsArray.fields.map((liftField, liftIndex) => (

                                <LiftEntryFields
                                    key={liftField.id}
                                    form={form}
                                    liftIndex={liftIndex}
                                    removeLift={() => liftsArray.remove(liftIndex)}
                                    disableRemove={liftsArray.fields.length === 1}/>
                            ))}
                        </FieldGroup>

                        <Button type={"submit"} className={"w-full mt-4"}>Save workout</Button>
                    </form>
                </CardContent>

            </Card>

        </div>
    )
}

interface LiftEntryFieldsProps {
    form: ReturnType<typeof useForm<LogWorkoutForm>>;
    liftIndex: number;
    removeLift: () => void;
    disableRemove: boolean;
}

function LiftEntryFields({form, liftIndex, removeLift, disableRemove}: LiftEntryFieldsProps) {
    const setsArray = useFieldArray({
        control: form.control,
        name: `lifts.${liftIndex}.workingSets`
    });

    return (
        <div>
            <div>
                <Controller
                    name={`lifts.${liftIndex}.liftName`}
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field className="flex-1" data-invalid={fieldState.invalid}>
                            <FieldLabel>Lift</FieldLabel>
                            <Select
                                value={field.value ?? ""}
                                onValueChange={(value) => field.onChange(value as Lift)}
                            >
                                <SelectTrigger aria-invalid={fieldState.invalid}>
                                    <SelectValue placeholder="Select a lift..."/>
                                </SelectTrigger>
                                <SelectContent>
                                    {LIFT_OPTIONS.map((lift) => (
                                        <SelectItem key={lift} value={lift}>
                                            {lift}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className={"min-h-5"}>{fieldState.invalid &&
                                <FieldError errors={[fieldState.error]}/>}</div>
                        </Field>
                    )}
                />

                <Button type={"button"} variant={"ghost"} onClick={removeLift} disabled={disableRemove}>
                    Remove Lift
                </Button>

                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Working sets</h3>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setsArray.append(createDefaultWorkingSet())}
                    >
                        Add set
                    </Button>
                </div>

                <div className={"space-y-6"}>
                    {setsArray.fields.map((setField, setIndex) => {
                        const repsErr = form.formState.errors.lifts?.[liftIndex]?.workingSets?.[setIndex]?.reps;
                        const weightErr = form.formState.errors.lifts?.[liftIndex]?.workingSets?.[setIndex]?.weight;

                        return (
                            <div key={setField.id} className="flex items-center gap-2">
                                <Field className="flex-1 relative pb-2" data-invalid={!!repsErr}>
                                    <FieldLabel>Reps</FieldLabel>
                                    <Input
                                        type="number"
                                        {...form.register(`lifts.${liftIndex}.workingSets.${setIndex}.reps`, {
                                            valueAsNumber: true,
                                        })}
                                    />
                                    <div className={"absolute left-0 -bottom-5"}>{repsErr && <FieldError errors={[repsErr]}/>}</div>
                                </Field>

                                <Field className={"flex-1 relative pb-2"} data-invalid={!!weightErr}>
                                    <FieldLabel>Weight</FieldLabel>
                                    <Input
                                        type="number"
                                        step="0.5"
                                        {...form.register(`lifts.${liftIndex}.workingSets.${setIndex}.weight`, {
                                            valueAsNumber: true,
                                        })}
                                    />
                                    <div className={"absolute left-0 -bottom-5"}>{weightErr && <FieldError errors={[weightErr]}/>}</div>
                                </Field>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setsArray.remove(setIndex)}
                                    disabled={setsArray.fields.length === 1}
                                >
                                    Remove
                                </Button>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    )
}