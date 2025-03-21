import { useEffect } from "react";
import { Button, Checkbox, FileInput, Form, FormRow, Input } from "@/ui";
import {
    ButtonVariations,
    InputIds,
    UpdateUserFormRowLabels,
    UserStatus,
} from "@/types/enums";
import { useGetSpecificUser } from "./useGetSpecificUser";
import { useGlobalSpinner } from "@/ui/globalSpinner/useGlobalSpinner";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useUpdateUser } from "./useUpdateUser";
import { useSafeGlobalUserContext } from "@/ui/globalUser/useSafeGlobalUserContext";
import { getUserStatus } from "@/utils/helpers";
import {
    validateOldUserPassword,
    validateUserEmail,
    validateUserFullName,
    validateUserPassword,
} from "@/types/constants";
import { UpdateUserFormFields } from "@/types/interfaces";

const StyledFormWrapper = styled.div`
    margin: 2rem;
`;

function UpdateUserDataForm({
    userId,
    onCloseModal,
}: {
    userId: string;
    onCloseModal?: () => void;
}) {
    // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
    const { data, isLoading } = useGetSpecificUser(userId);
    const { updateUser, isUpdating } = useUpdateUser();
    const { user: currentUser } = useSafeGlobalUserContext();

    const form = useForm<UpdateUserFormFields>({});
    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        watch,
    } = form;

    const currentValues = watch();
    const { newPassword, oldPassword } = currentValues;

    const isBusy = (!data && isLoading) || (!data && isUpdating);

    useGlobalSpinner(isBusy);

    useEffect(() => {
        if (data) {
            reset({
                email: data.user.email,
                avatar: undefined,
                fullName: data.user.user_metadata.fullName,
                suspendUser: getUserStatus(data.user) === UserStatus.Suspended,
            });
        }
    }, [reset, data]);

    if (!data && !isLoading && !isUpdating) {
        return <h1>Failed to load user data</h1>;
    }
    console.log({ currentValues });
    const handleUpdateUserData: SubmitHandler<UpdateUserFormFields> = async (
        data
    ) => {
        console.log({ data });
        updateUser(
            {
                userId: userId,
                userUpdate: {
                    avatar: data.avatar,
                    email: data.email,
                    fullName: data.fullName,
                    userStatus: data.suspendUser
                        ? UserStatus.Suspended
                        : UserStatus.Active,
                },
            },
            { onSettled: () => reset }
        );
        onCloseModal?.();
    };

    return (
        <StyledFormWrapper>
            <Form type='modal' onSubmit={handleSubmit(handleUpdateUserData)}>
                <FormRow
                    label={UpdateUserFormRowLabels.EmailAddress}
                    error={errors.email}
                >
                    <Input
                        isControlled={true}
                        disabled={isBusy}
                        id={InputIds.Email}
                        {...register("email", validateUserEmail)}
                    />
                </FormRow>
                <FormRow
                    label={UpdateUserFormRowLabels.FullName}
                    error={errors.fullName}
                >
                    <Input
                        isControlled={true}
                        type='text'
                        id={InputIds.FullName}
                        disabled={isBusy}
                        {...register("fullName", validateUserFullName)}
                    />
                </FormRow>
                {currentUser?.email === data?.user.email && (
                    <>
                        <FormRow
                            label={UpdateUserFormRowLabels.OldPassword}
                            error={errors.oldPassword}
                        >
                            <Input
                                disabled={isLoading}
                                isControlled={true}
                                type='password'
                                placeholder='Password'
                                id={InputIds.OldPassword}
                                {...register(InputIds.OldPassword, {
                                    ...validateOldUserPassword,
                                    validate: (value) => {
                                        return (
                                            (newPassword?.length > 0 &&
                                                value?.length > 0) ||
                                            "Old password is required"
                                        );
                                    },
                                })}
                            />
                        </FormRow>

                        <FormRow
                            label={UpdateUserFormRowLabels.NewPassword}
                            error={errors.newPassword}
                        >
                            <Input
                                disabled={isLoading || !oldPassword?.length}
                                isControlled={true}
                                placeholder='Confirm password'
                                type='password'
                                id={InputIds.ConfirmPassword}
                                {...register(InputIds.NewPassword, {
                                    ...validateOldUserPassword,
                                    validate: (value) => {
                                        return (
                                            (oldPassword?.length > 0 &&
                                                value?.length > 0) ||
                                            "New password is required"
                                        );
                                    },
                                })}
                            />
                        </FormRow>
                    </>
                )}
                <FormRow
                    label={UpdateUserFormRowLabels.AvatarImage}
                    error={errors.avatar}
                >
                    <FileInput
                        id={InputIds.Avatar}
                        accept='image/*'
                        {...register("avatar")}
                    />
                </FormRow>

                <FormRow error={errors.suspendUser}>
                    {currentUser?.email === data?.user.email ? (
                        <></>
                    ) : (
                        <Checkbox
                            disabled={isBusy}
                            {...register("suspendUser")}
                            // checked={currentValues.suspendUser}
                        >
                            {UpdateUserFormRowLabels.SuspendUser}
                        </Checkbox>
                    )}
                    <Button
                        type='reset'
                        $variation={ButtonVariations.Secondary}
                        disabled={isBusy}
                        onClick={onCloseModal}
                    >
                        Cancel
                    </Button>
                    <Button type='submit'>Update account</Button>
                </FormRow>
            </Form>
        </StyledFormWrapper>
    );
}

export default UpdateUserDataForm;
