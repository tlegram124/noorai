from fastapi import APIRouter, Request, HTTPException, Depends
from app.services.whatsapp import verify_twilio_signature
# Using a mock for the agent here to avoid import errors if the file isn't fully set up yet
# from app.agents.customer_support_agent import CustomerSupportAgent
from app.database.models import Business
from app.core.security import get_current_business

router = APIRouter(prefix="/webhook", tags=["WhatsApp"])

@router.post("/whatsapp")
async def twilio_webhook(
    request: Request
):
    """Handle incoming WhatsApp messages from Twilio."""
    # 1. Verify Twilio signature (security)
    if not await verify_twilio_signature(request):
        raise HTTPException(status_code=403, detail="Invalid signature")

    # 2. Parse message data
    form_data = await request.form()
    phone = form_data.get("From")
    message = form_data.get("Body")
    conversation_id = form_data.get("ConversationSid")

    # 3. Initialize agent for this business (mocked for now)
    # agent = CustomerSupportAgent(business_id="mock-business-id")
    # response = await agent.handle_message(phone, message, conversation_id)
    response = "This is a mock AI response from Wasla AI."

    # 5. Return Twilio-compatible XML response
    return f"""
    <Response>
        <Message>{response}</Message>
    </Response>
    """
