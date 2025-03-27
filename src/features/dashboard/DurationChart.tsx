import { Tables } from "@/services/supabaseTypes";
import { AppTables, Headings } from "@/types/enums";
import { Heading } from "@/ui";
import { useThemeContext } from "@/ui/theme/ThemeContext";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const ChartBox = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    padding: 2.4rem 3.2rem;
    grid-column: 3 / span 2;

    & > *:first-child {
        margin-bottom: 1.6rem;
    }

    & .recharts-pie-label-text {
        font-weight: 600;
    }

    & .recharts-legend-wrapper {
        width: 13rem !important;
        top: 50% !important;
        right: 0 !important;
        transform: translateY(-50%);
    }

    & .recharts-sector {
        pointer-events: none;
    }
`;

interface StartData {
    duration: string;
    value: number;
    color: string;
}

const startDataLight: StartData[] = [
    {
        duration: "1 night",
        value: 0,
        color: "#ef4444",
    },
    {
        duration: "2 nights",
        value: 0,
        color: "#f97316",
    },
    {
        duration: "3 nights",
        value: 0,
        color: "#eab308",
    },
    {
        duration: "4-5 nights",
        value: 0,
        color: "#84cc16",
    },
    {
        duration: "6-7 nights",
        value: 0,
        color: "#22c55e",
    },
    {
        duration: "8-14 nights",
        value: 0,
        color: "#14b8a6",
    },
    {
        duration: "15-21 nights",
        value: 0,
        color: "#3b82f6",
    },
    {
        duration: "21+ nights",
        value: 0,
        color: "#a855f7",
    },
];

const startDataDark: StartData[] = [
    {
        duration: "1 night",
        value: 0,
        color: "#b91c1c",
    },
    {
        duration: "2 nights",
        value: 0,
        color: "#c2410c",
    },
    {
        duration: "3 nights",
        value: 0,
        color: "#a16207",
    },
    {
        duration: "4-5 nights",
        value: 0,
        color: "#4d7c0f",
    },
    {
        duration: "6-7 nights",
        value: 0,
        color: "#15803d",
    },
    {
        duration: "8-14 nights",
        value: 0,
        color: "#0f766e",
    },
    {
        duration: "15-21 nights",
        value: 0,
        color: "#1d4ed8",
    },
    {
        duration: "21+ nights",
        value: 0,
        color: "#7e22ce",
    },
];

function prepareData(
    startData: StartData[],
    stays: Tables<AppTables.Bookings>[]
) {
    // A bit ugly code, but sometimes this is what it takes when working with real data 😅

    function incArrayValue(arr: StartData[], field: string) {
        return arr.map((obj) =>
            obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
        );
    }

    const data = stays
        .reduce((arr, cur) => {
            if (cur.number_of_nights === null)
                throw new Error("Invalid number of nights value");
            const num = cur.number_of_nights;
            if (num === 1) return incArrayValue(arr, "1 night");
            if (num === 2) return incArrayValue(arr, "2 nights");
            if (num === 3) return incArrayValue(arr, "3 nights");
            if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
            if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
            if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
            if (num >= 15 && num <= 21)
                return incArrayValue(arr, "15-21 nights");
            if (num >= 21) return incArrayValue(arr, "21+ nights");
            return arr;
        }, startData)
        .filter((obj) => obj.value > 0);

    return data;
}

const DurationChart = ({
    stays,
    staysHeader,
}: {
    stays: Tables<AppTables.Bookings>[];
    staysHeader: string;
}) => {
    const { isDark } = useThemeContext();
    const startData = isDark ? startDataDark : startDataLight;
    const stroke = isDark ? "#374151" : "#e5e7eb";
    const data = prepareData(startData, stays);

    return (
        <ChartBox>
            <Heading as={Headings.H2} text={staysHeader} />
            <ResponsiveContainer width='110%' height={250}>
                <PieChart>
                    <Pie
                        width='50%'
                        data={data}
                        dataKey='value'
                        nameKey='duration'
                        cx='40%'
                        cy='50%'
                        innerRadius={85}
                        outerRadius={110}
                        paddingAngle={3}
                    >
                        {data.map((item, idx) => (
                            <Cell
                                key={idx}
                                fill={item.color}
                                stroke={stroke}
                            ></Cell>
                        ))}
                    </Pie>
                    <Legend
                        verticalAlign='middle'
                        align='right'
                        width={30}
                        layout='vertical'
                        iconSize={15}
                        iconType='circle'
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartBox>
    );
};

export default DurationChart;
