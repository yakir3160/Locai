import { useChatStore } from '@/src/store/chatStore';
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useEffect, useState } from 'react';

export default function ToggleSidebarButton() {
    const { showHistory, setShowHistory ,pinedSidebar} = useChatStore();
    const [isMediumScreen, setIsMediumScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMediumScreen(window.innerWidth >= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleMouseEnter = () => {
        if (isMediumScreen) {
            setShowHistory(true);
        }
    };

    const handleMouseLeave = () => {
        if (isMediumScreen) {
            setShowHistory(false);
        }
    };

    return (
        <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setShowHistory(!showHistory)}
            className="fixed top-2 ml-4 md:-bottom-[49.5rem] md:ml-2 p-2
                focus:outline-none text-pink-500 z-50 md:w-56 md:mt-16"
            disabled={!pinedSidebar}
        >
            {showHistory ? 
                <PanelLeftClose className="size-7" /> : 
                <PanelLeftOpen className="size-7" />
            }
        </button>
    );
}