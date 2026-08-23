import { sendChatMessage } from "../../Api/message.js";

const input = document.getElementById("searchBox");
const form = document.getElementById("searchForm");
const chatBox = document.getElementById("chatArea");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const searchText = input.value;

    input.value = ""

    let greeting = chatBox.querySelector("#greeting")

    if(searchText != "" && greeting != null ) {
        
        greeting.remove()
        
        let humanMessage = document.createElement("div")
        let attribute = document.createAttribute("class")
        attribute.value = "block w-fit text-center bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text ml-auto my-4 "
        
        
        humanMessage.setAttributeNode(attribute)
        humanMessage.textContent = searchText
        chatBox.appendChild(humanMessage)
        chatBox.scrollTop = chatBox.scrollHeight

        try{
            const data = await sendChatMessage(searchText)
            
            let aiMessaage = document.createElement("div")
            let aiAttribute = document.createAttribute("class")
            aiAttribute.value = "block w-fit text-center bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text ml-auto my-4 "
            aiMessaage.setAttributeNode(aiAttribute)
            aiMessaage.textContent = data.response
            chatBox.appendChild(aiMessaage)
            chatBox.scrollTop = chatBox.scrollHeight

        } catch( error ) {
            console.error("Faile to get response: ", error)
        }

    }else if(searchText != "" && greeting == null ) {

        let humanMessage = document.createElement("div")
        let attribute = document.createAttribute("class")
        attribute.value = "block w-fit text-center bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text ml-auto my-4 "
        humanMessage.setAttributeNode(attribute)
        humanMessage.textContent = searchText
        chatBox.appendChild(humanMessage)
        chatBox.scrollTop = chatBox.scrollHeight

        try{
            const data = await sendChatMessage(searchText)
            
            let aiMessaage = document.createElement("div")
            let aiAttribute = document.createAttribute("class")
            aiAttribute.value = "block w-fit text-center bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text ml-auto my-4  "
            aiMessaage.setAttributeNode(aiAttribute)
            aiMessaage.textContent = data.response
            chatBox.appendChild(aiMessaage)
            chatBox.scrollTop = chatBox.scrollHeight

        } catch( error ) {
            console.error("Faile to get response: ", error)
        }

    }
})