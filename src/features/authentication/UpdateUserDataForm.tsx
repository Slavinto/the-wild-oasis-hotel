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
    validateUserEmail,
    validateUserFullName,
    validateUserPasswordLength,
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
    const handleUpdateUserData: SubmitHandler<UpdateUserFormFields> = (
        data
    ) => {
        const updateObject = {
            userId: userId,
            userUpdate: {
                avatar: data.avatar,
                email: data.email,
                fullName: data.fullName,
                userStatus: data.suspendUser
                    ? UserStatus.Suspended
                    : UserStatus.Active,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            },
        };

        updateUser(updateObject, { onSettled: () => reset });
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
                                    ...validateUserPasswordLength,
                                    validate: (value) => {
                                        return (
                                            // checking both passwords are filled
                                            (newPassword?.length > 0 &&
                                                value?.length > 0) ||
                                            // checking both passwords are empty
                                            (!newPassword && !value) ||
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
                                placeholder='Password'
                                type='password'
                                id={InputIds.ConfirmPassword}
                                {...register(InputIds.NewPassword, {
                                    ...validateUserPasswordLength,
                                    validate: (value) => {
                                        return (
                                            (oldPassword?.length > 0 &&
                                                value?.length > 0) ||
                                            // checking both passwords are empty
                                            (!oldPassword && !value) ||
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
