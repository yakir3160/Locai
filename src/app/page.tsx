'use client';
import {FormEvent, useState} from "react";
import { ChatInput } from "@/components/ui/ChatInput";
import { Header } from "@/components/ui/custom/Header";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {useScrollToView} from "@/src/hooks/useScrollToView";
import {Message} from "@/src/types";



export default function AdvancedChatbot() {
    const [modelCount, setModelCount] = useState<"1" | "2">("1");
    const [isOnline, setIsOnline] = useState(true);
    const [factCheck, setFactCheck] = useState(false);
    const [input, setInput] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const [conversation, setConversation] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const conversationEndRef = useScrollToView(conversation);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: conversation.length.toString(),
            text: input,
            isUser: true,
        };

        const botMessage: Message = {
            id: (conversation.length + 1).toString(),
            text: "",
            isUser: false,
        };

        setConversation(prev => [...prev, userMessage, botMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [{role: "user", content: input}]
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch response');
            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let currentText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                currentText += chunk;

                setConversation(prev => {
                    const newConversation = [...prev];
                    newConversation[newConversation.length - 1].text = currentText;
                    return newConversation;
                });
            }
        } catch (error) {
            setConversation(prev => {
                const newConversation = [...prev];
                newConversation[newConversation.length - 1].text = "Sorry, there was an error processing your message.";
                return newConversation;
            });
        } finally {
            setIsLoading(false);
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
                    <SidebarContent messages={conversation} />
                </aside>

                {/* Desktop Sidebar */}
                <aside className={`
                    hidden lg:block
                    ${showHistory ? "w-64" : "w-0"}
                    transition-all duration-300 
                    bg-pink-950/5 border rounded-tr-3xl overflow-hidden
                `}>
                    <div className="w-64">
                        <SidebarContent messages={conversation} />
                    </div>
                </aside>

                {/* Toggle Button */}
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="fixed bottom-5 left-4 rounded-full p-2
                    focus:outline-none text-pink-500 z-50"
                >
                    {showHistory ? <PanelLeftClose className="size-7" /> : <PanelLeftOpen className="size-7" />}
                </button>

                {/* Main Content */}
                <main className={`
                    flex-1 flex flex-col justify-end
                    transition-all duration-300
                    ${showHistory ? 'lg:ml-0' : 'lg:mx-4'}
                `}>
                    <div className="w-fit flex-grow overflow-y-auto p-8 space-y-6 rounded-3xl  bg-pink-950/5">
                        {conversation.map((message, i) => (
                            <div
                                key={i}
                                className={`p-4 my-2 rounded-3xl ${
                                    message.isUser
                                        ? 'bg-pink-950/20 text-foreground'
                                        : 'border-t-2 border-pink-500  text-foreground '
                                } max-w-fit`}
                            >
                                {message.text}
                                <div className="text-xs text-right text-pink-500">{message.timestamp}</div>
                            </div>
                        ))}
                        <div ref={conversationEndRef}/>
                    </div>

                    <div className="px-6 md:px-12 py-2 overflow-y-auto space-y-6">

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
                            isLoading={isLoading}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}

const SidebarContent = ({messages}: { messages: Message[] }) => (
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
