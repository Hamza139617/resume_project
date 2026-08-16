import { sendChatMessage } from "./Api/message";

sendChatMessage("hello").then(data => console.log(data))