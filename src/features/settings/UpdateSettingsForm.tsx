import { UpdateSettingsFormLabels } from "@/types/enums";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { Spinner } from "@/ui";
import { useForm } from "react-hook-form";
import { settingValues } from "@/types/constants";
import { Tables } from "@/services/supabaseTypes";

function UpdateSettingsForm() {
    const { data, isLoading } = useSettings();
    if (!data) {
        throw new Error("Failed to load settings data from db");
    }

    const {
        breakfast_price,
        max_booking_period,
        max_guests_per_booking,
        min_booking_period,
    } = data;

    const defaultValues: Settings = { ...data };
    const { register, watch } = useForm({ defaultValues });
    const currentValues: Settings = watch();

    type Settings = Omit<Tables<"settings">, "id" | "created_at">;
    type DifSettings = { [K in keyof Settings]?: Settings[K] };

    // function getDifferingValues(
    //     currentValues: Settings,
    //     defaultValues: Settings
    // ): DifSettings {
    //     const differingValues = {};
    //     const curKeys = Object.keys(currentValues);
    //     curKeys.forEach((k) => {
    //         const key = k as keyof Settings;
    //         if (currentValues[key] !== defaultValues[key]) {
    //             differingValues[key] = currentValues[key];
    //         }
    //     });
    //     return differingValues;
    // }

    // const onSubmit = () => {
    //     // compare default values and current values to find out what settings to update
    //     const output = getDifferingValues(currentValues, defaultValues);
    //     console.log({ output });
    // };

    console.log({ defaultValues });
    console.log({ currentValues });

    return isLoading ? (
        <Spinner />
    ) : (
        // <Form onSubmit={onSubmit}>
        <Form>
            <FormRow label={UpdateSettingsFormLabels.MinNightsBooking}>
                <Input
                    isControlled={true}
                    defaultValue={min_booking_period || ""}
                    type='number'
                    id='min_booking_period'
                    {...register("min_booking_period", {
                        required: "This value is required",
                        min: {
                            value: settingValues.MinimumNightsMinValue,
                            message: `Cannot book a cabin for less than ${settingValues.MinimumNightsMinValue} nights`,
                        },
                    })}
                />
            </FormRow>
            <FormRow label={UpdateSettingsFormLabels.MaxNightsBooking}>
                <Input
                    isControlled={true}
                    defaultValue={max_booking_period || ""}
                    type='number'
                    id='max_booking_period'
                    {...register("max_booking_period", {
                        required: "This value is required",
                        validate: () =>
                            !!max_booking_period &&
                            !!min_booking_period &&
                            max_booking_period >
                                settingValues.MaximumNightsMinValue &&
                            max_booking_period > min_booking_period,
                    })}
                />
            </FormRow>
            <FormRow label={UpdateSettingsFormLabels.MaxGuestsBooking}>
                <Input
                    isControlled={true}
                    defaultValue={max_guests_per_booking || ""}
                    type='number'
                    id='max_guests_per_booking'
                    {...register("max_guests_per_booking", {
                        required: "This value is required",
                        min: {
                            value: settingValues.MinimumGuests,
                            message: `Number of guests can not be less than ${settingValues.MinimumGuests}`,
                        },
                    })}
                />
            </FormRow>
            <FormRow label={UpdateSettingsFormLabels.BreakfastPrice}>
                <Input
                    isControlled={true}
                    defaultValue={breakfast_price || ""}
                    type='number'
                    id='breakfast_price'
                    {...register("breakfast_price", {
                        required: "This value is required",
                        min: {
                            value: 0,
                            message: "Negative breakfast price not allowed",
                        },
                    })}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
