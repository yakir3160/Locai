import { useChatStore } from "@/src/store/chatStore";
import { ArrowUp, CircleStop } from 'lucide-react';
import { ControlPanel } from '@/components/ui/ControlPanel';

export const ChatInput = () => {
    const { input, setInput, isLoading, sendMessage,stopMessage } = useChatStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        await sendMessage(input);
    };
    const handleStop = async () => {
        stopMessage();
    }


    return (
        <div className=" md:ml-1 w-full md:w-1/2 z-30  px-1 self-center ">
            <div className="bg-pink-950/5 dark:bg-pink-950/20  outline outline-1 outline-pink-500/20 rounded-t-[25px] text-base">
                <div className="bg-animation p-[0.8px] shadow-[0_1px_10px_rgba(255,105,180,0.5)] rounded-[25px] pb-[0.8px]">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full items-center space-y-2 bg-background rounded-3xl p-1">
                        <div className="flex w-full justify-center items-center">
                            <textarea
                                value={input}
                                onChange={handleInputChange}
                                placeholder={isLoading ? "Generating..." : "Type your message here..."}
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
                                    className="flex flex-row relative top-0 self-end rounded-[20px] bg-gradient-ai animate-pulse p-2 focus:outline-none "
                                    aria-label="Stop message"
                                    onClick={handleStop}
                                >
                                    <CircleStop className="size-6 animate-pulse" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!input?.trim()}
                                    className="relative top-0 self-end rounded-[20px] bg-gradient-ai p-2 focus:outline-none hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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
