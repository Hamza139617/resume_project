import uuid
from llama_index.core import VectorStoreIndex

_document_indexes: dict[str, VectorStoreIndex] = {}

def save_index(index: VectorStoreIndex) -> str:

    document_id = str(uuid.uuid4())
    _document_indexes[document_id] = index
    return document_id

def get_retriever(document_id: str, top_k: int = 3):

    if document_id not in _document_indexes:
        raise KeyError(f"No document found for id: {document_id}")

    return _document_indexes[document_id].as_retriever(similarity_top_k=top_k)

