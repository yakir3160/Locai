import { create } from 'zustand';

export interface Message {
    id: string;
    text: string;
    isUser: boolean;
}

interface ChatStore {
    // State
    multiModel: boolean;
    isOnline: boolean;
    factCheck: boolean;
    input: string;
    conversation: Message[];
    isLoading: boolean;
    showHistory: boolean;

    // Actions
    setMultiModel: (value: boolean) => void;
    setIsOnline: (value: boolean) => void;
    setFactCheck: (value: boolean) => void;
    setInput: (value: string) => void;
    setConversation: (value: Message[]) => void;
    setIsLoading: (value: boolean) => void;
    addMessage: (message: Message) => void;
    setShowHistory: (value: boolean) => void;

    // API Call
    sendMessage: (message: string) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    // Initial state
    multiModel: false,
    isOnline: true,
    factCheck: false,
    input: "",
    conversation: [],
    isLoading: false,
    showHistory: false,

    // Actions
    setMultiModel: (value) => set({ multiModel: value }),
    setIsOnline: (value) => set({ isOnline: value }),
    setFactCheck: (value) => set({ factCheck: value }),
    setInput: (value) => set({ input: value }),
    setConversation: (value) => set({ conversation: value }),
    setIsLoading: (value) => set({ isLoading: value }),
    setShowHistory: (value) => set({ showHistory: value }),
    addMessage: (message) => set((state) => ({
        conversation: [...state.conversation, message]
    })),

    // API Call
    sendMessage: async (message: string) => {
        const store = get();

        if (!message.trim() || store.isLoading) {
            return;
        }

        const userMessage: Message = {
            id: crypto.randomUUID(),
            text: message,
            isUser: true,
        };

        const botMessage: Message = {
            id: crypto.randomUUID(),
            text: "",
            isUser: false,
        };

        // Add messages to conversation
        store.addMessage(userMessage);
        store.addMessage(botMessage);

        // Clear input and set loading state
        store.setInput("");
        store.setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: "user", content: message }]
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (!response.body) {
                throw new Error('No response body received');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedText = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value);
                accumulatedText += chunk;

                // Update the last message in the conversation
                set((state) => ({
                    conversation: state.conversation.map((msg, index) =>
                        index === state.conversation.length - 1
                            ? { ...msg, text: accumulatedText }
                            : msg
                    )
                }));
            }
        } catch (error) {
            // Update the last message with error
            set((state) => ({
                conversation: state.conversation.map((msg, index) =>
                    index === state.conversation.length - 1
                        ? { ...msg, text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}` }
                        : msg
                )
            }));
        } finally {
            store.setIsLoading(false);
        }
    }
}));