import { useState } from "react"
import { askChatbot } from "../api/chatApi"
import { motion, AnimatePresence } from "framer-motion"

const Chatbot = () => {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState("")

  const handleAsk = async () => {
    if (!question.trim()) return
    setLoading(true)
    const res = await askChatbot(question)
    setAnswer(res)
    setLoading(false)
  }

  return (
    <>
      {/* Floating Button Bottom Right */}
      <div
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition"
        onClick={() => setOpen(true)}
      >
        💬
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpen(false)}
            />

            {/* Center Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
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

                {/* Chat Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">

                  {loading && (
                    <div className="text-blue-600 animate-pulse">
                      Analyzing logs...
                    </div>
                  )}

                  {answer && (
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      {formatAnswer(answer)}
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask about errors, time range, services..."
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAsk}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Ask
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


/* ---------- Format Response ---------- */

function formatAnswer(answer: string) {
  const lines = answer.split("\n")

  return (
    <div className="space-y-2 text-sm">
      {lines.map((line, index) => {
        if (line.includes("Error") || line.includes("Failed")) {
          return (
            <div key={index} className="text-red-600 font-medium">
              {line}
            </div>
          )
        }

        if (line.includes("Warning")) {
          return (
            <div key={index} className="text-yellow-600 font-medium">
              {line}
            </div>
          )
        }

        return <div key={index}>{line}</div>
      })}
    </div>
  )
}