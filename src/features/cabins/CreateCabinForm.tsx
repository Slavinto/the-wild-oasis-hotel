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
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { createCabin } from "@/services/apiCabins";
import { Cabin } from "@/types/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "@/services/supabaseTypes";
import toast from "react-hot-toast";
import { createSupabaseCabinFromCabin } from "@/utils/helpers";

type MutateContextType =
    | {
          prevCabins: Tables<"cabins"> | undefined;
      }
    | undefined;

function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } =
        useForm<Cabin>();
    // console.log(getValues("imageUrl")[0]);
    const { errors } = formState;
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: createCabin,
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
            toast.success("Cabin successfully created");
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
        // upload cabin image file to supabase storage bucket
        // const { publicUrl } = await uploadCabinImage(
        //     formData.imageUrl[0] as unknown as File
        // );
        // const formDataWithImageUrl = { ...formData, imageUrl: publicUrl };
        const formDataWithImageFile = {
            ...formData,
            image: formData.imageUrl[0],
        };
        // console.log(formDataWithImageUrl);
        // mutate(formDataWithImageUrl);
        mutate(formDataWithImageFile);
    };

    const onError: SubmitErrorHandler<Cabin> = async (formData) => {
        console.log({ formData });
        const error = Object.entries(formData)[0];
        if (error[1]?.message) {
            toast(error[1].message);
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
                        disabled={isPending}
                        type='number'
                        id='maxCapacity'
                        placeholder='1 - 10 guests'
                        {...register("maxCapacity", {
                            required:
                                "Please provide a capacity for a cabin (between 1 and 10)",
                            min: {
                                value: 1,
                                message: "Minimum possible cabin capacity is 1",
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
                        disabled={isPending}
                        type='number'
                        id='regularPrice'
                        placeholder=''
                        {...register("regularPrice", {
                            required: "Please provide a price for a cabin",
                        })}
                    />
                </FormRow>

                <FormRow
                    htmlFor='discount'
                    label={CreateCabinRowLabels.Discount}
                    error={errors?.discount}
                >
                    <Input
                        disabled={isPending}
                        type='number'
                        id='discount'
                        defaultValue={0}
                        {...register("discount", {
                            validate: (discount) => {
                                return (
                                    discount < getValues("regularPrice") ||
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
                        defaultValue=''
                        {...register("description", {
                            required:
                                "Please provide a brief cabin description",
                        })}
                    />
                </FormRow>

                <FormRow
                    htmlFor='image'
                    label={CreateCabinRowLabels.CabinPhoto}
                    error={errors.imageUrl}
                >
                    <FileInput
                        disabled={isPending}
                        id='imageUrl'
                        accept='image/*'
                        {...register("imageUrl", {
                            required: "Please provide an image of a cabin",
                        })}
                    />
                </FormRow>

                <FormRow>
                    {/* type is an HTML attribute! */}
                    <Button
                        disabled={isPending}
                        variation={ButtonVariations.Secondary}
                        type='reset'
                    >
                        Cancel
                    </Button>
                    <Button disabled={isPending} type='submit'>
                        Create cabin
                    </Button>
                </FormRow>
            </ContentContainer>
        </Form>
    );
}

export default CreateCabinForm;
