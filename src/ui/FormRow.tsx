import { FormRowLabels, RowOrientations } from "@/types/enums";
import { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import Row from "./Row";

interface FormRowProps {
    label?: FormRowLabels;
    error?: string;
}

const StyledLabel = styled.label``;

const FormRow: FC<PropsWithChildren<FormRowProps>> = ({
    children,
    label,
    error,
}) => {
    return (
        <Row type={RowOrientations.Horizontal}>
            <StyledLabel>
                {label && <span>{label}</span>}
                {error && <span>{error}</span>}
                {children}
            </StyledLabel>
            ;
        </Row>
    );
};

export default FormRow;
