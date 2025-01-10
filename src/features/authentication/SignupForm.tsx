import { ButtonVariations, FormRowLabels, InputIds } from "@/types/enums";
import { Button, Form, FormRow, Input } from "@/ui";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    return (
        <Form>
            <FormRow label={FormRowLabels.FullName} error={""}>
                <Input type='text' id={InputIds.FullName} />
            </FormRow>

            <FormRow label={FormRowLabels.EmailAddress} error={""}>
                <Input type='email' id={InputIds.Email} />
            </FormRow>

            <FormRow label={FormRowLabels.Password} error={""}>
                <Input type='password' id={InputIds.Password} />
            </FormRow>

            <FormRow label={FormRowLabels.RepeatPassword} error={""}>
                <Input type='password' id={InputIds.PasswordConfirm} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation={ButtonVariations.Secondary} type='reset'>
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
