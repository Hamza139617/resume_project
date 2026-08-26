from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from App.Persistence.database import get_db
from App.Modules.Chat.domain.models.conversation import Conversation
from App.Modules.Chat.infrastructure.db.repositories.conversation_repository import ConversationRepository
from App.Modules.Chat.schemas.conversation_schemas import ConversationOut, ChatRequest, MessageOut
from App.Modules.AI.interface import interface

router = APIRouter()

@router.post("/conversations", response_model=ConversationOut)
def create_conversation(db: Session = Depends(get_db)):
    repo = ConversationRepository(db)
    conversation = Conversation.create_new()
    return repo.create(conversation)


@router.get("/conversations", response_model=list[ConversationOut])
def list_conversations(db: Session = Depends(get_db)):
    repo = ConversationRepository(db)

    return repo.list_all()

@router.get("/conversations/{conversation_id}/messages", response_model=list[MessageOut])
def get_messages(conversation_id: str):
    return interface.get_conversation_messages(conversation_id)

@router.post("/chat")
def chat_endpoint(request: ChatRequest, db: Session = Depends(get_db)):
    result = interface.run_chat_graph(request.message, request.conversation_id)
    repo = ConversationRepository(db)
    repo.touch(request.conversation_id)
    return {"response": result}