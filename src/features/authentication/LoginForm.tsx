import { useState } from "react";
import { Button, Form, Input, FormRow } from "@/ui";
import {
    ButtonSizes,
    RowOrientations,
    UserLoginFormRowLabels,
} from "@/types/enums";
import { useLoginEmailPassword } from "./useLoginEmailPassword";
import { useGlobalSpinner } from "@/ui/globalSpinner/useGlobalSpinner";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    // slava@test1.com -> common user
    // sdfsad@sfd.com -> advanced user
    const [email, setEmail] = useState("sdfsad@sfd.com");
    const [password, setPassword] = useState("123123");
    const navigate = useNavigate();
    const { login, isLoggingIn, error } = useLoginEmailPassword();

    useGlobalSpinner(isLoggingIn && !error);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        login(
            { email, password },
            {
                onSuccess: () => navigate(`/`),
                onError: () => {
                    setPassword("");
                    setEmail("");
                },
            }
        );
    }

    return (
        <Form type='normal' onSubmit={handleSubmit}>
            <FormRow
                orientation={RowOrientations.Vertical}
                label={UserLoginFormRowLabels.EmailAddress}
            >
                <Input
                    isControlled={true}
                    type='email'
                    id='email'
                    placeholder='User Email'
                    // This makes this form better for password managers
                    autoComplete='username'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRow>
            <FormRow
                orientation={RowOrientations.Vertical}
                label={UserLoginFormRowLabels.Password}
            >
                <Input
                    isControlled={true}
                    type='password'
                    placeholder='User Password'
                    id='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRow>
            <FormRow>
                <Button type='submit' size={ButtonSizes.Large}>
                    Login
                </Button>
            </FormRow>
        </Form>
    );
}

export default LoginForm;
