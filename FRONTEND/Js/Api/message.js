
// for sending the user query

async function sendChatMessage(message) {
    const response = await fetch("http://localhost:8000/chat", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message: message})
    });

    if (!response.ok){
        throw new Error(`Server error: ${response.status}`);

    }

    const data = await response.json()

    return data;
}