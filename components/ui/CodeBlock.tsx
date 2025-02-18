'use client';
                import React, { useState } from "react";
                import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
                import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
                import { Copy, CopyCheck } from "lucide-react";

                interface CodeBlockProps {
                    language: string;
                    value: string;
                }

                const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
                    const [isCopied, setIsCopied] = useState(false);
                    const handleCopy = async () => {
                        await navigator.clipboard.writeText(value);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                    };

                    return (
                        <div className="rounded-3xl bg-gradient-ai-dark flex flex-col overflow-hidden ">
                            <div className="flex items-center justify-between ">
                                <span className="font-bold rounded-3xl mx-2 bg-gradient-ai text-transparent bg-clip-text w-fit p-2">
                                    {language.trim()}
                                </span>
                                <button
                                    className="text-pink-500 px-3 hover:text-pink-400 transition-colors duration-300"
                                    onClick={handleCopy}
                                    aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
                                >
                                    {isCopied ? <CopyCheck className="size-5 text-green-500" /> : <Copy className="size-5" />}
                                </button>
                            </div>
                            <div className="">
                                <SyntaxHighlighter
                                    language={language.toLowerCase().trim()}
                                    style={vscDarkPlus}
                                    customStyle={{
                                        padding: "1.5rem",
                                        margin: "0",
                                        fontSize: "1rem",
                                        lineHeight: "1.7",
                                        borderRadius: "23px",
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