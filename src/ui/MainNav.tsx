import {
    HiOutlineCalendarDays,
    HiOutlineCog6Tooth,
    HiOutlineHome,
    HiOutlineHomeModern,
    HiOutlineUsers,
} from "react-icons/hi2";
import styled from "styled-components";
import NavigationLink from "./NavigationLink";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const NavListItem = styled.li`
    /* border: solid black 1px; */
    font-size: 1rem;
`;

const MainNav = () => {
    return (
        <nav>
            <NavList>
                <NavListItem>
                    <NavigationLink to='/dashboard'>
                        <HiOutlineHome />
                        <span>Home</span>
                    </NavigationLink>
                </NavListItem>
                <NavListItem>
                    <NavigationLink to='/bookings'>
                        <HiOutlineCalendarDays />
                        <span>Bookings</span>
                    </NavigationLink>
                </NavListItem>
                <NavListItem>
                    <NavigationLink to='/cabins'>
                        <HiOutlineHomeModern />
                        <span>Cabins</span>
                    </NavigationLink>
                </NavListItem>
                <NavListItem>
                    <NavigationLink to='/users'>
                        <HiOutlineUsers />
                        <span>Users</span>
                    </NavigationLink>
                </NavListItem>
                <NavListItem>
                    <NavigationLink to='/settings'>
                        <HiOutlineCog6Tooth />
                        <span>Settings</span>
                    </NavigationLink>
                </NavListItem>
            </NavList>
        </nav>
    );
};

export default MainNav;
