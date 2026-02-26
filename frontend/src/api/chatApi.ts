import axios from "./axios"

export const askChatbot = async (question: string) => {
  const response = await axios.post("/chat", {
    question,
  })

  return response.data.answer
}