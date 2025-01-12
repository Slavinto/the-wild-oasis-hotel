import GlobalStyles from "@/styles/GlobalStyles";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppToaster } from "./ui";

const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // time till refetch
                staleTime: 0,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <GlobalStyles />
            <ReactQueryDevtools initialIsOpen={false} />
            <AppToaster />
        </QueryClientProvider>
    );
};

export default App;
