import { createContext, useContext } from "react";

export const TableContext = createContext<{
    columns: string;
    colNames: string[];
}>({
    columns: "",
    colNames: [],
});

export const useTableContext = () => {
    const context = useContext(TableContext);
    if (!context)
        throw new Error("Table components must be wrapped with <Table>.");
    return context;
};
