import { sendChatMessage } from "../../Api/message.js";


// helppr function

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
        attribute.value = "chat_messaage block w-fit text-center bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text ml-auto my-4 "
        
        
        humanMessage.setAttributeNode(attribute)
        humanMessage.textContent = searchText
        chatBox.appendChild(humanMessage)
        chatBox.scrollTop = chatBox.scrollHeight

        const typingIndicator = createTypingIndicator()
        chatBox.appendChild(typingIndicator)
        chatBox.scrollTop = chatBox.scrollHeight

        try{
            const data = await sendChatMessage(searchText)
            typingIndicator.remove()

            
            let aiMessaage = document.createElement("div")
            let aiAttribute = document.createAttribute("class")
            aiAttribute.value = "chat_message block max-w-2xl text-left bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text text-sm md:text-base leading-relaxed mr-auto my-4"
            aiMessaage.setAttributeNode(aiAttribute)
            aiMessaage.textContent = data.response
            chatBox.appendChild(aiMessaage)
            chatBox.scrollTop = chatBox.scrollHeight

        } catch( error ) {
            typingIndicator.remove()
            console.error("Faile to get response: ", error)
        }

    }else if(searchText != "" && greeting == null ) {



        let humanMessage = document.createElement("div")
        let attribute = document.createAttribute("class")
        attribute.value = "chat_message block w-fit text-center bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text ml-auto my-4 "
        humanMessage.setAttributeNode(attribute)
        humanMessage.textContent = searchText
        chatBox.appendChild(humanMessage)
        chatBox.scrollTop = chatBox.scrollHeight


                const typingIndicator = createTypingIndicator()
                chatBox.appendChild(typingIndicator)
                chatBox.scrollTop = chatBox.scrollHeight

        try{
            const data = await sendChatMessage(searchText)
            typingIndicator.remove()
            
            let aiMessaage = document.createElement("div")
            let aiAttribute = document.createAttribute("class")
            aiAttribute.value = "chat_message block max-w-2xl text-left bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text text-sm md:text-base leading-relaxed mr-auto my-4"
            aiMessaage.setAttributeNode(aiAttribute)
            aiMessaage.textContent = data.response
            chatBox.appendChild(aiMessaage)
            chatBox.scrollTop = chatBox.scrollHeight

        } catch( error ) {
            typingIndicator.remove()
            console.error("Faile to get response: ", error)
        }

    }
})