from fastapi import APIRouter, Depends
from app.database.models import Business
from app.core.security import get_current_business

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/overview")
async def get_analytics_overview(business: Business = Depends(get_current_business)):
    """Get high-level analytics for the dashboard."""
    # Mocking analytics data until DB session is fully implemented
    
    return {
        "message_volume": 1240,
        "ai_resolution_rate": 85.5,
        "confirmed_orders": 142,
    }
