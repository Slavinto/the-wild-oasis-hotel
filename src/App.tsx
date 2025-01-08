import styled from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import { Button, Heading, Input, Row } from "@/ui";
import {
    ButtonSizes,
    ButtonVariations,
    Headings,
    RowOrientations,
} from "@/types/enums";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
            <GlobalStyles />
        </>
    );
};

export default App;
