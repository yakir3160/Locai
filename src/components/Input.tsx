'use client';
import React, { useState } from 'react';
import { ArrowUp  } from "lucide-react";
import type { Message } from '@/src/types';

export const Input: React.FC = () => {
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
                className=" mt-10 gap-4  text-md rounded-3xl shadow-[0_1px_10px_rgba(255,105,180,0.5)]
                transition-shadow duration-300">
                <form onSubmit={handleSendMessage}
                      className="flex  justify-between items-start rounded-full   mx-auto relative z-10">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="How can I help you?"
                        className="px-6 py-4 focus:outline-none bg-transparent w-full "
                        autoFocus={true}
                    />
                    <div className={`flex-shrink-0 p-1 bg-background items-center justify-center inline-flex rounded-3xl  `}>
                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="rounded-[22px]  bg-gradient-ai p-4 focus:outline-none hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            aria-label="Send message"
                        >
                            <ArrowUp className="size-6 "/>
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

