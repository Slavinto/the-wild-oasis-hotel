import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { Headings, RowOrientations } from "@/types/enums";
import { useTodayActivity } from "../dashboard/useTodayActivity";
import { Spinner } from "@/ui";
import TodayItem from "./TodayItem";
import { BookingsWithRelatedFull } from "@/types/types";

const StyledToday = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    padding: 3.2rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    grid-column: 1 / span 2;
    padding-top: 2.4rem;
`;

const TodayList = styled.ul`
    overflow: scroll;
    overflow-x: hidden;

    /* Removing scrollbars for webkit, firefox, and ms, respectively */
    &::-webkit-scrollbar {
        width: 0 !important;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
`;

const NoActivity = styled.p`
    text-align: center;
    font-size: 1.8rem;
    font-weight: 500;
    margin-top: 0.8rem;
`;

function TodayActivity() {
    const { activity, isLoading } = useTodayActivity();
    return (
        <StyledToday>
            {isLoading ? (
                <Spinner />
            ) : (
                <Row type={RowOrientations.Vertical}>
                    <Heading text='Today' as={Headings.H2} />
                    {activity && activity.length > 0 ? (
                        <TodayList>
                            {activity.map((item) => (
                                <TodayItem
                                    item={item as BookingsWithRelatedFull}
                                    key={item.id}
                                />
                            ))}
                        </TodayList>
                    ) : (
                        <NoActivity>Nothing here yet</NoActivity>
                    )}
                </Row>
            )}
        </StyledToday>
    );
}

export default TodayActivity;
