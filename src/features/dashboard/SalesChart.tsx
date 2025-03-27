import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import { Headings } from "@/types/enums";
import { Heading } from "@/ui";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useThemeContext } from "@/ui/theme/ThemeContext";
import { RecentBookings } from "@/types/interfaces";
import { getMonthNumber } from "@/utils/helpers";
import { Month } from "@/types/types";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

interface DataObj {
    label: string;
    totalSales: number | null;
    extrasSales: number | null;
}

const SalesChart = ({
    bookings,
    bookingsHeader,
}: {
    bookings: RecentBookings[];
    bookingsHeader: string;
}) => {
    const { isDark } = useThemeContext();
    const data = bookings.map((b) => ({
        label: `${new Date(b.created_at).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
        })}`,
        totalSales: b.total_price,
        extrasSales: b.extras_price,
        // summarize excessive entries
    }));
    let output: DataObj[] = [];
    data.forEach((item, _, arr) => {
        const filterCurrent = arr.filter((el) => el.label === item.label);
        const obj = filterCurrent.reduce(
            (prev, el) => ({
                label: el.label,
                totalSales: (prev?.totalSales || 0) + (el.totalSales || 0),
                extrasSales: (prev?.extrasSales || 0) + (el.extrasSales || 0),
            }),
            { label: "", totalSales: 0, extrasSales: 0 }
        );
        output = output.find((el) => el.label === obj.label)
            ? [...output]
            : [...output, obj];
    });
    const sortedData = [...output].sort((a, b) => {
        const [monthA, dayA] = a.label.split(" ");
        const [monthB, dayB] = b.label.split(" ");
        const year = new Date().getFullYear();

        // creating sortable dates
        const dateA = new Date(
            year,
            getMonthNumber(monthA as Month) - 1,
            parseInt(dayA)
        );
        const dateB = new Date(
            year,
            getMonthNumber(monthB as Month) - 1,
            parseInt(dayB)
        );
        return dateA.getTime() - dateB.getTime();
    });
    const colors = isDark
        ? {
              totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
              extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
              text: "#e5e7eb",
              background: "#18212f",
          }
        : {
              totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
              extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "#374151",
              background: "#fff",
          };

    if (!colors) {
        return null;
    }

    return (
        <StyledSalesChart>
            <Heading as={Headings.H2} text={bookingsHeader} />
            <ResponsiveContainer width='100%' height={250}>
                <AreaChart data={sortedData}>
                    <Tooltip contentStyle={{ background: colors.background }} />
                    <XAxis
                        dataKey='label'
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <YAxis
                        unit='$'
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <Area
                        name='Total sales'
                        unit='$'
                        dataKey='totalSales'
                        type='monotone'
                        enableBackground={colors.background}
                        fillOpacity={1}
                        stroke={colors.totalSales.stroke}
                        fill={colors.totalSales.fill}
                    />
                    <Area
                        name='Extras sales'
                        unit='$'
                        dataKey='extrasSales'
                        type='monotone'
                        enableBackground={colors.background}
                        fillOpacity={1}
                        stroke={colors.extrasSales.stroke}
                        fill={colors.extrasSales.fill}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
};

export default SalesChart;
