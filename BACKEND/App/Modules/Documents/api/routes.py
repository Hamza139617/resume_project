import shutil
import uuid
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException

from ..application.document_processor import process_document

router = APIRouter(prefix="/documents", tags=["documents"])

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/upload")
async def upload_document(file: UploadFile = File()):

    destination = UPLOAD_DIR / f"{uuid.uuid4().hex}_{file.filename}"

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        document_id = process_document(str(destination))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to process document: {exc}")
    return {"document_id": document_id}