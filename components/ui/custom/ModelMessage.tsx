import { Message } from "@/src/types";
export const ModelMessage = ({ message }: { message: Message }) => {
    return (
        <div className="flex items-center space-x-2">
            <div className="flex-grow">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{message.name}</h3>
                    <span className="text-sm text-gray-500">{message.time}</span>
                </div>
                <p className="text-base">{message.text}</p>
            </div>
        </div>
    );
}