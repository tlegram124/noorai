import firebase_admin
from firebase_admin import auth, credentials
from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from app.database.models import Business

# We will initialize Firebase later in production properly.
# cred = credentials.Certificate("firebase-adminsdk.json")
# firebase_admin.initialize_app(cred)

security = HTTPBearer()

async def get_current_user(token=Depends(security)):
    """Validate Firebase JWT token."""
    try:
        # Mock implementation since we don't have a real token/firebase json yet
        # decoded_token = auth.verify_id_token(token.credentials)
        # uid = decoded_token["uid"]
        # user = auth.get_user(uid)
        user = {"uid": "mock-uid", "email": "admin@wasla.ai"}
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_business(user=Depends(get_current_user)):
    """Get business profile for the current user."""
    # Mock business retrieval
    return Business(id="123e4567-e89b-12d3-a456-426614174000", name="Mock Business")
