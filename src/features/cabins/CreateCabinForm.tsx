import styled from "styled-components";

import { Input, Form, Button, FileInput, Textarea } from "@/ui";
import { ButtonVariations } from "@/types/enums";

const FormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const StyledError = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function CreateCabinForm() {
    return (
        <Form>
            <FormRow>
                <Label htmlFor='name'>Cabin name</Label>
                <Input type='text' id='name' placeholder='' />
            </FormRow>

            <FormRow>
                <Label htmlFor='maxCapacity'>Maximum capacity</Label>
                <Input
                    type='number'
                    id='maxCapacity'
                    placeholder='0 - 10 guests'
                />
            </FormRow>

            <FormRow>
                <Label htmlFor='regularPrice'>Regular price</Label>
                <Input type='number' id='regularPrice' placeholder='' />
            </FormRow>

            <FormRow>
                <Label htmlFor='discount'>Discount</Label>
                <Input type='number' id='discount' defaultValue={0} />
            </FormRow>

            <FormRow>
                <Label htmlFor='description'>Description for website</Label>
                <Textarea type='number' id='description' defaultValue='' />
            </FormRow>

            <FormRow>
                <Label htmlFor='image'>Cabin photo</Label>
                <FileInput id='image' accept='image/*' />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation={ButtonVariations.Secondary} type='reset'>
                    Cancel
                </Button>
                <Button>Edit cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
