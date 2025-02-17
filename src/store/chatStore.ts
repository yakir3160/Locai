import { create } from 'zustand';
import { Message } from '@/types';

interface ChatStore {
    // State
    multiModel: boolean;
    isOnline: boolean;
    factCheck: boolean;
    input: string;
    conversation: Message[];
    isLoading: boolean;

    // Actions
    setMultiModel: (value: boolean) => void;
    setIsOnline: (value: boolean) => void;
    setFactCheck: (value: boolean) => void;
    setInput: (value: string) => void;
    setConversation: (value: Message[]) => void;
    setIsLoading: (value: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    // Initial state
    multiModel: false,
    isOnline: true,
    factCheck: false,
    input: "",
    conversation: [],
    isLoading: false,

    // Actions
    setMultiModel: (value) => set({ multiModel: value }),
    setIsOnline: (value) => set({ isOnline: value }),
    setFactCheck: (value) => set({ factCheck: value }),
    setInput: (value) => set({ input: value }),
    setConversation: (value) => set({ conversation: value }),
    setIsLoading: (value) => set({ isLoading: value }),
}));