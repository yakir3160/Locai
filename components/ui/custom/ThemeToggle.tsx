'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        document.cookie = `theme=${theme === 'dark' ? 'light' : 'dark'}; path=/; max-age=31536000`
    }

    if (!mounted) {
        return (
            <div className={'bg-gradient-ai p-[0.7px] shadow-[0_1px_10px_rgba(255,105,180,0.5)] rounded-3xl'}>
                <button
                    className="p-2 rounded-3xl bg-background transition-colors"
                    aria-label="Toggle theme"
                    type="button"
                >
                    <Sun className="h-5 w-5 text-yellow-500" />
                </button>
            </div>
        )
    }


    return (
        <div className={'bg-gradient-ai p-[0.7px] shadow-[0_1px_10px_rgba(255,105,180,0.5)] rounded-3xl'}>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-3xl bg-background transition-colors"
                aria-label="Toggle theme"
                type="button"
            >
                {theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                    <Moon className="h-5 w-5 text-slate-700" />
                )}
            </button>
        </div>
    );
};

export default ThemeToggle;