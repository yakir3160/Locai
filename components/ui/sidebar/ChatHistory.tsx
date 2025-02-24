import { useChatStore } from '@/src/store/chatStore';
import React from 'react';
import {PinSidebarButton} from "@/components/ui/sidebar/PinSidebarButton";

export const ChatHistory = () => {
    const { conversation } = useChatStore();
    return (
        <div>
            <div className="flex items-center justify-center mb-4">
                <div className="text-lg ml-2 mb-1 font-semibold bg-gradient-ai text-transparent bg-clip-text">
                    Chat History
                </div>
            </div>
            <div className="space-y-2">
                {conversation?.map((message) => (
                    <div
                        key={message.id}
                        className="px-1 py-2 hover:bg-pink-950/10 rounded-lg cursor-pointer truncate"
                    >
                        {message.text.substring(0, 30)}...
                    </div>
                ))}
            </div>
            <PinSidebarButton/>
        </div>
    );
};

