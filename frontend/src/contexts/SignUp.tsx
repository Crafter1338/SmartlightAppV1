import { createContext, useContext, useState } from "react";

interface ViewportContextProps {
    email: string;
    setEmail: Function;

    password: string;
    setPassword: Function;

    signUp: Function;
}

const Context = createContext<ViewportContextProps | null>(null);

export function SignUpProvider({ children }:any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = () => {
        console.log('Signing Up');
    }

    return (
        <>
            <Context.Provider value={{ email, setEmail, password, setPassword, signUp }}>
                { children }
            </Context.Provider>
        </>
    );
}

export function useSignUp(): ViewportContextProps {
    const context = useContext(Context);
    if (!context) throw new Error("useSignUp must be used within a ViewportProvider");

    return context;
}