import LoginForm from "@/features/authentication/LoginForm";
import { Headings } from "@/types/enums";
import { Heading, Logo } from "@/ui";
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
    return (
        <LoginLayout>
            <Logo />
            <Heading as={Headings.H4} text='User login' />
            <LoginForm />
        </LoginLayout>
    );
}

export default Login;
