'use client';
import { Header } from "@/components/ui/custom/Header";
import { ChatInput } from "@/components/ui/ChatInput";
import {ChatInterface} from "@/components/ChatInterface";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import ToggleSidebarButton from "@/components/ui/sidebar/ToggleSidebarButton";
import { useChatStore } from '@/src/store/chatStore';

export default function AdvancedChatbot() {
    const { showHistory } = useChatStore();

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="flex flex-1 mt-24">
                <Sidebar />
                <ToggleSidebarButton />
                <div className="flex-1 flex justify-center">
                    <main className={`
                        flex flex-col
                        flex-1
                        content-center
                        max-w-7xl
                        transition-all duration-300
                        ${showHistory ? 'lg:ml-0' : 'lg:mx-4'}
                    `}>
                        <div className="flex flex-col flex-1 px-1 md:pl-16 pb-3 max-w-[390px] md:max-w-screen-md lg:max-w-screen-lg">
                            <ChatInterface />
                        </div>
                            <ChatInput />
                    </main>
                </div>
            </div>
        </div>
    );
}