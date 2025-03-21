import { useLoaderData } from "react-router-dom";
import LoginForm from "@/features/authentication/LoginForm";
import { useConditionalNavigate } from "@/hooks/useConditionalNavigate";
import { Headings } from "@/types/enums";
import { GlobalSpinner, Heading, Logo } from "@/ui";
import styled from "styled-components";

const LoginLayout = styled.main`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 55rem;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    background-color: var(--color-grey-50);
`;

function Login() {
    const user = useLoaderData();

    useConditionalNavigate(!!user, "/");
    return user ? (
        <GlobalSpinner>
            <></>
        </GlobalSpinner>
    ) : (
        <LoginLayout>
            <Logo />
            <Heading as={Headings.H4} text='User login' />
            <LoginForm />
        </LoginLayout>
    );
}

export default Login;
