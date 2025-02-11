
export interface Message {
    id: string
    text: string;
    isUser: boolean;
}
export interface Chat {
    id: string;
    messages: Message[];
}