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

            <div className="transition-all duration-500 text-xs md:text-sm">
                {isCopied ?
                    <div className={`flex items-center justify-center space-x-2`}>
                        <CopyCheck className="size-4 md:size-5 text-green-500 "/>
                        <span className="text-green-500">Copied to clipboard</span>
                    </div>
                    :
                    <div className={`flex items-center justify-center space-x-2`}>
                        <Copy className="size-4 md:size-5" />
                        <span>Copy to clipboard</span>
                    </div>
                }
            </div>
        </button>
    );
};

export default CopyButton;