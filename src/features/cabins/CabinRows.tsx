import { getCabins } from "@/services/apiCabins";
import { Spinner, SpinnerMini, Table } from "@/ui";
import { useIsMutating, useQuery } from "@tanstack/react-query";
import CabinRow from "./CabinRow";
import { useCabinsContext } from "./CabinContext";

const CabinRows = () => {
    const {
        data: cabins,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });
    const { currentCabinId } = useCabinsContext();
    const isMutating = useIsMutating();

    if (error) {
        throw error;
    }

    return (
        <Table.Body>
            {isLoading ? (
                <Spinner />
            ) : (
                cabins &&
                cabins
                    .sort(
                        (prevCabin, cabin) =>
                            new Date(prevCabin.created_at).getTime() -
                            new Date(cabin.created_at).getTime()
                    )
                    .map((cabin) =>
                        // trying to identify that a cabin with particular id is being updated
                        isMutating === 1 && currentCabinId === cabin.id ? (
                            <div
                                key={cabin.id}
                                className=''
                                style={{
                                    height: "7.3rem",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <SpinnerMini />
                            </div>
                        ) : (
                            <CabinRow key={cabin.id} cabin={cabin} />
                        )
                    )
            )}
        </Table.Body>
    );
};

export default CabinRows;
