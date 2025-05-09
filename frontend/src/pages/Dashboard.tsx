import { useAuthentication } from "@/contexts/Authentication";
import { useEffect } from "react";

export default function Dashboard() {
    const { verify } = useAuthentication();

    useEffect(() => {
        verify();
    }, [])

    return (
        <>
            DASHBOARD
        </>
    );
}