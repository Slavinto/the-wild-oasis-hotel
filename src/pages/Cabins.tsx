import CabinRow from "@/features/cabins/CabinRow";
import CabinTable from "@/features/cabins/CabinTable";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { getCabins } from "@/services/apiCabins";
import { RowOrientations } from "@/types/enums";
import { Button, Heading, Row, SpinnerMini } from "@/ui";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Cabins() {
    const [showForm, setShowForm] = useState(false);
    const { data, error, isLoading } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });
    console.log({ data });
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
                        <SpinnerMini />
                    ) : (
                        data &&
                        data.map((cabin) => (
                            <CabinRow key={cabin.id} cabin={cabin} />
                        ))
                    )}
                </CabinTable>
                {showForm && <CreateCabinForm />}
                <Button onClick={() => setShowForm((prev) => !prev)}>
                    {showForm ? "Hide Form" : "Add new cabin"}
                </Button>
            </Row>
        </>
    );
}

export default Cabins;
