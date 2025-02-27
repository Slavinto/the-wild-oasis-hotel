import { AppTables } from "@/types/enums";
import { createContext, useContext } from "react";

export interface ITableContext {
    columns: string;
    colNames: string[];
    tableType?: AppTables;
}

export const TableContext = createContext<ITableContext>({
    columns: "",
    colNames: [],
});

export const useTableContext = () => {
    const context = useContext(TableContext);
    if (!context)
        throw new Error("Table components must be wrapped with <Table>.");
    return context;
};
