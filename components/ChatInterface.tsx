import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToView } from "@/src/hooks/useScrollToView";

const ChatInterface = ({ conversation = [], showHistory = true }) => {
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

            <div className=" py-2 overflow-y-auto space-y-6 flex flex-col flex-grow content-center justify-end">
                <AnimatePresence mode="wait">
                    {!conversation.length ? (
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="text-center text-gray-600"
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
                            className="  w-full content-center overflow-y-auto p-6  space-y-6 rounded-3xl bg-pink-950/5 max-h-[calc(100vh-5rem)] md:max-h-[calc(100vh-15rem)]"
                        >
                            <AnimatePresence>
                                {conversation.map((message, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className={`p-4 my-2  whitespace-pre-line ${
                                            message.isUser
                                                ? 'text-foreground  border rounded-tl-none rounded-3xl border-orange-500/50'
                                                : ' bg-pink-950/5 border rounded-tr-none rounded-3xl border-pink-500/50 text-foreground'
                                        } max-w-fit`}
                                    >
                                        {message.text}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={conversationEndRef} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
    );
};

export default ChatInterface;