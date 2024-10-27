"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import Login from '@/components/login';
import BackgroundWrapper from "@/components/BackgroundWrapper";

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <BackgroundWrapper imagePath="/images/electric_timeline.png">
            <main className='flex min-h-screen flex-col items-center justify-between p-24 pt-9'>
                <div className='w-full max-w-7xl mx-auto relative'>
                    <PageHeader />
                    <main className='flex min-h-screen flex-col items-center justify-center'>
                        <Login />
                    </main>
                </div>
            </main>
        </BackgroundWrapper>
    );
}
