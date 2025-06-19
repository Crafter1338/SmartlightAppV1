import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext(null);

export function ViewportProvider({children}) {
	const [width, setWidth]				= useState(window.innerWidth);
	const [height, setHeight]			= useState(window.innerHeight);
	const [aspectRatio, setAspectRatio]	= useState(window.innerWidth / window.innerHeight);

    const isSm 							= useMediaQuery("(max-width:600px)");
    const isMd 							= useMediaQuery("(min-width:601px) and (max-width:900px)");
    const isLg 							= useMediaQuery("(min-width:901px)");

	useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
			
			if (window.innerHeight != 0){
				setAspectRatio(window.innerWidth / window.innerHeight);
			}
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

	return (
		<>
			<Context.Provider value={{ width, height, aspectRatio, isSm, isMd, isLg }}>
            	<div style={{ width, height, minHeight:height }}>{children}</div>
        	</Context.Provider>
		</>
	);
}

export function useViewport() {
	const context = useContext(Context)
	if (!context) { throw new Error('context for useViewport missing!') }

	return context
}

export function useMediaQuery(query) {
	const [matches, setMatches] = useState(() =>
		typeof window !== "undefined" ? window.matchMedia(query).matches : false
	);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query);
		const listener = (event) =>
			setMatches(event.matches);

		mediaQueryList.addEventListener("change", listener);
		setMatches(mediaQueryList.matches);

		return () => mediaQueryList.removeEventListener("change", listener);
	}, [query]);

	return matches;
}