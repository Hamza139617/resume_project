import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional


@dataclass
class Conversation:
    id: str
    title: str
    created_at: datetime
    updated_at: datetime
    user_id: Optional[int] = None # for future Auth

    @staticmethod
    def create_new(title: str = "New Chat") -> "Conversation":
        now = datetime.now(timezone.utc)
        return Conversation(
            id=str(uuid.uuid4()),
            title=title,
            created_at=now,
            updated_at=now,
        )
