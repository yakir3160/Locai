'use client';
import { Header } from "@/components/ui/custom/Header";
import { ChatInput } from "@/components/ui/ChatInput";
import { ChatInterface } from "@/components/ChatInterface";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import ToggleSidebarButton from "@/components/ui/sidebar/ToggleSidebarButton";
import { useChatStore } from '@/src/store/chatStore';

export default function AdvancedChatbot() {
    const { showHistory } = useChatStore();

    return (
        <div className="flex flex-col ">
            <Header />
            <ToggleSidebarButton />
            <div className="flex flex-1 mt-24 ">
                <div className={`
                    fixed left-0 h-full 
                    transition-all duration-200 ease-in-out
                    ${showHistory ? 'w-80 opacity-100 visible' : 'w-0 opacity-0 invisible'}
                    z-40 md:z-0
                 
                `}>
                    <Sidebar />
                </div>
                <main className={`
                    flex flex-col flex-grow             
                    mx-auto
                    md:mt-2            
                    p-2 md:p-4    
                    h-[calc(100vh-17rem)] md:h-[calc(100vh-14rem)]            
                    relative
                    rounded-3xl
               
                    transition-all duration-300 ease-in-out
                    ${showHistory ? 'md:ml-80' : 'md:ml-0'}
                    overflow-x-auto
                    
                         
                `}>
                    <ChatInterface/>
                    <div className={`fixed bottom-0 flex justify-center w-full self-center `}>
                        <ChatInput/>
                    </div>

                </main>

            </div>


        </div>
    );
}