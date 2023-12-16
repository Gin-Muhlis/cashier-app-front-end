'use client';

import { SessionProvider } from "next-auth/react";

const ProviderSession = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SessionProvider>
                {children}
            </SessionProvider>
        </>

    )
}

export default ProviderSession