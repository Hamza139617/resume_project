# document_processor.py
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, Settings
from llama_index.core.node_parser import SentenceSplitter
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

from ..infrastructure.document_store import save_index

_embed_model = None

def _get_embed_model():
    global _embed_model
    if _embed_model is None:
        _embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
    return _embed_model


def process_document(file_path: str) -> str:
    Settings.embed_model = _get_embed_model()  # loads only on first real upload

    documents = SimpleDirectoryReader(input_files=[file_path]).load_data()
    splitter = SentenceSplitter(chunk_size=512, chunk_overlap=50)
    nodes = splitter.get_nodes_from_documents(documents)
    index = VectorStoreIndex(nodes)

    return save_index(index)