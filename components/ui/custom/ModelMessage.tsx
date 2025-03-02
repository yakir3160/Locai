import React from "react";
import { motion } from "framer-motion";
import HomeIcon from "@/src/assets/icons/home-smile.svg";
import { type Message, useChatStore } from "@/src/store/chatStore";
import ReactMarkdown from "react-markdown";
import CodeBlock from "@/components/ui/CodeBlock";
import CopyButton from "@/components/ui/CopyButton";

interface ModelMessageProps {
    message: Message;
}

export const ModelMessage: React.FC<ModelMessageProps> = ({ message }) => {
    const { isLoading } = useChatStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-end" // Changed to justify-end for right alignment
        >
            <div className="rounded-3xl rounded-tr-none max-w-3/4 w-fit text-md bg-pink-950/5 ml-auto"> {/* Keep rounded-tr-none for right bubble pointer, added ml-auto */}
                <div className="prose dark:prose-invert bg-pink-950/5 rounded-3xl rounded-tr-none p-5 flex flex-col gap-2 text-foreground whitespace-normal">
                    <div className="flex flex-col mr-2"> {/* Changed ml-2 to mr-2 */}
                        <div className={`${isLoading ? "animate-pulse" : ""} w-fit self-end`}> {/* Kept self-end for right alignment */}
                            <HomeIcon className="size-7 md:size-9 fill-[url(#logo-gradient)]" />
                        </div>
                    </div>
                    <ReactMarkdown
                        components={{
                            code({className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                return match ? (
                                    <CodeBlock
                                        language={match[1]}
                                        value={String(children).replace(/\n$/, "")}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {message.text}
                    </ReactMarkdown>
                </div>
                <div className={`p-2`}>
                    <CopyButton text={message.text} />
                </div>
            </div>
        </motion.div>
    );
};