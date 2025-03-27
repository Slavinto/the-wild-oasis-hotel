import {
    Input,
    Form,
    Button,
    FileInput,
    Textarea,
    ContentContainer,
    FormRow,
} from "@/ui";
import {
    ButtonVariations,
    CabinRowFunctions,
    CreateCabinRowLabels,
} from "@/types/enums";
import { cabinValues } from "@/types/constants";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { Cabin } from "@/types/interfaces";
import { Tables } from "@/services/supabaseTypes";
import toast from "react-hot-toast";
import { useCreateOrUpdateCabin } from "./useCreateOrUpdateCabin";
import { useCabinsContext } from "./CabinContext";

function CreateCabinForm({
    cabin: dbCabin,
    setShowForm,
    // setCurrentCabinId,
    cabinFunction,
    onCloseModal,
}: {
    cabin?: Tables<"cabins">;
    setShowForm?: () => void;
    cabinFunction: CabinRowFunctions;
    onCloseModal?: () => void;
}) {
    const { currentCabinId, onSetCabinId: setCurrentCabinId } =
        useCabinsContext();
    const {
        cabin,
        form,
        currentValues,
        mutate: updateCabin,
        isUpdating,
        isFormChanged,
        // currentCabinId we get when we update a cabin and when we create it's undefined
        // currentCabinId,
    } = useCreateOrUpdateCabin(
        dbCabin as Tables<"cabins">,
        cabinFunction,
        onCloseModal
    );
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = form;

    const onSubmit: SubmitHandler<Cabin> = async (formData) => {
        if (currentCabinId && setCurrentCabinId) {
            setCurrentCabinId(currentCabinId);
        } else if (!currentCabinId && setCurrentCabinId) {
            setCurrentCabinId(0);
        }
        updateCabin({ ...formData });
        if (setShowForm) {
            setShowForm();
        }
    };

    const onError: SubmitErrorHandler<Cabin> = async (formData) => {
        const error = Object.entries(formData)[0];
        if (error[1]?.message) {
            toast(error[1].message);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (file) {
            setValue("image", file);
        }
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "normal"}
        >
            <ContentContainer maxWidth='70rem'>
                <FormRow
                    htmlFor={"name"}
                    label={CreateCabinRowLabels.CabinName}
                    error={errors?.name}
                >
                    <Input
                        isControlled={true}
                        disabled={isUpdating}
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
                        disabled={isUpdating}
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
                        disabled={isUpdating}
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
                        disabled={isUpdating}
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
                        disabled={isUpdating}
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
                            disabled={isUpdating}
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
                        disabled={isUpdating || !isFormChanged}
                        $variation={ButtonVariations.Secondary}
                        type='button'
                        onClick={onCloseModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isUpdating || !isFormChanged}
                        $variation={ButtonVariations.Secondary}
                        type='reset'
                        onClick={() => reset(cabin)}
                    >
                        Reset Form
                    </Button>
                    <Button
                        disabled={isUpdating || !isFormChanged}
                        $variation={
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
