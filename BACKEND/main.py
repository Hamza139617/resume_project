from pydantic import BaseModel
from fastapi import APIRouter
from .App.Modules.AI.interface import interface

class ChatRequest(BaseModel):
    message: str

router = APIRouter()

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    result = interface.run_chat_graph(request.message)
    return {"response": result}