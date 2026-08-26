import { BASE_URL } from "./config.js";

export async function createConversation() {
    const response = await fetch(`${BASE_URL}/conversations`, { method: "POST" });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
}

export async function fetchConversations() {
    const response = await fetch(`${BASE_URL}/conversations`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
}

export async function fetchConversationMessages(id) {
    const response = await fetch(`${BASE_URL}/conversations/${id}/messages`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
}