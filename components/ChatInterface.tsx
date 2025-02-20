import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToView } from "@/src/hooks/useScrollToView";
import { useChatStore } from "@/src/store/chatStore";
import { UserMessage } from '@/components/ui/custom/UserMessage';
import { ModelMessage } from '@/components/ui/custom/ModelMessage';

export const ChatInterface = () => {
    const { conversation, isLoading } = useChatStore();
    const conversationEndRef = useScrollToView(conversation);

    useEffect(() => {
        if (conversationEndRef.current) {
            conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation]);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
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
        <div className="py-2 overflow-y-auto  flex flex-col flex-grow content-center justify-end">
            <AnimatePresence mode="wait">
                {!conversation.length ? (
                    <motion.div
                        key="empty-state"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="text-center text-gray-600 "
                    >
                        Start a conversation by typing in the chat box below.
                    </motion.div>
                ) : (
                    <motion.div
                        key="chat-container"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full  content-center  pt-2 space-y-2  overflow-y-auto  max-h-[calc(100vh-5rem)] md:max-h-[calc(100vh-15rem)]"
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
