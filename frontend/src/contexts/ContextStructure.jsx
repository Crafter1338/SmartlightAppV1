import { BackendProvider } from "./Backend";
import { ViewportProvider } from "./Viewport";

export default function ({ children }) {
    return (
        <>
            <BackendProvider>
                <ViewportProvider>{children}</ViewportProvider>
            </BackendProvider>
        </>
    );
}
