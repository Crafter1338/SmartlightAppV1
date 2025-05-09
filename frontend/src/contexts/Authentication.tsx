import { http } from "@/utils";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ViewportContextProps {
    email: string;
    uuid: string;
    token: string;

    isVerified: Boolean;

    verifyToken: Function;
    verify: Function;

    signIn: Function;
    signOut: Function;
}

const Context = createContext<ViewportContextProps | null>(null);

export function AuthenticationProvider({ children }:any) {
    const [email, setEmail] = useState('');
    const [uuid, setUuid] = useState('');
    const [token, setToken] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const navigate = useNavigate();

    const verifyToken = async (token: string): Promise<Boolean> => {
        if (token.length == 0) {
            const storedToken = localStorage.getItem('auth_token') || '';

            if (storedToken.length == 0) return false;

            setToken(storedToken)

            const { uuid, email } = await http('/verify', { method:'POST', body: { token: storedToken }})

            if (uuid) {
                setEmail(email);
                setUuid(uuid);
                setIsVerified(true);
                return true;
            }

            setIsVerified(false);
            return false;
        }

        const { uuid, email } = await http('/verify', { method:'POST', body: { token }})

        if (uuid) {
            setEmail(email);
            setUuid(uuid);
            setIsVerified(true);
            return true;
        }

        setIsVerified(false);
        return false;
    } 

    const verify = async (): Promise<Boolean> => {
        if (isVerified) return true;

        const status = await verifyToken(token);
        if (status == false) navigate('/sign-in');

        return status;
    }

    const signIn = async (email: string, password: string) => {
        const { token, uuid } = await http('/verify', {body: { email, password }, method:'POST'})
        
        if ( token ) {
            setEmail(email);
            setUuid(uuid);
            setToken(token);
            setIsVerified(true);
            
            navigate('/dashboard');
            return;
        }
    }

    const signOut = () => {
        setEmail('');
        setUuid('');
        setToken('');
        setIsVerified(false);

        navigate('/sign-in');
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) setToken(storedToken);
    }, []);
    
    useEffect(() => {
        localStorage.setItem('auth_token', token);
    }, [token]);

    return (
        <>
            <Context.Provider value={{ email, uuid, token, isVerified, verify, verifyToken, signIn, signOut }}>
                { children }
            </Context.Provider>
        </>
    );
}

export function useAuthentication(): ViewportContextProps {
    const context = useContext(Context);
    if (!context) throw new Error("useAuthentication must be used within a AuthenticationProvider");

    return context;
}