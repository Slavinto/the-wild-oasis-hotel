import {
    ButtonVariations,
    CreateUserFormRowLabels,
    InputIds,
} from "@/types/enums";
import { Button, Form, FormRow, Input } from "@/ui";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    return (
        <Form type='normal'>
            <FormRow label={CreateUserFormRowLabels.FullName} error={""}>
                <Input type='text' id={InputIds.FullName} />
            </FormRow>

            <FormRow label={CreateUserFormRowLabels.EmailAddress} error={""}>
                <Input type='email' id={InputIds.Email} />
            </FormRow>

            <FormRow label={CreateUserFormRowLabels.Password} error={""}>
                <Input type='password' id={InputIds.Password} />
            </FormRow>

            <FormRow label={CreateUserFormRowLabels.RepeatPassword} error={""}>
                <Input type='password' id={InputIds.PasswordConfirm} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button $variation={ButtonVariations.Secondary} type='reset'>
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
