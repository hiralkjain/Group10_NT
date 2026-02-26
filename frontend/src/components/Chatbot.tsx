import { useState } from "react"
import { askChatbot } from "../api/chatApi"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare } from "lucide-react"

interface Message {
  role: "user" | "ai"
  content: string
}

const Chatbot = () => {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handleAsk = async () => {
    if (!question.trim()) return

    const userMessage: Message = {
      role: "user",
      content: question
    }

    setMessages(prev => [...prev, userMessage])
    setQuestion("")
    setLoading(true)

    const response = await askChatbot(question)

    const aiMessage: Message = {
      role: "ai",
      content: cleanResponse(response)
    }

    setMessages(prev => [...prev, aiMessage])
    setLoading(false)
  }

  return (
    <>
      {/* Floating Button */}
      <div
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition"
        onClick={() => setOpen(true)}
      >
        <MessageSquare size={24} />
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="w-[95%] md:w-[600px] h-[80%] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

                {/* Header */}
                <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                  <h2 className="font-semibold text-lg">
                    Log AI Assistant
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-xl"
                  >
                    ✖
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">

                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white border shadow-sm text-gray-800"
                        }`}
                      >
                        {formatAIMessage(msg.content)}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="text-gray-700 animate-pulse text-sm">
                      Thinking...
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask about logs..."
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAsk}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot

/* -------- Clean markdown stars -------- */

function cleanResponse(text: string) {
  return text.replace(/\*\*/g, "")
}

/* -------- Better formatting -------- */

function formatAIMessage(text: string) {
  const lines = text.split("\n")

  return (
    <div className="space-y-4 text-sm leading-relaxed">

      {lines.map((line, i) => {

        if (line.trim().endsWith(":")) {
          return (
            <div key={i} className="text-gray-700 font-semibold text-base mt-3">
              {line}
            </div>
          )
        }

        if (line.trim().startsWith("-")) {
          return (
            <div key={i} className="ml-4 text-gray-700">
              • {line.replace("-", "").trim()}
            </div>
          )
        }

        if (
          line.toLowerCase().includes("error") ||
          line.toLowerCase().includes("failed") ||
          line.toLowerCase().includes("denied")
        ) {
          return (
            <div key={i} className="text-gray-700 font-medium">
              {line}
            </div>
          )
        }

        return (
          <div key={i} className="text-gray-800">
            {line}
          </div>
        )
      })}
    </div>
  )
}