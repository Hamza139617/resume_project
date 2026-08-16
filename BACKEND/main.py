from pydantic import BaseModel
from fastapi import APIRouter

class ChatRequest(BaseModel):
    message: str

router = APIRouter()

@router.post("/chat")
async def chat_endpoint(request: ChatRequest)
    result = await run_chat_graph(request.message)
    return {"response": result}