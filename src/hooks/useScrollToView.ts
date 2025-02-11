import {useEffect,useRef} from "react";
import {Message} from "ai";

export const useScrollToView = (messages:Message[]) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return messagesEndRef;
}