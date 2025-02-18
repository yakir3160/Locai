import {useEffect,useRef} from "react";
import {Message} from "@/src/types";

export const useScrollToView = (conversation:Message[]) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation]);

    return messagesEndRef;
}