import { Button } from "@/components/ui/button";
            import { Input } from "@/components/ui/input";
            import React, { useState } from "react";
            import { ArrowUp } from "lucide-react";
            import { Message } from "@/types";
            import { ControlPanel } from "@/components/ui/ControlPanel";

            interface ChatInputProps {
                input: string;
                handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
                handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
                modelCount: "1" | "2";
                setModelCount: (value: "1" | "2") => void;
                isOnline: boolean;
                setIsOnline: (value: boolean) => void;
                factCheck: boolean;
                setFactCheck: (value: boolean) => void;
            }

            export const ChatInput = ({
                input,
                handleInputChange,
                handleSubmit,
                modelCount,
                setModelCount,
                isOnline,
                setIsOnline,
                factCheck,
                setFactCheck,
            }: ChatInputProps) => {
                const [messages, setMessages] = useState<Message[]>([]);
                const [inputText, setInputText] = useState<string>("");

                const handleSendMessage = (e: React.FormEvent) => {
                    e.preventDefault();
                    if (inputText.trim()) {
                        const newMessage: Message = {
                            id: crypto.randomUUID(),
                            text: inputText,
                            sender: "user",
                            timestamp: new Date(),
                        };
                        setMessages((prev) => [...prev, newMessage]);
                        setInputText("");
                    }
                };

                return (
                    <div className={"bg-animation p-[0.5px] shadow-[0_1px_10px_rgba(255,105,180,0.5)] rounded-3xl"}>
                        <form onSubmit={handleSubmit} className="flex flex-col w-full items-center space-y-2 bg-background rounded-3xl px-3 py-2">
                            <div className="flex w-full items-center space-x-2">
                                <Input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="How can I help you?"
                                    className="flex-grow px-4 py-2"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    disabled={!input?.trim()}
                                    className="rounded-full bg-gradient-ai p-3 focus:outline-none hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Send message"
                                    onClick={handleSendMessage}
                                >
                                    <ArrowUp className="size-6" />
                                </Button>
                            </div>
                            <ControlPanel
                                modelCount={modelCount}
                                setModelCount={setModelCount}
                                factCheck={factCheck}
                                setFactCheck={setFactCheck}
                            />
                        </form>
                    </div>
                );
            };