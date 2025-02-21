import { useChatStore } from '@/src/store/chatStore';
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export default function ToggleSidebarButton() {
    const { showHistory, setShowHistory } = useChatStore();

    const handleMouseEnter = () => setShowHistory(true);
    const handleMouseLeave = () => setShowHistory(false);

    return (

            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setShowHistory(!showHistory)}
                className="fixed top-2 ml-4 md:-bottom-[49.5rem] md:ml-2 p-2
                    focus:outline-none text-pink-500 z-50 w-56  mt-16 "
            >
                {showHistory ? <PanelLeftClose className="size-7" /> : <PanelLeftOpen className="size-7" />}
            </button>
    );
}