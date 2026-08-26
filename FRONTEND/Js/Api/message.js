import { BASE_URL } from "./config.js";


export async function sendChatMessage(message, conversationId) {
 
    const response = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, conversation_id: conversationId }),
 
    });
 
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
 
 
    return await response.json();
}