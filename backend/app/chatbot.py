from groq import Groq
from app.config import GROQ_API_KEY
from app.storage import logs_storage

client = Groq(api_key=GROQ_API_KEY)


def build_context_from_logs(question: str):

    question_lower = question.lower()
    matched_logs = []

    for log in logs_storage:

        message = str(log.get("message", "")).lower()
        level = str(log.get("level", "")).lower()
        service = str(log.get("service", "")).lower()

        if (
            question_lower in message
            or question_lower in level
            or question_lower in service
        ):
            matched_logs.append(log)

    matched_logs = matched_logs[:20]

    context = "\n".join(
        f"{log.get('timestamp')} | "
        f"{log.get('level')} | "
        f"{log.get('service')} | "
        f"{log.get('message')}"
        for log in matched_logs
    )

    return context


def ask_chatbot(question: str):

    context = build_context_from_logs(question)

    prompt = f"""
You are a cybersecurity log analysis assistant.

Here are relevant logs:
{context}

User question:
{question}

Analyze carefully and provide a clear answer.
Mention anomalies if found.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    return response.choices[0].message.content