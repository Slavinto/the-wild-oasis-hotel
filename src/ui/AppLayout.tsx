import { Outlet } from "react-router-dom";
import {
    ContentContainer,
    Header,
    LayoutWrapper,
    LogoutButton,
    Main,
    Sidebar,
} from "@/ui";

const AppLayout = () => {
    return (
        <LayoutWrapper>
            <Header>
                <span>Header Text here</span>
                <LogoutButton />
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
