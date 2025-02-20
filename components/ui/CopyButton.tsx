import React, { useState } from "react";
    import { Copy, CopyCheck } from "lucide-react";

    interface CopyButtonProps {
        text: string;
    }

    const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
        const [isCopied, setIsCopied] = useState(false);

        const handleCopy = async () => {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
        };

        return (
            <button
                className="text-pink-500 px-3 hover:text-pink-400 transition-colors duration-300 "
                onClick={handleCopy}
                aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
            >
                <div className="transition-transform duration-300">
                    {isCopied ? <CopyCheck className="size-5 text-green-500 " /> : <Copy className="size-5" />}
                </div>
            </button>
        );
    };

    export default CopyButton;