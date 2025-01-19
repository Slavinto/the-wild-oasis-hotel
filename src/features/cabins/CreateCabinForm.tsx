import {
    Input,
    Form,
    Button,
    FileInput,
    Textarea,
    ContentContainer,
    FormRow,
} from "@/ui";
import { ButtonVariations, CreateCabinRowLabels } from "@/types/enums";
import { cabinValues } from "@/types/constants";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { createOrUpdateCabin } from "@/services/apiCabins";
import { Cabin } from "@/types/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "@/services/supabaseTypes";
import toast from "react-hot-toast";
import {
    createCabinFromSupabaseTableCabin,
    createSupabaseCabinFromCabin,
} from "@/utils/helpers";

type MutateContextType =
    | {
          prevCabins: Tables<"cabins"> | undefined;
      }
    | undefined;

function CreateCabinForm({
    cabin: dbCabin,
    setShowForm,
}: {
    cabin?: Tables<"cabins">;
    setShowForm: (state: boolean) => void;
}) {
    const currentCabinId = dbCabin?.id;
    const cabin = dbCabin
        ? createCabinFromSupabaseTableCabin(dbCabin)
        : undefined;
    const defaultValues = cabin ? { defaultValues: cabin } : {};
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
        watch,
    } = useForm<Cabin>(defaultValues);

    const currentValues = watch();
    const isFormChanged =
        JSON.stringify(currentValues) !== JSON.stringify(cabin);

    // console.log({ defaultValues });
    console.log({ currentValues });
    // console.log({ isFormChanged });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: currentCabinId
            ? (newCabin) => createOrUpdateCabin(newCabin, currentCabinId)
            : createOrUpdateCabin,
        onMutate: async (newCabin) => {
            // optimistically update the UI
            const prevCabins = queryClient.getQueryData(["cabins"]);
            queryClient.setQueryData(
                ["cabins"],
                (oldCabins: Tables<"cabins">[]) => [
                    ...oldCabins,
                    createSupabaseCabinFromCabin(newCabin),
                ]
            );

            // return context to rollback
            return { prevCabins } as MutateContextType;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            toast.success(
                `Cabin successfully ${cabin ? "updated" : "created"}`
            );
        },
        onError: (
            error: Error,
            newCabin: Cabin,
            context: MutateContextType
        ) => {
            const errMsg = JSON.parse(error.message);
            // rollback UI changes if create cabin fails
            if (context?.prevCabins) {
                queryClient.setQueryData(["cabins"], context.prevCabins);
            }
            toast.error(errMsg);
            throw new Error(
                `Error. Failed to remove a cabin ${
                    newCabin.name
                }: ${JSON.stringify(error)}`
            );
        },
        // runs after all other code
        onSettled: () => {
            reset();
        },
    });

    const onSubmit: SubmitHandler<Cabin> = async (formData) => {
        console.log({ handleSubmit: formData });
        // upload cabin image file to supabase storage bucket
        // if (formData.image) {
        //     const formDataWithImageFile = {
        //         ...formData,
        //         image: formData.image,
        //     };
        //     mutate(formDataWithImageFile);
        // }
        mutate(formData);
        setShowForm(false);
    };

    const onError: SubmitErrorHandler<Cabin> = async (formData) => {
        console.log({ errorSubmit: formData });
        const error = Object.entries(formData)[0];
        if (error[1]?.message) {
            toast(error[1].message);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (file) {
            console.log(e.target.files[0]);
            setValue("image", file);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <ContentContainer maxWidth='70rem'>
                <FormRow
                    htmlFor={"name"}
                    label={CreateCabinRowLabels.CabinName}
                    error={errors?.name}
                >
                    <Input
                        isControlled={true}
                        disabled={isPending}
                        type='text'
                        id='name'
                        placeholder=''
                        {...register("name", {
                            required: "Please provide a valid cabin name",
                        })}
                    />
                </FormRow>
                <FormRow
                    htmlFor='maxCapacity'
                    label={CreateCabinRowLabels.MaximumCapacity}
                    error={errors?.maxCapacity}
                >
                    <Input
                        isControlled={true}
                        disabled={isPending}
                        type='number'
                        id='maxCapacity'
                        placeholder={`${cabinValues.MinimumCapacity} - ${cabinValues.MaximumCapacity} guests`}
                        {...register("maxCapacity", {
                            required: `Please provide a capacity for a cabin (between ${cabinValues.MinimumCapacity} and ${cabinValues.MaximumCapacity})`,
                            min: {
                                value: cabinValues.MinimumCapacity,
                                message: `Minimum possible cabin capacity is ${cabinValues.MinimumCapacity}`,
                            },
                            max: {
                                value: cabinValues.MaximumCapacity,
                                message: `Valid cabin capacity is up to ${cabinValues.MaximumCapacity} guests`,
                            },
                        })}
                    />
                </FormRow>
                <FormRow
                    htmlFor='regularPrice'
                    label={CreateCabinRowLabels.RegularPrice}
                    error={errors?.regularPrice}
                >
                    <Input
                        isControlled={true}
                        disabled={isPending}
                        type='number'
                        id='regularPrice'
                        placeholder=''
                        {...register("regularPrice", {
                            required: "Please provide a price for a cabin",
                            min: {
                                value: cabinValues.MinimumPrice,
                                message: `Cabin price cannot be lower than ${cabinValues.MinimumPrice}`,
                            },
                        })}
                    />
                </FormRow>

                <FormRow
                    htmlFor='discount'
                    label={CreateCabinRowLabels.Discount}
                    error={errors?.discount}
                >
                    <Input
                        isControlled={true}
                        disabled={isPending}
                        type='number'
                        id='discount'
                        {...register("discount", {
                            validate: (discount) => {
                                const discountAmount = Number(discount);
                                const regularPrice = Number(
                                    currentValues.regularPrice
                                );
                                return (
                                    discountAmount < regularPrice ||
                                    "Discount is not allowed to be greater than cabin price"
                                );
                            },
                        })}
                    />
                </FormRow>

                <FormRow
                    htmlFor='description'
                    label={CreateCabinRowLabels.DescriptionForWebsite}
                    error={errors?.description}
                >
                    <Textarea
                        disabled={isPending}
                        type='text'
                        id='description'
                        {...register("description", {
                            required:
                                "Please provide a brief cabin description",
                        })}
                    />
                </FormRow>

                <FormRow
                    htmlFor='image'
                    label={CreateCabinRowLabels.CabinPhoto}
                    error={errors.image}
                >
                    {currentValues.image?.name ? (
                        <span>{currentValues.image?.name}</span>
                    ) : (
                        <FileInput
                            disabled={isPending}
                            id='image'
                            accept='image/*'
                            {...(register("image"),
                            {
                                required: !cabin,
                            })}
                            onChange={handleFileChange}
                        />
                    )}
                </FormRow>

                <FormRow>
                    {/* type is an HTML attribute! */}
                    <Button
                        disabled={isPending || isFormChanged}
                        variation={ButtonVariations.Secondary}
                        type='reset'
                        onClick={() => (cabin ? reset(cabin) : {})}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isPending || !isFormChanged}
                        variation={
                            !isFormChanged
                                ? ButtonVariations.Secondary
                                : ButtonVariations.Primary
                        }
                        type='submit'
                    >
                        {`${cabin ? "Update" : "Create"} cabin`}
                    </Button>
                </FormRow>
            </ContentContainer>
        </Form>
    );
}

export default CreateCabinForm;
