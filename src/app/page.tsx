"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatInput } from "@/components/ui/ChatInput"
import { MessageDisplay } from "@/components/ui/MessageDisplay"
import { Header } from "@/components/ui/custom/Header"


export default function AdvancedChatbot() {
    const [modelCount, setModelCount] = useState<"1" | "2">("1");
    const [isOnline, setIsOnline] = useState(true);
    const [factCheck, setFactCheck] = useState(false);

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat",
        body: { modelCount, isOnline, factCheck },
    });

    return (
        <div className="bg-background min-h-screen flex flex-col">
            <Header
                modelCount={modelCount}
                setModelCount={setModelCount}
                isOnline={isOnline}
                setIsOnline={setIsOnline}
                factCheck={factCheck}
                setFactCheck={setFactCheck}
            />
            <div className="flex-grow grid grid-cols-1 justify-center min-h-screen bg-background p-4 gap-6 pt-24">
                <CardHeader className="rounded-3xl">
                    <CardTitle className="text-2xl font-bold">Advanced Chatbot</CardTitle>
                </CardHeader>
                <Card className="w-full max-w-2xl shadow-lg rounded-3xl overflow-hidden">
                    <CardContent className="">
                        <MessageDisplay messages={messages} />
                    </CardContent>
                </Card>
                <CardFooter className="rounded-3xl">
                    <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                </CardFooter>
            </div>
        </div>
    );
}
