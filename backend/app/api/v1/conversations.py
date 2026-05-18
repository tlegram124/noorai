from fastapi import APIRouter, Depends
from typing import List, Dict
from app.core.security import get_current_business
from app.database.models import Business

router = APIRouter(prefix="/conversations", tags=["Conversations"])

@router.get("")
async def get_conversations(business: Business = Depends(get_current_business)):
    """Retrieve all conversations for the business."""
    return [
        { "id": "#C-8921", "phone": "+212 600 123 456", "lastMsg": "My order ID is #12345.", "time": "10:02 AM", "status": "active" },
        { "id": "#C-8920", "phone": "+212 611 987 654", "lastMsg": "Thank you so much!", "time": "09:45 AM", "status": "resolved" },
        { "id": "#C-8919", "phone": "+212 622 345 678", "lastMsg": "I need to talk to a human.", "time": "09:30 AM", "status": "escalated" },
    ]

@router.get("/{conversation_id}/messages")
async def get_messages(conversation_id: str, business: Business = Depends(get_current_business)):
    """Retrieve messages in a conversation."""
    return [
        { "id": "1", "sender": "customer", "content": "Hello, I want to check my order status.", "timestamp": "10:00 AM" },
        { "id": "2", "sender": "ai", "content": "Hi there! I can help with that. Could you please provide your order ID or phone number?", "timestamp": "10:01 AM" },
        { "id": "3", "sender": "customer", "content": "My order ID is #12345.", "timestamp": "10:02 AM" },
        { "id": "4", "sender": "ai", "content": f"Thank you! Let me check conversation {conversation_id}... Your order #12345 is currently 'Shipped' and should arrive by tomorrow.", "timestamp": "10:02 AM" }
    ]
