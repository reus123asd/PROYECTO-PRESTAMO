import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Hero = () => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            return storedTheme;
        }
    });

    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    return (
        <div>
            <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className='p-2.5 rounded-xl text-slate-600 dark:text-slate-300
          hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
                {
                    theme === 'dark' ? (
                        <Sun className=" w-5 h-5" />
                    ) : (
                        <Moon className=" w-5 h-5" />
                    )
                }

            </button>
        </div>
    )
}

export default Hero
