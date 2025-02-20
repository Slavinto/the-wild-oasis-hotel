import AddCabin from "@/features/cabins/AddCabin";
import { CabinsContext } from "@/features/cabins/CabinContext";

import CabinTable from "@/features/cabins/CabinTable";
import { RowOrientations } from "@/types/enums";
import { Heading, Row } from "@/ui";
import { useState } from "react";

function Cabins() {
    const [currentCabinId, setCurrentCabinId] = useState<number>();

    const onSetCabinId = (cabinId: number) => setCurrentCabinId(cabinId);

    // const outerDiv = document.querySelector(".outer-div");
    // const innerDiv = document.querySelector(".inner-div");
    // const childbutton = document.querySelector(".child-button");

    // useEffect(() => {
    //     // defining listener functions
    //     const outerDivListener = (e) => {
    //         console.log("outer div clicked");
    //         // e.stopPropagation();
    //     };
    //     const innerDivListener = (e) => {
    //         console.log("inner div clicked");
    //         // e.stopPropagation();
    //     };
    //     const childButtonListener = (e) => {
    //         console.log("Child Button clicked");
    //         e.stopPropagation();
    //     };
    //     // adding listeners to elements
    //     outerDiv?.addEventListener("click", outerDivListener);
    //     innerDiv?.addEventListener("click", innerDivListener);
    //     childbutton?.addEventListener("click", childButtonListener);
    //     // cleaning up listeners

    //     return () => {
    //         outerDiv?.removeEventListener("click", outerDivListener);
    //         innerDiv?.removeEventListener("click", innerDivListener);
    //         childbutton?.removeEventListener("click", childButtonListener);
    //     };
    // }, [childbutton, innerDiv, outerDiv]);

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
                {/* <div
                    className='outer-div'
                    style={{
                        width: "600px",
                        height: "350px",
                        backgroundColor: "red",
                    }}
                >
                    <div
                        className='inner-div'
                        style={{
                            width: "300px",
                            height: "150px",
                            backgroundColor: "blue",
                        }}
                    >
                        <span>Parent Div</span>
                        <button className='child-button'>Child Button</button>
                    </div>
                </div> */}
            </>
        </CabinsContext.Provider>
    );
}

export default Cabins;
