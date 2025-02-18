'use client';
import React from 'react';
import { motion } from 'framer-motion';
import HomeIcon from '@/src/assets/icons/home-smile.svg';
import { Message ,useChatStore} from '@/src/store/chatStore';
import {Copy,CopyCheck} from "lucide-react";


interface ModelMessageProps {
    message: Message;
}

export const ModelMessage = ({ message }: ModelMessageProps) => {
    const {isLoading} = useChatStore();
    const [isCopied, setIsCopied] = React.useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.text);
        setIsCopied(true);

    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex"
        >
            <div className={`  bg-pink-950/10 rounded-3xl rounded-tr-none `}>
                <div
                    className="p-4 rounded-3xl rounded-tr-none    whitespace-pre-line flex gap-2 border border-pink-500/50 bg-pink-950/5 text-foreground ml-auto">
                    {message.text}
                    <div className="flex flex-col gap-2">
                        <div className={`${isLoading ? 'animate-pulse' : ''} w-fit self-start`}>
                            <HomeIcon className="size-7 md:size-9 fill-[url(#logo-gradient)]"/>
                        </div>
                    </div>

                </div>

                    <button
                        onClick={handleCopy}
                        className=" text-pink-500 p-3"
                    >
                        {
                            isCopied ?
                                <CopyCheck className="size-6 "/>
                                :
                                <Copy className="size-6 "/>
                        }
                    </button>
            </div>
        </motion.div>
    );
};
