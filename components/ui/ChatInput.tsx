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
                              factCheck,
                              setFactCheck,
                          }: ChatInputProps) => {
    return (
        <div className="mb-5">
            <div className="bg-pink-950/5 border rounded-3xl text-base">
                <div className="bg-animation p-[0.5px] shadow-[0_1px_10px_rgba(255,105,180,0.5)] rounded-3xl">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center space-y-2 bg-background rounded-3xl py-2 px-3">
                        <div className="flex w-full items-end space-x-2">
                            <textarea
                                value={input}
                                onChange={(e) => handleInputChange(e as any)}
                                placeholder="How can I help you?"
                                className="flex-grow px-4 bg-transparent   py-2 resize-none min-h-[40px] max-h-[200px] overflow-y-auto rounded-md  focus:outline-none "
                                style={{ height: 'auto' }}
                                rows={1}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height = `${target.scrollHeight}px`;

                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e as any);
                                    }
                                    if (e.key === "Enter" && e.shiftKey) {
                                        e.preventDefault();
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = 'auto';
                                        target.style.height = `${target.scrollHeight}px`;
                                    }
                                }}
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!input?.trim()}
                                className=" relative top-0  rounded-2xl  bg-gradient-ai p-2 focus:outline-none hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Send message"
                            >
                                <ArrowUp className="size-6" />
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-full px-3 pb-2">
                    <ControlPanel
                        modelCount={modelCount}
                        setModelCount={setModelCount}
                        factCheck={factCheck}
                        setFactCheck={setFactCheck}
                    />
                </div>
            </div>
        </div>
    );
};
