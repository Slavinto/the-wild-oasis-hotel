import { useState } from "react";
import { useUser } from "./useUser";

import { Button, FileInput, Form, FormRow, Input } from "@/ui";
import { ButtonVariations, FormRowLabels, InputIds } from "@/types/enums";

function UpdateUserDataForm() {
    // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
    const {
        user: {
            email,
            user_metadata: { fullName: currentFullName },
        },
    } = useUser();

    const [fullName, setFullName] = useState<string>(currentFullName);
    const [avatar, setAvatar] = useState<File | null>(null);

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label={FormRowLabels.EmailAddress}>
                <Input value={email as string} disabled />
            </FormRow>
            <FormRow label={FormRowLabels.FullName}>
                <Input
                    type='text'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id={InputIds.FullName}
                />
            </FormRow>
            <FormRow label={FormRowLabels.AvatarImage}>
                <FileInput
                    id='avatar'
                    accept='image/*'
                    onChange={(e) =>
                        setAvatar(e.target.files ? e.target.files[0] : null)
                    }
                />
            </FormRow>
            <FormRow>
                <Button type='reset' variation={ButtonVariations.Secondary}>
                    Cancel
                </Button>
                <Button>Update account</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
