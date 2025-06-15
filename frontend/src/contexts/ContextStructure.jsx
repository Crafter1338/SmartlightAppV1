import { BackendProvider } from "./Backend";
import { ViewportProvider } from "./Viewport";

export default function({ children }) {
    return (
        <>
            <ViewportProvider>
				<BackendProvider>
                    { children }
                </BackendProvider>
			</ViewportProvider>
        </>
    );
}