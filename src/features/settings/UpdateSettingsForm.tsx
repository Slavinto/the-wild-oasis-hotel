import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSettings } from "./useSettings";
import { Input, FormRow, Form, Spinner } from "@/ui";
import { UpdateSettingsFormLabels } from "@/types/enums";
import { settingValues } from "@/types/constants";
import { AppSettings, DbSettings, Setting } from "./settingsTypes";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
    const { data, isLoading } = useSettings();
    const { mutate, isUpdating } = useUpdateSettings();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, id, ...defaultValues } = data || {
        breakfast_price: null,
        max_booking_period: null,
        max_guests_per_booking: null,
        min_booking_period: null,
    };

    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<DbSettings>({
        defaultValues,
    });

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    if (!data || isLoading) {
        // throw new Error("Failed to load settings data from db");
        return <Spinner />;
    }

    const currentValues = watch();

    // function getDifferingValues(
    //     currentValues: DbSettings,
    //     defaultValues: AppSettings
    // ): DifAppSettings {
    //     const differingValues = {} as DifAppSettings;
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const { created_at, id, ...curValues } = currentValues;
    //     const curKeys = Object.keys(curValues);

    //     curKeys.forEach((k) => {
    //         const key = k as keyof AppSettings;
    //         if (Number(currentValues[key]) !== Number(defaultValues[key])) {
    //             differingValues[key] = Number(currentValues[key]);
    //         }
    //     });
    //     return differingValues;
    // }

    const createSetting = (propName: keyof AppSettings): Setting => {
        return {
            setting: {
                [propName]: Number(currentValues[propName]),
            },
        };
    };

    const onSubmit: SubmitHandler<AppSettings> = () => {
        // compare default values and current values to find out what settings to update
        // const setting = getDifferingValues(currentValues, defaultValues);
        // mutate({ setting });
    };

    console.log({ defaultValues });
    console.log({ currentValues });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                label={UpdateSettingsFormLabels.MinNightsBooking}
                error={errors.min_booking_period}
                htmlFor='min_booking_period'
            >
                <Input
                    isControlled={true}
                    type='number'
                    id='min_booking_period'
                    disabled={isUpdating}
                    {...register("min_booking_period", {
                        required: "This value is required",
                        min: {
                            value: settingValues.MinimumNightsMinValue,
                            message: `Cannot book a cabin for less than ${settingValues.MinimumNightsMinValue} nights`,
                        },
                    })}
                    onBlur={() => {
                        mutate(createSetting("min_booking_period"));
                    }}
                />
            </FormRow>
            <FormRow
                label={UpdateSettingsFormLabels.MaxNightsBooking}
                error={errors.max_booking_period}
            >
                <Input
                    isControlled={true}
                    type='number'
                    id='max_booking_period'
                    disabled={isUpdating}
                    {...register("max_booking_period", {
                        required: "This value is required",
                        validate: (inputValue) => {
                            const maxBookingPeriod = Number(inputValue);
                            const isValid =
                                maxBookingPeriod >
                                    settingValues.MaximumNightsMinValue &&
                                maxBookingPeriod >
                                    Number(currentValues.min_booking_period);
                            return (
                                isValid ||
                                `Max. nights booking should be more than min. nights booking (${currentValues.min_booking_period})`
                            );
                        },
                    })}
                    onBlur={() => {
                        mutate(createSetting("max_booking_period"));
                    }}
                />
            </FormRow>
            <FormRow
                label={UpdateSettingsFormLabels.MaxGuestsBooking}
                error={errors.max_guests_per_booking}
            >
                <Input
                    isControlled={true}
                    type='number'
                    id='max_guests_per_booking'
                    disabled={isUpdating}
                    {...register("max_guests_per_booking", {
                        required: "This value is required",
                        min: {
                            value: settingValues.MinimumGuests,
                            message: `Number of guests can not be less than ${settingValues.MinimumGuests}`,
                        },
                    })}
                    onBlur={() => {
                        mutate(createSetting("max_guests_per_booking"));
                    }}
                />
            </FormRow>
            <FormRow
                label={UpdateSettingsFormLabels.BreakfastPrice}
                error={errors.breakfast_price}
            >
                <Input
                    isControlled={true}
                    type='number'
                    id='breakfast_price'
                    disabled={isUpdating}
                    {...register("breakfast_price", {
                        required: "This value is required",
                        min: {
                            value: 0,
                            message: "Negative breakfast price not allowed",
                        },
                    })}
                    onBlur={() => {
                        mutate(createSetting("breakfast_price"));
                    }}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
