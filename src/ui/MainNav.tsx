import {
    HiOutlineCalendarDays,
    HiOutlineCog6Tooth,
    HiOutlineHome,
    HiOutlineHomeModern,
    HiOutlineUsers,
    HiOutlineWrench,
} from "react-icons/hi2";
import styled from "styled-components";
import NavigationLink from "./NavigationLink";
import Uploader from "@/data/Uploader";

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
                <hr />
                <NavListItem>
                    <NavigationLink to='/testing'>
                        <HiOutlineWrench />
                        <span>Testing</span>
                    </NavigationLink>
                </NavListItem>
                <NavListItem>
                    <Uploader />
                </NavListItem>
            </NavList>
        </nav>
    );
};

export default MainNav;
