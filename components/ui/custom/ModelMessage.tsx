"use client"
import React from "react"
import { motion } from "framer-motion"
import HomeIcon from "@/src/assets/icons/home-smile.svg"
import { type Message, useChatStore } from "@/src/store/chatStore"
import { Copy, CopyCheck } from "lucide-react"
import ReactMarkdown from "react-markdown"
import CodeBlock from "@/components/ui/CodeBlock"

interface ModelMessageProps {
    message: Message
}

export const ModelMessage = ({ message }: ModelMessageProps) => {
    const { isLoading } = useChatStore()
    const [isCopied, setIsCopied] = React.useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.text)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex"
        >
            <div className="bg-pink-950/10 rounded-3xl rounded-tr-none max-w-full w-full mt-2">
                <div className="p-4 rounded-3xl rounded-tr-none flex gap-2 border border-pink-500/50 bg-pink-950/5 text-foreground">
                    <div className="prose dark:prose-invert max-w-none flex-grow whitespace-normal space-y-6">
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || "")
                                    return !inline && match ? (
                                        <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} {...props} />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                            }}
                        >
                            {message.text}
                        </ReactMarkdown>
                    </div>
                    <div className="flex flex-col gap-2 ml-2">
                        <div className={`${isLoading ? "animate-pulse" : ""} w-fit self-start`}>
                            <HomeIcon className="size-7 md:size-9 fill-[url(#logo-gradient)]" />
                        </div>
                    </div>
                </div>
                <button onClick={handleCopy} className="text-pink-500 p-3">
                    {isCopied ? <CopyCheck className="size-6" /> : <Copy className="size-6" />}
                </button>
            </div>
        </motion.div>
    )
}

