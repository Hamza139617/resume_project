import { fetchConversations } from "../../Api/conversations.js";

export async function renderHistorybar(conversations) {
    const conversation_list = document.getElementById("historybar");
    conversation_list.innerHTML = "";

    conversations.forEach(conversation => {
        const item = document.createElement("div");
        item.className = "history-item text-center";



        conversation_list.appendChild(item);
    });
}



export async function refreshHistoryBar() {
    const conversations = await fetchConversations();
    renderHistorybar(conversations);
}

refreshHistoryBar()


