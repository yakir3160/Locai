'use client';

import { useChatStore } from '@/src/store/chatStore';
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
    const { showHistory } = useChatStore();

    return (
        <>
            {/* Mobile Sidebar */}
            <aside
                className={`
                 fixed inset-y-0 left-0 w-64
                ${showHistory ? "-translate-x-0" : "-translate-x-full"}
                transition-transform duration-300
                bg-background z-40 rounded-r-3xl  border-r border-l-0 border-b-0  border-pink-500/20 overflow-y-auto
            `}>
                <SidebarContent />
            </aside>

        </>
    );
}
