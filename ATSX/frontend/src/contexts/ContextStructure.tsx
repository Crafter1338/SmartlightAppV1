import { ViewportProvider } from "./Viewport";

interface props {
    children?: any | null;
}

export default function({ children }: props) {
    return (
        <>
            <ViewportProvider>
                { children }
            </ViewportProvider>
        </>
    );
}