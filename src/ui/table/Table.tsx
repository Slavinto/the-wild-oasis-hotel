import { Tables } from "@/services/supabaseTypes";
import { TableContext, useTableContext } from "@/ui/table/TableContext";
import { ReactNode } from "react";
import styled from "styled-components";

interface CommonRowProps {
    $columns?: string;
}

const StyledTable = styled.div`
    border: 1px solid var(--color-grey-200);

    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
`;

const CommonRow = styled.div<CommonRowProps>`
    display: grid;
    grid-template-columns: ${(props) =>
        props.$columns || "1fr 1fr 1fr 1fr 1fr 1fr"};
    column-gap: 2.4rem;
    align-items: center;
    transition: none;
`;

const StyledHeader = styled(CommonRow)<CommonRowProps>`
    padding: 1.6rem 2.4rem;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
    padding: 1.2rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const StyledBody = styled.section`
    margin: 0.4rem;
`;

const Footer = styled.footer`
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    padding: 1.2rem;

    /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
    &:not(:has(*)) {
        display: none;
    }
`;

const Empty = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    margin: 2.4rem;
`;

export default function Table({
    columns,
    colNames,
    children,
}: {
    columns: string;
    colNames: string[];
    children: ReactNode;
}) {
    return (
        <TableContext.Provider value={{ columns, colNames }}>
            <StyledTable role='table'>{children}</StyledTable>
        </TableContext.Provider>
    );
}

Table.Header = function TableHeader() {
    const { columns, colNames } = useTableContext();
    console.log({ colNames });
    return (
        <StyledHeader as='header' role='row' $columns={columns}>
            {colNames.map((colName, idx) => (
                <div key={idx + colName}>
                    {colName !== "" ? `${colName.toUpperCase()}` : ""}
                </div>
            ))}
        </StyledHeader>
    );
};

Table.Row = function TableRow({ children }: { children: ReactNode }) {
    const { columns } = useTableContext();

    return <StyledRow $columns={columns}>{children}</StyledRow>;
};

// a type for incoming table data
type AppTables = Tables<"cabins">[];

Table.Body = function TableBody({
    data,
    render,
}: {
    data: AppTables;
    render: (item: Tables<"cabins">) => ReactNode;
}) {
    return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Empty = function TableEmty() {
    return <Empty>No data to display at the moment</Empty>;
};

Table.Footer = function TableFooter({ children }: { children: ReactNode }) {
    return <Footer>{children}</Footer>;
};
