import AddCabin from "@/features/cabins/AddCabin";
import { CabinsContext } from "@/features/cabins/CabinContext";

import CabinTable from "@/features/cabins/CabinTable";
import CabinTableOperations from "@/features/cabins/CabinTableOperations";
import { RowOrientations } from "@/types/enums";
import { Heading, Row } from "@/ui";
import { useState } from "react";

function Cabins() {
    const [currentCabinId, setCurrentCabinId] = useState<number>();
    const onSetCabinId = (cabinId: number) => setCurrentCabinId(cabinId);

    // useEffect(() => {
    //     const outerDiv = document.querySelector(".outer-div");
    //     const innerDiv = document.querySelector(".inner-div");
    //     const childbutton = document.querySelector(".child-button");

    //     // defining listener functions
    //     const outerDivHandler = (e: Event) => {
    //         const mouseEvent = e as MouseEvent;
    //         // mouseEvent.stopPropagation();
    //         console.log("outer div clicked");
    //     };
    //     const innerDivHandler = (e: Event) => {
    //         const mouseEvent = e as MouseEvent;
    //         // mouseEvent.stopPropagation();
    //         console.log("inner div clicked");
    //     };
    //     const childButtonHandler = (e: Event) => {
    //         const mouseEvent = e as MouseEvent;
    //         // mouseEvent.stopPropagation();
    //         console.log("Child Button clicked");
    //     };

    //     // adding listeners to elements
    //     outerDiv?.addEventListener("click", outerDivHandler);
    //     // outerDiv?.addEventListener("click", outerDivHandler, true);
    //     innerDiv?.addEventListener("click", innerDivHandler);
    //     // innerDiv?.addEventListener("click", innerDivHandler, true);
    //     childbutton?.addEventListener("click", childButtonHandler);
    //     // childbutton?.addEventListener("click", childButtonHandler, true);
    //     // cleaning up listeners

    //     return () => {
    //         outerDiv?.removeEventListener("click", outerDivHandler);
    //         // outerDiv?.removeEventListener("click", outerDivHandler, true);
    //         innerDiv?.removeEventListener("click", innerDivHandler);
    //         // innerDiv?.removeEventListener("click", innerDivHandler, true);
    //         childbutton?.removeEventListener("click", childButtonHandler);
    //         // childbutton?.removeEventListener("click", childButtonHandler, true);
    //     };
    // }, []);

    return (
        <CabinsContext.Provider value={{ currentCabinId, onSetCabinId }}>
            <>
                <Row type={RowOrientations.Horizontal}>
                    <Heading text='Manage Cabins' />
                    <CabinTableOperations />
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
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div
                        className='inner-div'
                        style={{
                            width: "300px",
                            height: "150px",
                            backgroundColor: "blue",
                            margin: "0 auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <button
                            style={{ margin: "0 auto", padding: "1rem" }}
                            className='child-button'
                        >
                            Child Button
                        </button>
                    </div>
                </div> */}
            </>
        </CabinsContext.Provider>
    );
}

export default Cabins;
