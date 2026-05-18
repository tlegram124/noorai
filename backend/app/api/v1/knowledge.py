from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.core.security import get_current_business
from app.database.models import Business
# from app.services.rag import process_and_store_document

router = APIRouter(prefix="/knowledge", tags=["Knowledge Base"])

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    business: Business = Depends(get_current_business)
):
    """Upload and vectorize a document (PDF/DOCX/TXT) for RAG."""
    # 1. Validate file type
    if file.content_type not in ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"]:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # 2. Process and store in vector DB
    # doc_id = await process_and_store_document(file, business.id)
    doc_id = "mock-doc-id"

    return {"status": "success", "document_id": doc_id}
