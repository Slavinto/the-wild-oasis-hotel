import { createBrowserRouter, Navigate } from "react-router-dom";
import {
    Account,
    Bookings,
    Cabins,
    Dashboard,
    Login,
    PageNotFound,
    Settings,
    Testing,
    Users,
} from "@/pages";
import { ErrorFallback, AppLayout, ProtectedRoute, GlobalSpinner } from "@/ui";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import { getCurrentUser } from "./services/apiAuth";

export const router = createBrowserRouter([
    {
        // path: "/",
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        loader: getCurrentUser,
        hydrateFallbackElement: (
            <GlobalSpinner>
                <></>
            </GlobalSpinner>
        ),
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
                children: [],
            },
            {
                path: "/bookings/:id",
                element: <Booking />,
                errorElement: <ErrorFallback />,
            },
            {
                path: "/bookings/check-in/:id",
                element: <CheckIn />,
                errorElement: <ErrorFallback />,
            },
            {
                path: "/cabins",
                element: <Cabins />,
                errorElement: <ErrorFallback />,
            },
            {
                path: "/settings",
                element: <Settings />,
                errorElement: <ErrorFallback />,
            },
            {
                path: "/testing",
                element: <Testing />,
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
        loader: getCurrentUser,
        hydrateFallbackElement: (
            <GlobalSpinner>
                <></>
            </GlobalSpinner>
        ),
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
