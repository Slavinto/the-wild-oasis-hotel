import {
    ButtonVariations,
    CreateUserFormRowLabels,
    Headings,
    InputIds,
} from "@/types/enums";
import { Button, FileInput, Form, FormRow, Heading, Input } from "@/ui";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserFormFields } from "@/types/interfaces";
import { userValues } from "@/types/constants";
import { allFormFieldsFilled } from "@/utils/helpers";
import { useSignup } from "./useSignup";
import { useGlobalSpinner } from "@/ui/globalSpinner/useGlobalSpinner";

// Email regex: /\S+@\S+\.\S+/

const StyledFormWrapper = styled.div`
    max-width: 80rem;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
`;

const StyledInputWrapper = styled.div`
    max-width: 40rem;
`;

function SignupForm({ onCloseModal }: { onCloseModal?: () => void }) {
    const defaultValues = {};
    const form = useForm<CreateUserFormFields>(defaultValues);
    const {
        register,
        formState: { errors },
        watch,
        setValue,
        handleSubmit,
        reset,
    } = form;

    const { signup, isLoading } = useSignup();
    useGlobalSpinner(isLoading);

    const currentValues = watch();
    const password = currentValues.password;

    const onSignup: SubmitHandler<CreateUserFormFields> = (data) => {
        console.log({ submitData: data });
        signup(data, { onSettled: () => reset });
        onCloseModal?.();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (file) {
            setValue("avatar", file);
        }
    };

    return (
        <StyledFormWrapper>
            <Heading as={Headings.H3} text='Create a new user' />{" "}
            <Form type='modal' onSubmit={handleSubmit(onSignup)}>
                <FormRow
                    label={CreateUserFormRowLabels.FullName}
                    error={errors.fullName}
                >
                    <StyledInputWrapper>
                        <Input
                            disabled={isLoading}
                            isControlled={true}
                            type='text'
                            placeholder='Full user name'
                            id={InputIds.FullName}
                            {...register(InputIds.FullName, {
                                required: "Full name of the user is required",
                                minLength: {
                                    value: userValues.minUserNameLength,
                                    message: `Full user name must contain at least ${userValues.minUserNameLength} characters`,
                                },
                                maxLength: {
                                    value: userValues.maxUserNameLength,
                                    message: `Full user name must contain maximum of ${userValues.maxUserNameLength} characters`,
                                },
                            })}
                        />
                    </StyledInputWrapper>
                </FormRow>

                <FormRow
                    label={CreateUserFormRowLabels.EmailAddress}
                    error={errors.email}
                >
                    <StyledInputWrapper>
                        <Input
                            disabled={isLoading}
                            isControlled={true}
                            placeholder='Email'
                            type='email'
                            id={InputIds.Email}
                            {...register(InputIds.Email, {
                                required: "User email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email format",
                                },
                            })}
                        />
                    </StyledInputWrapper>
                </FormRow>

                <FormRow
                    label={CreateUserFormRowLabels.Password}
                    error={errors.password}
                >
                    <StyledInputWrapper>
                        <Input
                            disabled={isLoading}
                            isControlled={true}
                            type='password'
                            placeholder='Password'
                            id={InputIds.Password}
                            {...register(InputIds.Password, {
                                required: "Password is required",
                                minLength: {
                                    value: userValues.minPasswordLength,
                                    message: `Password length must be over ${userValues.minPasswordLength} characters`,
                                },
                                maxLength: {
                                    value: userValues.maxPasswordLength,
                                    message: `Password length must be under ${userValues.maxPasswordLength} characters`,
                                },
                            })}
                        />
                    </StyledInputWrapper>
                </FormRow>

                <FormRow
                    label={CreateUserFormRowLabels.RepeatPassword}
                    error={errors.confirmPassword}
                >
                    <StyledInputWrapper>
                        <Input
                            disabled={isLoading}
                            isControlled={true}
                            placeholder='Confirm password'
                            type='password'
                            id={InputIds.ConfirmPassword}
                            {...register(InputIds.ConfirmPassword, {
                                required: "Password is required",
                                minLength: {
                                    value: userValues.minPasswordLength,
                                    message: `Password length must be over ${userValues.minPasswordLength} characters`,
                                },
                                maxLength: {
                                    value: userValues.maxPasswordLength,
                                    message: `Password length must be under ${userValues.maxPasswordLength} characters`,
                                },
                                validate: (value) =>
                                    value === password ||
                                    "Passwords don't match",
                            })}
                        />
                    </StyledInputWrapper>
                </FormRow>
                <FormRow
                    htmlFor='avatar'
                    label={CreateUserFormRowLabels.AvatarImage}
                    error={errors.avatar}
                >
                    {currentValues.avatar?.name ? (
                        <span>{currentValues.avatar?.name}</span>
                    ) : (
                        <FileInput
                            disabled={isLoading}
                            id='avatar'
                            accept='avatar/*'
                            {...(register("avatar"),
                            {
                                required: false,
                            })}
                            onChange={handleFileChange}
                        />
                    )}
                </FormRow>
                <FormRow>
                    {/* type is an HTML attribute! */}
                    <Button
                        disabled={isLoading}
                        $variation={ButtonVariations.Secondary}
                        type='reset'
                        onClick={onCloseModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        disabled={
                            !allFormFieldsFilled(currentValues) || isLoading
                        }
                        $variation={
                            allFormFieldsFilled(currentValues)
                                ? ButtonVariations.Primary
                                : ButtonVariations.Secondary
                        }
                    >
                        Create new user
                    </Button>
                </FormRow>
            </Form>
        </StyledFormWrapper>
    );
}

export default SignupForm;
