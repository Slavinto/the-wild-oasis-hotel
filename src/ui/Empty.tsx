import { AppEntities } from "@/types/enums";

function Empty({ resource }: { resource: AppEntities }) {
    return <p>No {resource} could be found.</p>;
}

export default Empty;
