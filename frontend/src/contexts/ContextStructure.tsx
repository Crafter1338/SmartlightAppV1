import { AuthenticationProvider } from "./Authentication";
import { SignInProvider } from "./SignIn";
import { SignUpProvider } from "./SignUp";
import { ViewportProvider } from "./Viewport"

export default function({ children } : any) {
    return (
        <>
            <ViewportProvider>
                <AuthenticationProvider>
                    <SignInProvider>
                        <SignUpProvider>
                            { children }
                        </SignUpProvider>
                    </SignInProvider>
                </AuthenticationProvider>
            </ViewportProvider>
        </>
    );
}