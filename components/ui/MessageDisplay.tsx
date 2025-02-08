import type { Message } from "ai"

interface MessageDisplayProps {
    messages: Message[]
}

export function MessageDisplay({ messages }: MessageDisplayProps) {
    return (
        <div className="space-y-4">
            {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
          <span
              className={`inline-block p-3 rounded-2xl max-w-md ${
                  m.role === "user"
                      ? " text-white"
                      : " text-custom-dark shadow"
              }`}
          >
            {m.content}
          </span>
                </div>
            ))}
        </div>
    )
}

