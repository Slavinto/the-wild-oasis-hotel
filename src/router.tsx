import { createBrowserRouter, Navigate } from "react-router-dom";
import {
    Account,
    Bookings,
    Cabins,
    Dashboard,
    Login,
    PageNotFound,
    Settings,
    Users,
} from "@/pages";
import { ErrorFallback, AppLayout } from "@/ui";

export const router = createBrowserRouter([
    {
        // path: "/",
        element: <AppLayout />,
        errorElement: <ErrorFallback />,
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard' replace />,
                errorElement: <ErrorFallback />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
                errorElement: <ErrorFallback />,
            },
            {
                path: "/account",
                element: <Account />,
                errorElement: <ErrorFallback />,
            },
            {
                path: "/bookings",
                element: <Bookings />,
                errorElement: <ErrorFallback />,
            },
            {
                path: "cabins/",
                element: <Cabins />,
                errorElement: <ErrorFallback />,
            },
            {
                path: "/settings",
                element: <Settings />,
                errorElement: <ErrorFallback />,
            },
            {
                path: "/users",
                element: <Users />,
                errorElement: <ErrorFallback />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorFallback />,
    },
    {
        path: "*",
        element: <PageNotFound />,
        errorElement: <ErrorFallback />,
    },
]);
