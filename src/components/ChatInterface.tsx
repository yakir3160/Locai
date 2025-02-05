'use client';
import React, { useState } from 'react';
import { Send } from "lucide-react";
import type { Message } from '@/src/types';

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim()) {
            const newMessage: Message = {
                id: crypto.randomUUID(),
                text: inputText,
                sender: 'user',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newMessage]);
            setInputText('');
        }
    };

    return (
        <div className={``}>
            <div
                className="absolute  gap-4 p-4 pb-10 text-md bottom-0 left-0 right-0 z-10 mx-20 rounded-t-3xl shadow-[0_2px_10px_rgba(255,105,180,0.7)] transition-shadow duration-300">
                <form onSubmit={handleSendMessage}
                      className="flex flex-row rounded-full justify-between  mx-auto relative z-10">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="How can I help you?"
                        className="px-6 py-4 focus:outline-none bg-transparent w-full "
                        autoFocus={true}
                    />
                    <div className={`flex-shrink-0 size-16 bg-background items-center justify-center inline-flex rounded-2xl `}>
                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="rounded-3xl  bg-gradient-ai p-4 focus:outline-none hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            aria-label="Send message"
                        >
                            <Send className="size-6"/>
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

