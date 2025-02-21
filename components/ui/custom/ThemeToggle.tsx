'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun,SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        console.log('mounted')
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000`
    }

    if (!mounted) {
        return (
            <div className="bg-gradient-ai p-[0.7px] shadow-[0_1px_10px_rgba(255,105,180,0.5)] rounded-3xl">
                <button className="p-2 rounded-3xl bg-background transition-colors" aria-label="Loading theme">
                    <SunMoon size={20} className="text-pink-500 animate-pulse" />
                </button>
            </div>
        )
    }

    return (
        <div className="bg-gradient-ai p-[0.7px] shadow-[0_1px_10px_rgba(255,105,180,0.5)] rounded-3xl">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-3xl bg-background transition-colors"
                aria-label="Toggle theme"
                type="button"

            >
                <Sun size={20} className="absolute text-yellow-500 rotate-90 scale-0 dark:scale-100 dark:rotate-0 transition-all duration-200" />
                <Moon size={20} className="rotate-0 text-slate-600 scale-100 dark:scale-0 dark:-rotate-90 transition-all duration-200" />
            </button>
        </div>
    )
}

export default ThemeToggle