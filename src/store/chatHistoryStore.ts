import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { useChatStore } from './chatStore'; // ייבוא של החנות הראשית

export interface Message {
    id: string;
    text: string;
    isUser: boolean;
}

export interface Chat {
    id: string;
    title: string;
    conversation: Message[];
}

interface ChatHistoryStore {
    chats: Chat[];
    activeChatId: string | null;
    isLoading: boolean;
    input: string;

    addChat: () => void;
    setActiveChat: (chatId: string) => void;
    addMessage: (message: Message) => void;
    deleteChat: (chatId: string) => void;
    syncChatsFromMainStore: () => void; // סינכרון עם חנות השיחות הראשית
}

export const useChatHistoryStore = create<ChatHistoryStore>((set, get) => ({
    chats: [],
    activeChatId: null,
    isLoading: false,
    input: "",

    // הוספת שיחה חדשה
    addChat: () => {
        const newChat: Chat = {
            id: uuidv4(),
            title: "New Chat",
            conversation: [],
        };

        set((state) => ({
            chats: [...state.chats, newChat],
            activeChatId: newChat.id,
        }));
    },

    // הגדרת השיחה הפעילה
    setActiveChat: (chatId) => set({ activeChatId: chatId }),

    // הוספת הודעה לשיחה הפעילה
    addMessage: (message) => {
        set((state) => {
            const updatedChats = state.chats.map((chat) =>
                chat.id === state.activeChatId
                    ? { ...chat, conversation: [...chat.conversation, message] }
                    : chat
            );
            return { chats: updatedChats };
        });
    },

    // מחיקת שיחה
    deleteChat: (chatId) => {
        set((state) => ({
            chats: state.chats.filter((chat) => chat.id !== chatId),
            activeChatId: state.activeChatId === chatId ? null : state.activeChatId,
        }));
    },

    // סינכרון עם חנות השיחות הראשית
    syncChatsFromMainStore: () => {
        const mainStoreChats = useChatStore.getState().conversation; // גישה לשיחות מהחנות הראשית
        const newChat: Chat = {
            id: uuidv4(),
            title: "Main Store Chat", // שם השיחה מתוך החנות הראשית
            conversation: mainStoreChats.map(msg => ({
                id: msg.id,
                text: msg.text,
                isUser: msg.isUser,
            })),
        };

        set((state) => ({
            chats: [...state.chats, newChat], // הוספת השיחה שנוצרה להיסטוריה
        }));
    },
}));
