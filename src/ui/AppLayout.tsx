import { Outlet } from "react-router-dom";
import { ContentContainer, Header, LayoutWrapper, Main, Sidebar } from "@/ui";

const AppLayout = () => {
    return (
        <LayoutWrapper>
            <Header />
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
