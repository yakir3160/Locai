import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '@/src/store/chatStore';

interface UserMessageProps {
    message: Message;
}

export const UserMessage = ({ message }: UserMessageProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex"
        >
            <div className="p-4  flex gap-2  text-foreground border rounded-tr-none rounded-3xl border-orange-500/50 ml-auto overflow-hidden">
                {message.text}
            </div>
        </motion.div>
    );
};
