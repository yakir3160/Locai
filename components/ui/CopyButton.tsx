import React, { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";

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

            <div className=" flex items-center justify-center space-x-1 transition-all duration-500 text-xs md:text-sm">
                {isCopied ?
                    <ClipboardCheck className="size-4  text-green-500 "/>
                    :
                    <Clipboard className="size-4 "/>
                }
                <span className={`${isCopied && 'text-green-500'}`}>Copy </span>
            </div>
        </button>
    );
};

export default CopyButton;