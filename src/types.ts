// types.ts
export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
}
export interface Chat {
    id: string;
    messages: Message[];
}