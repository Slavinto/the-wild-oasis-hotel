import { createBrowserRouter, Navigate } from "react-router-dom";
import {
    Bookings,
    Cabins,
    Dashboard,
    Login,
    PageNotFound,
    Settings,
    Testing,
    Users,
} from "@/pages";
import {
    AppLayout,
    ProtectedRoute,
    GlobalSpinner,
    RouterErrorFallback,
} from "@/ui";
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
        errorElement: <RouterErrorFallback />,

        children: [
            {
                index: true,
                element: <Navigate to='/dashboard' replace />,
                errorElement: <RouterErrorFallback />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
                errorElement: <RouterErrorFallback />,
            },
            {
                path: "/bookings",
                element: <Bookings />,
                errorElement: <RouterErrorFallback />,
            },
            {
                path: "/bookings/:id",
                element: <Booking />,
                errorElement: <RouterErrorFallback />,
            },
            {
                path: "/bookings/check-in/:id",
                element: <CheckIn />,
                errorElement: <RouterErrorFallback />,
            },
            {
                path: "/cabins",
                element: <Cabins />,
                errorElement: <RouterErrorFallback />,
            },
            {
                path: "/settings",
                element: <Settings />,
                errorElement: <RouterErrorFallback />,
            },
            {
                path: "/testing",
                element: <Testing />,
                errorElement: <RouterErrorFallback />,
            },
            {
                path: "/users",
                element: <Users />,
                errorElement: <RouterErrorFallback />,
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
        errorElement: <RouterErrorFallback />,
    },
    {
        path: "*",
        element: <PageNotFound />,
        errorElement: <RouterErrorFallback />,
    },
]);
