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
        <div className="flex flex-col ">
            <Header/>
            <div className="flex mt-24 h-[calc(100vh-14rem)] md:h-[calc(100vh-6rem)] overflow-hidden  ">
                <Sidebar />
                <ToggleSidebarButton />
                {/* Main Content */}
                <div className={`w-full flex justify-center  `}>
                    <main className={`
                    
                        flex-1 flex flex-col justify-end
                        h-[calc(100vh-10rem)] md:h-[calc(100vh-6rem)]
                        transition-all duration-300 pt-2
                        max-w-7xl w-full 
                        ${showHistory ? 'lg:ml-0' : 'lg:mx-4'}
                    `}>
                        <div className="px-1 md:px-12 space-y-2 flex flex-col  ">
                            <ChatInterface />
                            <ChatInput />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
