import { BASE_URL } from "./config.js";

export async function createConversation(title) {
    const response = await fetch(`${BASE_URL}/conversations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
        body: title ? JSON.stringify({ title }) : undefined,
    });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
}

export async function fetchConversations() {
    const response = await fetch(`${BASE_URL}/conversations`, {
        headers: { "ngrok-skip-browser-warning": "true" }
    });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
}

export async function fetchConversationMessages(id) {
    const response = await fetch(`${BASE_URL}/conversations/${id}/messages`, {
        headers: { "ngrok-skip-browser-warning": "true" }
    });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
}