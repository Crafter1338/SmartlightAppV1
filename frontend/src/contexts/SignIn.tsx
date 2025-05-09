import { createContext, useContext, useState } from "react";

interface ViewportContextProps {
    email: string;
    setEmail: Function;

    password: string;
    setPassword: Function;
}

const Context = createContext<ViewportContextProps | null>(null);

export function SignInProvider({ children }:any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        console.log('Signing In');
    }

    return (
        <>
            <Context.Provider value={{ email, setEmail, password, setPassword }}>
                { children }
            </Context.Provider>
        </>
    );
}

export function useSignIn(): ViewportContextProps {
    const context = useContext(Context);
    if (!context) throw new Error('useSignIn must be used within a ViewportProvider');

    return context;
}