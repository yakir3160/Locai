import { useChatStore } from "@/src/store/chatStore";
import { ArrowUp, CircleStop } from 'lucide-react';
import { ControlPanel } from '@/components/ui/ControlPanel';

export const ChatInput = () => {
    const { input, setInput, isLoading, sendMessage } = useChatStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        await sendMessage(input);
    };

    return (
        <div className="">
            <div className="bg-pink-950/5 border rounded-[25px] text-base">
                <div className="bg-animation p-[0.5px] shadow-[0_1px_10px_rgba(255,105,180,0.5)] rounded-3xl">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center space-y-2 bg-background rounded-3xl p-1">
                        <div className="flex w-full items-center">
                            <textarea
                                value={input}
                                onChange={handleInputChange}
                                placeholder="How can I help you?"
                                className="flex-grow px-4 bg-transparent py-2 resize-none min-h-[40px] max-h-[200px] overflow-y-auto rounded-md focus:outline-none"
                                rows={1}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height = `${target.scrollHeight}px`;
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                                autoFocus
                            />
                            {isLoading ? (
                                <button
                                    type="button"
                                    className="flex flex-row relative top-0 self-end rounded-[20px] bg-gradient-ai p-2 focus:outline-none hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Stop message"
                                >
                                    <CircleStop className="size-6 animate-pulse" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!input?.trim()}
                                    className="relative z-20 top-0 self-end rounded-[20px] bg-gradient-ai p-2 focus:outline-none hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Send message"
                                >
                                    <ArrowUp className="size-6" />
                                </button>
                            )}
                        </div>

                    </form>

                </div>
                <ControlPanel />
            </div>
        </div>
    );
};
