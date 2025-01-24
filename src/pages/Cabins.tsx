import CabinRow from "@/features/cabins/CabinRow";
import CabinTable from "@/features/cabins/CabinTable";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { getCabins } from "@/services/apiCabins";
import { CabinRowFunctions, RowOrientations } from "@/types/enums";
import { Button, Heading, Row, Spinner, SpinnerMini } from "@/ui";
import { useIsMutating, useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Cabins() {
    const [showForm, setShowForm] = useState(false);
    const [currentCabinId, setCurrentCabinId] = useState<number>();
    const { data, error, isLoading } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    const isMutating = useIsMutating();

    if (error) {
        throw error;
    }
    return (
        <>
            <Row type={RowOrientations.Horizontal}>
                <Heading text='Manage Cabins' />
            </Row>
            <Row>
                <CabinTable>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        data &&
                        data
                            .sort(
                                (prevCabin, cabin) =>
                                    new Date(prevCabin.created_at).getTime() -
                                    new Date(cabin.created_at).getTime()
                            )
                            .map((cabin) =>
                                // trying to identify that a cabin with particular id is being updated
                                isMutating === 1 &&
                                currentCabinId === cabin.id ? (
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
                                    <CabinRow
                                        key={cabin.id}
                                        cabin={cabin}
                                        // setting id to identify which cabin will be updated
                                        setCurrentCabinId={setCurrentCabinId}
                                    />
                                )
                            )
                    )}
                </CabinTable>
                {showForm && (
                    <CreateCabinForm
                        setCurrentCabinId={setCurrentCabinId}
                        cabinFunction={CabinRowFunctions.Create}
                    />
                )}
                <Button onClick={() => setShowForm((prev) => !prev)}>
                    {showForm ? "Hide Form" : "Add new cabin"}
                </Button>
            </Row>
        </>
    );
}

export default Cabins;
