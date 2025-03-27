import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Theme from "./ui/theme/Theme.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.tsx";
import Spinner from "./ui/Spinner.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback={<Spinner />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Theme>
                    <App />
                </Theme>
            </ErrorBoundary>
        </Suspense>
    </StrictMode>
);
