import { Outlet } from "react-router-dom";
import { Header, LayoutWrapper, Main, Sidebar } from "@/ui";

const AppLayout = () => {
    return (
        <LayoutWrapper>
            <Header />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </LayoutWrapper>
    );
};

export default AppLayout;
