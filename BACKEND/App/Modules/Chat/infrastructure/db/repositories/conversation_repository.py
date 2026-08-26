import datetime
from sqlalchemy.orm import Session

from App.Modules.Chat.domain.models.conversation import Conversation
from App.Modules.Chat.infrastructure.db.models.conversation_orm import ConversationORM


class ConversationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, conversation: Conversation) ->Conversation:
        row = ConversationORM(
            id=conversation.id,
            title=conversation.title,
            created_at=conversation.created_at,
            updated_at=conversation.updated_at,
            user_id=conversation.user_id,
        )

        self.db.add(row)
        self.db.commit()
        self.db.refresh(row)

        return conversation


    def list_all(self) -> list[Conversation]:
        rows = (
            self.db.query(ConversationORM)
            .order_by(ConversationORM.updated_at.desc())
            .all()
        )

        return [self._to_domain(r) for r in rows]

    def get_by_id(self, conversation_id: str) -> Conversation | None:
        row = self.db.query(ConversationORM).filter_by(id=conversation_id).first()

        return self._to_domain(row) if row else None

    def touch(self, conversation_id: str) -> None:

        row = self.db.query(ConversationORM).filter_by(id=conversation_id).first()

        if row:
            row.updated_at = datetime.datetime.now(datetime.timezone.utc)
            self.db.commit()

    def rename(self, conversation_id: str, title: str) -> None:
        row = self.db.query(ConversationORM).filter_by(id=conversation_id).first()
        if row:
            row.title = title
            self.db.commit()

    @staticmethod
    def _to_domain(row: ConversationORM) -> Conversation:
        return Conversation(
            id=row.id,
            title=row.title,
            created_at=row.created_at,
            updated_at=row.updated_at,
            user_id=row.user_id,
        )