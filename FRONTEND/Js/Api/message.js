import { BASE_URL } from "./config.js";

export async function sendChatMessage(message, conversationId, documentId = null) {
    const response = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
        body: JSON.stringify({
            message,
            conversation_id: conversationId,
            document_id: documentId,
        }),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
}