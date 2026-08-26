import { createConversation, fetchConversations, fetchConversationMessages } from "../../Api/conversations.js";
import { setCurrentConversation } from "../../State/currentConversation.js";


const logoBtn = document.getElementById('logo-btn')
const sidebar = document.getElementById('sidebar')
const sidebarText = sidebar.querySelectorAll('.nav-text')
const sidebarOverlay = document.getElementById('sidebarOverlay')

logoBtn.addEventListener('click', () => {
    sidebar.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-open');

    sidebarText.forEach((sideText) => {
        sideText.classList.toggle('text-hidden');
    });
});


sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-open');
    sidebarText.forEach((sideText) => {
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
    clearChatWindow();
})



export async function startNewChat() {
    const conversation = await createConversation();
    setCurrentConversation(conversation.id);
    clearChatWindow();       
    await refreshSidebar();
}



export async function openConversation(id) {
    setCurrentConversation(id);
    const messages = await fetchConversationMessages(id);
    renderMessages(messages);  
}


export async function renderSidebarList(conversations) {
    const conversation_list = document.getElementById("previous_chat");

    conversations.forEach(conversation => {
        let item = document.createElement("div")
        let attribute = document.createAttribute("class");
        attribute.value = "flex items-center gap-3 px-3 py-2 rounded-lg text-secondary-text hover:bg-teal/10 hover:text-body-text text-sm  transition-colors nav-text text-hidden font-medium";
        item.setAttributeNode(attribute);
        item.textContent = conversation.title;
        item.addEventListener("click", () => openConversation(conversation.id));
        conversation_list.appendChild(item);
    })

}




export async function refreshSidebar() {
    const conversations = await fetchConversations();
    renderSidebarList(conversations);
}





