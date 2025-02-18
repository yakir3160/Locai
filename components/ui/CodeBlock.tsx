'use client';
import React, {useState} from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
import {Copy, CopyCheck} from "lucide-react"

interface CodeBlockProps {
    language: string
    value: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
    const [isCopied, setIsCopied] = useState(false)
    const handleCopy = async () => {
        await navigator.clipboard.writeText(value)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }
    return (
        <div className="rounded-3xl bg-gradient-ai-dark flex flex-col p-4">
            <div className="flex items-center justify-between">
                <span className="text-gray-950 border border-orange-500 font-bold rounded-3xl mx-2 bg-gradient-ai w-fit px-2 py-1">{language.trim()}</span>
                <button
                    className="text-pink-500 px-3 hover:text-pink-400 transition-colors duration-300"
                    onClick={handleCopy}
                    aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
                >
                    {isCopied ? <CopyCheck className="size-5 text-green-500"/> : <Copy className="size-5"/>}
                </button>
            </div>
            <div className="px-2">
                <SyntaxHighlighter
                    language={language.toLowerCase().trim()}
                    style={vscDarkPlus}
                    customStyle={{
                        padding: "1.5rem",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        borderRadius: "23px",
                        backgroundColor: "black",

                    }}
                >
                    {value}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default CodeBlock