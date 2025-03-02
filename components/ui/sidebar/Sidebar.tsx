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
                 fixed inset-y-0 left-0 w-64 md:hidden
                ${showHistory ? "-translate-x-0" : "-translate-x-full"}
                transition-transform duration-300
                bg-background border border-pink-500/20 z-40   rounded-r-3xl  overflow-y-auto
            `}>
                <SidebarContent />
            </aside>

            {/* Desktop Sidebar */}
            <aside
                className={`
                 hidden md:block h-full
                ${showHistory ? "translate-x-0" : "-translate-x-full"}
                transition-transform duration-300
                bg-pink-950/5  rounded-r-3xl   mt-2  overflow-y-auto
            `}>
                <SidebarContent />
            </aside>


        </>
    );
}
