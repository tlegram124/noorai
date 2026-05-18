from typing import List, Dict
from sentence_transformers import SentenceTransformer
from fastapi import UploadFile
from sqlalchemy import select
from app.database.models import KnowledgeDocument
from app.database.session import async_session
from app.utils.language import detect_language

# Load multilingual embedding model (supports Arabic/French/English)
# This model will be downloaded automatically the first time it is run.
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

def extract_text_from_file(file: UploadFile) -> str:
    """Extract text from PDF, DOCX, or TXT."""
    # Placeholder for actual parsing logic (e.g. PyPDF2, python-docx)
    return "This is placeholder text extracted from the document."

def split_into_chunks(text: str, chunk_size: int = 512) -> List[str]:
    """Split text into manageable chunks."""
    # Simple character-based split for now
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

async def process_and_store_document(file: UploadFile, business_id: str) -> str:
    """Extract text from file, generate embeddings, and store in PostgreSQL."""
    text = extract_text_from_file(file)
    chunks = split_into_chunks(text, chunk_size=512)
    
    # Generate embeddings for each chunk
    embeddings = model.encode(chunks, show_progress_bar=False)

    async with async_session() as session:
        first_doc_id = None
        for chunk, embedding in zip(chunks, embeddings):
            doc = KnowledgeDocument(
                business_id=business_id,
                file_name=file.filename,
                file_type=file.content_type,
                file_url=f"local://{file.filename}",  # Mock S3 URL
                vector_data=embedding.tolist(),    
                metadata_={"language": detect_language(chunk), "chunk_text": chunk}
            )
            session.add(doc)
            # Just flush to get ID
            await session.flush()
            if first_doc_id is None:
                first_doc_id = str(doc.id)
        
        await session.commit()
        return first_doc_id or "empty-doc"

async def retrieve_knowledge(query: str, language: str, business_id: str, k: int = 3) -> List[Dict]:
    """Retrieve top-k relevant chunks from the knowledge base using vector search."""
    query_embedding = model.encode(query)

    async with async_session() as session:
        # Use pgvector's `<->` operator for cosine similarity
        filters = [KnowledgeDocument.business_id == business_id]
        if language:
            filters.append(KnowledgeDocument.metadata_['language'].astext == language)

        stmt = select(
            KnowledgeDocument.metadata_
        ).where(
            *filters
        ).order_by(
            KnowledgeDocument.vector_data.cosine_distance(query_embedding)
        ).limit(k)

        result = await session.execute(stmt)
        chunks = result.scalars().all()

        return [{"metadata": chunk} for chunk in chunks]
