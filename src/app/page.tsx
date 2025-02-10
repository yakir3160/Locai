'use client';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChatInput } from "@/components/ui/ChatInput";
import { MessageDisplay } from "@/components/ui/MessageDisplay";
import { Header } from "@/components/ui/custom/Header";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const mockMessages = [
    {
        id: "1",
        text: "Hello! How can I help you today?",
        sender: "bot",
        timestamp: new Date("2023-10-01T10:00:00Z"),
    },
    {
        id: "2",
        text: "I need some information about your services.",
        sender: "user",
        timestamp: new Date("2023-10-01T10:01:00Z"),
    },
    {
        id: "3",
        text: "Sure! We offer a variety of services including AI consulting and development.",
        sender: "bot",
        timestamp: new Date("2023-10-01T10:02:00Z"),
    },
];

export default function AdvancedChatbot() {
    const [modelCount, setModelCount] = useState<"1" | "2">("1");
    const [isOnline, setIsOnline] = useState(true);
    const [factCheck, setFactCheck] = useState(false);
    const [messages, setMessages] = useState(mockMessages);
    const [input, setInput] = useState("");
    const [showHistory, setShowHistory] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {
            const newMessage = {
                id: crypto.randomUUID(),
                text: input,
                sender: "user",
                timestamp: new Date(),
            };
            setMessages([...messages, newMessage]);
            setInput("");
        }
    };

    return (
        <div className="flex flex-col">
            <Header isOnline={isOnline} setIsOnline={setIsOnline} />
            <div className="flex mt-24 h-[calc(100vh-14rem)] md:h-[calc(100vh-6rem)]">
                {/* Mobile Sidebar */}
                <aside className={`
                    lg:hidden fixed inset-y-0 left-0 w-64 
                    ${showHistory ? "-translate-x-0" : "-translate-x-full"}
                    transition-transform duration-300 
                    bg-background z-40 rounded-r-3xl border overflow-y-auto
                `}>
                    <SidebarContent messages={messages} />
                </aside>

                {/* Desktop Sidebar */}
                <aside className={`
                    hidden lg:block
                    ${showHistory ? "w-64" : "w-0"}
                    transition-all duration-300 
                    bg-pink-950/5 border rounded-tr-3xl overflow-hidden
                `}>
                    <div className="w-64">
                        <SidebarContent messages={messages} />
                    </div>
                </aside>

                {/* Toggle Button */}
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="fixed bottom-5 left-4  rounded-full p-2
                    focus:outline-none 0 text-pink-500 z-50"
                >
                    {showHistory ? <PanelLeftClose className="size-7" /> : <PanelLeftOpen className="size-7" />}
                </button>

                {/* Main Content */}
                <main className={`
                    flex-1 flex flex-col justify-end
                    transition-all duration-300
                    ${showHistory ? 'lg:ml-0' : 'lg:mx-4'}
                `}>
                    <div className="px-6 md:px-12 py-2 overflow-y-auto">
                        <ChatInput
                            input={input}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            modelCount={modelCount}
                            setModelCount={setModelCount}
                            isOnline={isOnline}
                            setIsOnline={setIsOnline}
                            factCheck={factCheck}
                            setFactCheck={setFactCheck}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}

// Extracted Sidebar Content Component
const SidebarContent = ({ messages }) => (
    <div className="p-4">
        <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold bg-gradient-ai text-transparent bg-clip-text">
                Chat History
            </div>
        </div>
        <div className="space-y-2">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className="px-1 py-2 hover:bg-pink-950/10 rounded-lg cursor-pointer truncate"
                >
                    {message.text.substring(0, 30)}...
                </div>
            ))}
        </div>
    </div>
);