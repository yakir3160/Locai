'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = storedTheme === 'dark' || (!storedTheme && prefersDark);
        setIsDark(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme);
        setIsMounted(true);
    }, []);

    const toggleTheme = (): void => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    // Prevent hydration mismatch
    if (!isMounted) {
        return null;
    }

    return (
        <div className={'bg-gradient-ai p-[0.7px] shadow-[0_1px_10px_rgba(255,105,180,0.5)] rounded-3xl'}>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-3xl bg-background  transition-colors"
                aria-label="Toggle theme"
                type="button"
            >
                {isDark ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                    <Moon className="h-5 w-5 text-slate-700" />
                )}
            </button>
        </div>
    );
};

export default ThemeToggle;