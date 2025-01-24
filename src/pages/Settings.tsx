import { Headings } from "@/types/enums";
import Heading from "../ui/Heading";
import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";
import { ContentContainer } from "@/ui";

function Settings() {
    return (
        <>
            <ContentContainer>
                <Heading text='Update hotel settings' as={Headings.H1} />
                <UpdateSettingsForm />
            </ContentContainer>
        </>
    );
}

export default Settings;
