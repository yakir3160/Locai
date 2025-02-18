'use client';

import { useChatStore } from '@/src/store/chatStore';
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
    const { showHistory } = useChatStore();

    return (
        <>
            {/* Mobile Sidebar */}
            <aside className={`
                lg:hidden fixed inset-y-0 left-0 w-64
                ${showHistory ? "-translate-x-0" : "-translate-x-full"}
                transition-transform duration-300
                bg-background z-40 rounded-r-3xl border overflow-y-auto
            `}>
                <SidebarContent />
            </aside>

            {/* Desktop Sidebar */}
            <aside className={`
                hidden lg:block
                ${showHistory ? "w-80" : "w-0"}
                transition-all duration-300
                bg-pink-950/5 border rounded-tr-3xl overflow-hidden
            `}>
                <div className="w-64">
                    <SidebarContent />
                </div>
            </aside>
        </>
    );
}
