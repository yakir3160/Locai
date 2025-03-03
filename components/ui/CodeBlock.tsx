// components/ui/CodeBlock.tsx
'use client';
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import CopyButton from "@/components/ui/CopyButton";

interface CodeBlockProps {
    language: string;
    value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
    return (
        <div className="rounded-3xl bg-gradient-ai-dark flex flex-col overflow-y-auto ">
            <div className="flex items-center justify-between">
                <span className="font-bold rounded-3xl mx-2 bg-gradient-ai text-transparent bg-clip-text w-fit p-2 ">
                    {language.trim()}
                </span>
                <CopyButton text={value} />
            </div>
            <div className="overflow-x-auto ">
                <SyntaxHighlighter
                    className="p-6 text-base leading-6 rounded-[23px]"
                    language={language.toLowerCase().trim()}
                    style={vscDarkPlus}
                    customStyle={{
                        padding: "1.5rem",
                        margin: "0",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        backgroundColor: "black",
                    }}
                >
                    {value}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlock;