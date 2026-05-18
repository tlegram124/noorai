from fastapi import APIRouter, Depends
from app.core.security import get_current_business
from app.database.models import Business

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.get("")
async def get_orders(business: Business = Depends(get_current_business)):
    """Retrieve all orders for the business."""
    return [
        { "id": "#12345", "customer": "+212 600 123 456", "amount": "MAD 450.00", "items": 2, "status": "Shipped", "date": "Today, 10:00 AM" },
        { "id": "#12344", "customer": "+212 611 987 654", "amount": "MAD 1,200.00", "items": 5, "status": "Pending", "date": "Yesterday" },
        { "id": "#12343", "customer": "+212 622 345 678", "amount": "MAD 320.00", "items": 1, "status": "Delivered", "date": "May 16, 2026" },
        { "id": "#12342", "customer": "+212 633 456 789", "amount": "MAD 890.00", "items": 3, "status": "Confirmed", "date": "May 15, 2026" },
    ]
