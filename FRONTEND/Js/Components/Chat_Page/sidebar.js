import { createConversation, fetchConversations, fetchConversationMessages } from "../../Api/conversations.js";
import { setCurrentConversation } from "../../State/currentConversation.js";

export async function startNewChat() {
    const conversation = await createConversation();
    setCurrentConversation(conversation.id);
    clearChatWindow();       
    await refreshSidebar();
}

export async function refreshSidebar() {
    const conversations = await fetchConversations();
    renderSidebarList(conversations);   
}

export async function openConversation(id) {
    setCurrentConversation(id);
    const messages = await fetchConversationMessages(id);
    renderMessages(messages);  
}