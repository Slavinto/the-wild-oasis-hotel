import DatePicker from "react-datepicker";
import { HiOutlineCalendar } from "react-icons/hi2";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { useBookingsContext } from "@/features/bookings/BookingsContext";

const Wrapper = styled.div`
    position: relative;
    z-index: 1000;
    box-shadow: var(--shadow-sm);

    .react-datepicker__input-container input {
        border: 1px solid var(--color-grey-100);
        border-radius: var(--border-radius-sm);
        padding: 6px 10px 6px 25px;
    }

    .react-datepicker__input-container {
        display: flex;
        align-items: center;
    }
    .react-datepicker {
        border: none;
        font-size: 1.4rem; /* Adjust font size */
        width: 210px !important; /* Adjust width */
    }

    .react-datepicker__header {
        width: 208px !important;
        font-size: 1.2rem;
    }

    .react-datepicker__month-container {
        border: 1px solid var(--color-grey-100);
        box-shadow: var(--shadow-md);
    }

    .react-datepicker__week {
        display: flex;
        flex-wrap: wrap;
    }
    .react-datepicker__day {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-datepicker__day-name {
        font-size: 1.2rem;
    }
`;

const CustomDatePicker = () => {
    const { startDate, setStart, endDate, setEnd } = useBookingsContext();

    console.log({ startDate, endDate });
    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;

        setStart?.(start);
        setEnd?.(end);
    };

    return (
        <Wrapper>
            <DatePicker
                toggleCalendarOnIconClick
                showIcon
                dateFormat='dd.MM.yyyy'
                icon={<HiOutlineCalendar />}
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                popperClassName='popper'
                popperPlacement='bottom-start'
                placeholderText='Select interval'
                // withPortal
            />
        </Wrapper>
    );
};

export default CustomDatePicker;
