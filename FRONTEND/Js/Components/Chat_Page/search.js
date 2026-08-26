import { sendChatMessage } from "../../Api/message.js";
import { createConversation } from "../../Api/conversations.js";
import { currentConversationId, setCurrentConversation } from "../../State/currentConversation.js";
import { refreshSidebar } from "./navbar.js";

async function initChatPage() {
    await refreshSidebar();
}
initChatPage();

function createTypingIndicator() {
    const wrapper = document.createElement("div")
    let attr = document.createAttribute("class")
    attr.value = "block max-w-2xl bg-primary border border-teal/20 rounded-2xl px-4 py-3 mr-auto my-4"
    wrapper.setAttributeNode(attr)

    const dots = document.createElement("div")
    let dotsAttr = document.createAttribute("class")
    dotsAttr.value = "typing-dots"
    dots.setAttributeNode(dotsAttr)
    dots.innerHTML = "<span></span><span></span><span></span>"

    wrapper.appendChild(dots)
    return wrapper
}

function makeTitleFromMessage(text) {
    const trimmed = text.trim();
    const maxLength = 30;
    return trimmed.length > maxLength ? trimmed.slice(0, maxLength) + "..." : trimmed;
}

const input = document.getElementById("searchBox");
const form = document.getElementById("searchForm");
const chatBox = document.getElementById("chatArea");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const searchText = input.value;
    input.value = "";

    if (searchText === "") return;

    const greeting = chatBox.querySelector("#greeting");
    if (greeting != null) {
        greeting.remove();
    }

    let humanMessage = document.createElement("div");
    let attribute = document.createAttribute("class");
    attribute.value = "chat_message block w-fit text-center bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text ml-auto my-4 ";
    humanMessage.setAttributeNode(attribute);
    humanMessage.textContent = searchText;
    chatBox.appendChild(humanMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    const typingIndicator = createTypingIndicator();
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        let conversationId = currentConversationId;

        if (!conversationId) {
            const conversation = await createConversation(makeTitleFromMessage(searchText));
            conversationId = conversation.id;
            setCurrentConversation(conversationId);
            await refreshSidebar();
        }

        const data = await sendChatMessage(searchText, conversationId);
        typingIndicator.remove();

        let aiMessage = document.createElement("div");
        let aiAttribute = document.createAttribute("class");
        aiAttribute.value = "chat_message block max-w-2xl text-left bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text text-sm md:text-base leading-relaxed mr-auto my-4";
        aiMessage.setAttributeNode(aiAttribute);
        aiMessage.textContent = data.response;
        chatBox.appendChild(aiMessage);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        typingIndicator.remove();
        console.error("Failed to get response: ", error);
    }
});