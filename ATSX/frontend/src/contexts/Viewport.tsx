import { createContext, useContext, useState, useEffect } from "react";

interface ViewportContextProps {
    width: number;
    height: number;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
}

const Context = createContext<ViewportContextProps | null>(null);

function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(() =>
		typeof window !== "undefined" ? window.matchMedia(query).matches : false
	);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query);
		const listener = (event: MediaQueryListEvent) =>
			setMatches(event.matches);

		mediaQueryList.addEventListener("change", listener);
		setMatches(mediaQueryList.matches);

		return () => mediaQueryList.removeEventListener("change", listener);
	}, [query]);

	return matches;
}

export function ViewportProvider({ children }: any) {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const isSm = useMediaQuery("(max-width:600px)");
    const isMd = useMediaQuery("(min-width:601px) and (max-width:900px)");
    const isLg = useMediaQuery("(min-width:901px)");

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Context.Provider value={{ width, height, isSm, isMd, isLg }}>
            <div style={{ width, height }}>{children}</div>
        </Context.Provider>
    );
}

export function useViewport(): ViewportContextProps {
    const context = useContext(Context);
    if (!context) throw new Error("useViewport must be used within a ViewportProvider");

    return context;
}