import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
const MODELS = [
    { name: "gpt-4-0125-preview", displayName: "GPT-4 Turbo", company: "OpenAI" },
    { name: "gpt-3.5-turbo", displayName: "GPT-3.5 Turbo", company: "OpenAI" },
    { name: "claude-3-opus-20240229", displayName: "Claude 3 Opus", company: "Anthropic" },
    { name: "claude-3-sonnet-20240229", displayName: "Claude 3 Sonnet", company: "Anthropic" },
    { name: "gemini-1.0-pro", displayName: "Gemini Pro", company: "Google" },
    { name: "mistral-medium", displayName: "Mistral Medium", company: "Mistral AI" },
    { name: "llama-2-70b", displayName: "LLaMA 2 70B", company: "Meta" },
];
export interface Message {
    id: string;
    text: string;
    isUser: boolean;
}
export interface Model {
    name: string;
    displayName: string;
    company: string;
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
    abortController: AbortController | null;
    models: Model[];
    selectedModel: Model;
    secondModel: Model;
    pinedSidebar: boolean;

    // Actions
    setModel: (model: Model) => void;
    setSecondModel: (model: Model) => void;
    setMultiModel: (value: boolean) => void;
    setIsOnline: (value: boolean) => void;
    setFactCheck: (value: boolean) => void;
    setInput: (value: string) => void;
    setConversation: (value: Message[]) => void;
    setIsLoading: (value: boolean) => void;
    addMessage: (message: Message) => void;
    setShowHistory: (value: boolean) => void;
    setPinedSidebar: (value: boolean) => void;
    setAbortController: (controller: AbortController | null) => void;

    // API Call
    sendMessage: (message: string) => Promise<void>;
    stopMessage: () => void;
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
    abortController: null,
    models: MODELS,
    selectedModel: MODELS[0],
    secondModel: MODELS[1],
    pinedSidebar: false,

    // Actions
    setModel : (value) => set({ selectedModel: value }),
    setSecondModel : (value) => set({ secondModel: value }),
    setMultiModel: (value) => set({ multiModel: value }),
    setIsOnline: (value) => set({ isOnline: value }),
    setFactCheck: (value) => set({ factCheck: value }),
    setInput: (value) => set({ input: value }),
    setConversation: (value) => set({ conversation: value }),
    setIsLoading: (value) => set({ isLoading: value }),
    setShowHistory: (value) => set({ showHistory: value }),
    setPinedSidebar: (value) => set({ pinedSidebar: value }),
    setAbortController: (controller) => set({ abortController: controller }),
    addMessage: (message) => set((state) => ({
        conversation: [...state.conversation, message]
    })),

    // API Call
    sendMessage: async (message: string) => {
        const store = get();
        if (!message.trim() || store.isLoading) return;

        const controller = new AbortController();
        store.setAbortController(controller);

        const userMessage: Message = {
            id: uuidv4(),
            text: message,
            isUser: true,
        };

        const botMessage: Message = {
            id: uuidv4(),
            text: "",
            isUser: false,
        };

        store.addMessage(userMessage);
        store.addMessage(botMessage);
        store.setInput("");
        store.setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: "user", content: message }]
                }),
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('No response body received');
            }

            const decoder = new TextDecoder();
            let accumulatedText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                accumulatedText += chunk;

                set((state) => ({
                    conversation: state.conversation.map((msg, index) =>
                        index === state.conversation.length - 1
                            ? { ...msg, text: accumulatedText }
                            : msg
                    )
                }));
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                return;
            } else {
                set((state) => ({
                    conversation: state.conversation.map((msg, index) =>
                        index === state.conversation.length - 1
                            ? { ...msg, text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}` }
                            : msg
                    )
                }));
            }
        } finally {
            store.setIsLoading(false);
            store.setAbortController(null);
        }
    },

    stopMessage: () => {
        const store = get();
        if (store.abortController) {
            store.abortController.abort();
            store.setAbortController(null);
        }
        store.setIsLoading(false);
    },
}));
