from datetime import datetime
from pydantic import BaseModel

class ConversationOut(BaseModel):

    id: str
    title: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    message: str
    conversation_id: str

class MessageOut(BaseModel):
    role: str
    content: str


class ConversationCreate(BaseModel):
    title: str | None = None