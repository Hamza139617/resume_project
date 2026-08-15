
const input = document.getElementById("searchBox");
const form = document.getElementById("searchForm");
const chatBox = document.getElementById("chatArea");





form.addEventListener("submit", function(event) {
    event.preventDefault();

    const searchText = input.value;

    input.value = ""

    greeting = chatBox.querySelector("#greeting")

    if(searchText != "" && greeting != null ) {
        
        greeting.remove()
        
        let humanMessage = document.createElement("div")
        let attribute = document.createAttribute("class")
        attribute.value = "block w-fit text-center bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text ml-auto my-4 "
        
        
        humanMessage.setAttributeNode(attribute)
        humanMessage.textContent = searchText
        chatBox.appendChild(humanMessage)



    }else if(searchText != "" && greeting == null ) {

        let humanMessage = document.createElement("div")
        let attribute = document.createAttribute("class")
        attribute.value = "block w-fit text-center bg-primary border border-teal/20 rounded-2xl px-4 py-3 text-body-text ml-auto my-4 "
        humanMessage.setAttributeNode(attribute)
        humanMessage.textContent = searchText
        chatBox.appendChild(humanMessage)

    }
})


