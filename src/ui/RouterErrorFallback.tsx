import { handleError } from "@/utils/helpers";
import { useRouteError } from "react-router-dom";
import styled from "styled-components";
import Heading from "./Heading";
import { Headings } from "@/types/enums";
import Button from "./Button";

const StyledRouterErrorFallback = styled.main`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4.8rem;
`;

const StyledBox = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    display: flex;
    flex-direction: column;
    padding: 4.8rem;
    flex: 0 1 96rem;
    align-items: center;

    & h1 {
        margin-bottom: 1.6rem;
    }

    & p {
        font-family: "Sono";
        margin-bottom: 3.2rem;
        color: var(--color-grey-500);
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;
`;

export default function RouterErrorFallback() {
    const routerError = handleError(useRouteError());

    return (
        <>
            <StyledRouterErrorFallback>
                <StyledBox>
                    <Heading as={Headings.H1} text='Something went wrong' />
                    <p>{routerError && routerError.message}</p>
                    <ButtonContainer>
                        <Button onClick={() => window.location.reload()}>
                            Try again
                        </Button>
                        <Button onClick={() => window.location.replace("/")}>
                            Go to homepage
                        </Button>
                    </ButtonContainer>
                </StyledBox>
            </StyledRouterErrorFallback>
        </>
    );
}
