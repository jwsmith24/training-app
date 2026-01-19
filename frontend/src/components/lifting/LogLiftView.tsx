import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {logLiftFormSchema} from "@/types/LogLiftFormSchema.ts";
import {z} from "zod";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {toast} from "sonner";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {LIFT_OPTIONS} from "@/types/LiftOptions.ts";


export default function LogLiftView() {

    const form = useForm<z.infer<typeof logLiftFormSchema>>({
        resolver: zodResolver(logLiftFormSchema),
        defaultValues: {
            workingSets: [{reps: 5, weight: 0}]
        },
        mode: "onTouched"
    })

    function onSubmit(data: z.infer<typeof logLiftFormSchema>) {

        toast("Submitted!");
        console.log(data);
    }

    return (
        <div className={"p-4"}>
            <Card className={"max-w-1/3"}>
                <CardHeader>
                    <CardTitle>Log Lift</CardTitle>
                    <CardDescription>Log your working sets for the day</CardDescription>

                </CardHeader>
                <CardContent>
                    <form id={"log-lift-form"} onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name={"liftName"}
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={"liftNameInput"}>Lift</FieldLabel>
                                        <Select
                                            value={field.value ?? ""}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={"Select a lift.."}/>
                                            </SelectTrigger>

                                            <SelectContent>
                                                {LIFT_OPTIONS.map((lift) => (
                                                    <SelectItem value={lift} key={lift}>{lift}</SelectItem>
                                                ))}
                                            </SelectContent>

                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )}
                                    </Field>
                                )}/>
                        </FieldGroup>
                    </form>
                </CardContent>

            </Card>

        </div>
    )
}