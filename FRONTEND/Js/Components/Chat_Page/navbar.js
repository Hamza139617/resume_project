import { createConversation, fetchConversations, fetchConversationMessages } from "../../Api/conversations.js";
import { setCurrentConversation } from "../../State/currentConversation.js";


const logoBtn = document.getElementById('logo-btn')
const sidebar = document.getElementById('sidebar')

const sidebarOverlay = document.getElementById('sidebarOverlay')

logoBtn.addEventListener('click', () => {
    sidebar.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-open');

    sidebar.querySelectorAll('.nav-text').forEach((sideText) => {
        sideText.classList.toggle('text-hidden');
    });
});


sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-open');
    sidebar.querySelectorAll('.nav-text').forEach((sideText) => {
        sideText.classList.add('text-hidden');
    });
});

export async function clearChatWindow() {

    const chatBox = document.getElementById("chatArea");

    const chat_list = chatBox.querySelectorAll("div");

    chat_list.forEach(div => {
        div.remove();
    })

}


const newChatButton = document.getElementById("newChatButton");

newChatButton.addEventListener('click', () => {
    setCurrentConversation(null);
    clearChatWindow();
});


export async function startNewChat() {
    const conversation = await createConversation();
    setCurrentConversation(conversation.id);
    clearChatWindow();       
    await refreshSidebar();
}


function createHumanMessage(text)  {
    const div = document.createElement("div");
    div.className = "chat_message block w-fit text-center bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text ml-auto my-4";
    div.textContent = text;
    return div;
}

function createAiMessage(text) {
    const div = document.createElement("div");
    div.className = "chat_message block max-w-2xl text-left bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text text-sm md:text-base leading-relaxed mr-auto my-4";
    div.textContent = text;
    return div;
}

function renderMessages(messages) {
    const chatBox = document.getElementById("chatArea");
    clearChatWindow();

    messages.forEach(message => {
        const bubble = message.role === "human"
        ? createHumanMessage(message.content)
        : createAiMessage(message.content);
        chatBox.appendChild(bubble);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}


export async function openConversation(id) {
    setCurrentConversation(id);
    const messages = await fetchConversationMessages(id);
    renderMessages(messages);  
}


export async function renderSidebarList(conversations) {
    const conversation_list = document.getElementById("previous_chat");
    conversation_list.innerHTML = "";

    conversations.forEach(conversation => {
        const item = document.createElement("div");
        item.className = "flex items-center gap-3 px-3 py-2 rounded-lg text-secondary-text hover:bg-teal/10 hover:text-body-text text-sm transition-colors cursor-pointer my-1";

        const label = document.createElement("div");
        label.className = "nav-text text-hidden font-medium truncate";
        label.textContent = conversation.title;

        item.appendChild(label);
        item.addEventListener("click", () => openConversation(conversation.id));
        conversation_list.appendChild(item);
    });
}



export async function refreshSidebar() {
    const conversations = await fetchConversations();
    renderSidebarList(conversations);
}





