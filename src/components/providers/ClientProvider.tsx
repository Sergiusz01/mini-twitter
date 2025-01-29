"use client";

import { useEffect, useState } from "react";

interface ClientProviderProps {
    children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return <>{children}</>;
} 