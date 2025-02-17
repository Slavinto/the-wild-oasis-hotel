import AddCabin from "@/features/cabins/AddCabin";
import { CabinsContext } from "@/features/cabins/CabinContext";

import CabinTable from "@/features/cabins/CabinTable";
import { RowOrientations } from "@/types/enums";
import { Heading, Row } from "@/ui";
import { useState } from "react";

function Cabins() {
    const [currentCabinId, setCurrentCabinId] = useState<number>();

    const onSetCabinId = (cabinId: number) => setCurrentCabinId(cabinId);

    return (
        <CabinsContext.Provider value={{ currentCabinId, onSetCabinId }}>
            <>
                <Row type={RowOrientations.Horizontal}>
                    <Heading text='Manage Cabins' />
                </Row>
                <Row>
                    <CabinTable />
                    <AddCabin />
                </Row>
            </>
        </CabinsContext.Provider>
    );
}

export default Cabins;
