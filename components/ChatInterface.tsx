import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToView } from "@/src/hooks/useScrollToView";
import { useChatStore } from "@/src/store/chatStore";
import { UserMessage } from '@/components/ui/custom/UserMessage';
import { ModelMessage } from '@/components/ui/custom/ModelMessage';

export const ChatInterface = () => {
    const { conversation} = useChatStore();
    const conversationEndRef = useScrollToView(conversation);

    useEffect(() => {
        if (conversationEndRef.current) {
            conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversationEndRef, conversation]);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    return (
        <div className="flex flex-col  flex-grow content-center justify-end  ">
            <AnimatePresence mode="wait">
                {!conversation.length ? (
                    <div className={`text-center  text-foreground text-opacity-50  `}>
                        Start a conversation by typing in the chat box below.
                    </div>
                ) : (
                    <motion.div
                        key="chat-container"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full z-0  content-center  space-y-2   font-sans leading-normal  tracking-wide   "
                    >
                        <AnimatePresence>
                            {conversation.map((message) => (
                                message.isUser ? (
                                    <UserMessage key={message.id} message={message} />
                                ) : (
                                    <ModelMessage key={message.id} message={message}/>
                                )
                            ))}
                        </AnimatePresence>
                        <div ref={conversationEndRef}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
