import { Outlet } from "react-router-dom";
import {
    ContentContainer,
    Header,
    HeaderMenu,
    LayoutWrapper,
    Main,
    Sidebar,
} from "@/ui";

const AppLayout = () => {
    return (
        <LayoutWrapper>
            <Header>
                <span>Hotel management</span>
                <HeaderMenu></HeaderMenu>
            </Header>
            <Sidebar />
            <Main>
                <ContentContainer>
                    <Outlet />
                </ContentContainer>
            </Main>
        </LayoutWrapper>
    );
};

export default AppLayout;
