from fastapi import APIRouter, Request, HTTPException, Depends
from fastapi.responses import Response
from app.services.whatsapp import verify_twilio_signature
from app.services.channel_router import ChannelRouter
from app.services.voice import generate_ivr_menu_xml, generate_ivr_action_xml
import json
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/webhook", tags=["Omnichannel Webhooks"])

@router.post("/whatsapp")
async def twilio_webhook(request: Request):
    """
    Handle incoming WhatsApp messages from Twilio.
    """
    if not await verify_twilio_signature(request):
        raise HTTPException(status_code=403, detail="Invalid Twilio signature")

    form_data = await request.form()
    phone = form_data.get("From")
    message = form_data.get("Body")
    conversation_id = form_data.get("MessageSid", f"conv_wa_{phone}")

    # Centralized Channel Router
    router = ChannelRouter(business_id="mock-business-id")
    response = await router.route_incoming_message(
        channel="whatsapp",
        sender=phone,
        message=message,
        conversation_id=conversation_id
    )

    return Response(
        content=f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>{response}</Message>
</Response>""",
        media_type="text/xml"
    )

@router.post("/facebook")
async def facebook_webhook(request: Request):
    """
    Handle incoming Facebook Messenger and Instagram DM events from Meta Graph API.
    """
    try:
        body = await request.json()
        
        # Meta verification challenge
        if "hub.mode" in body and "hub.challenge" in body:
            return Response(content=body["hub.challenge"], media_type="text/plain")

        # Parse message payload
        entry = body.get("entry", [])[0]
        messaging = entry.get("messaging", [])[0]
        sender_id = messaging.get("sender", {}).get("id")
        message_text = messaging.get("message", {}).get("text")
        
        # Determine channel (Facebook Messenger vs. Instagram DM)
        channel = "instagram" if "instagram" in entry.get("id", "") else "facebook"
        conversation_id = f"conv_fb_{sender_id}"

        router = ChannelRouter(business_id="mock-business-id")
        await router.route_incoming_message(
            channel=channel,
            sender=sender_id,
            message=message_text,
            conversation_id=conversation_id
        )
        return {"status": "event_received"}
    except Exception as e:
        logger.exception("Error processing Facebook/Instagram webhook")
        return {"status": "error", "detail": str(e)}

@router.post("/sms")
async def sms_webhook(request: Request):
    """
    Handle incoming Twilio SMS text messages.
    """
    form_data = await request.form()
    phone = form_data.get("From")
    message = form_data.get("Body")
    conversation_id = form_data.get("MessageSid", f"conv_sms_{phone}")

    router = ChannelRouter(business_id="mock-business-id")
    response = await router.route_incoming_message(
        channel="sms",
        sender=phone,
        message=message,
        conversation_id=conversation_id
    )

    # Return Twilio SMS TwiML response
    return Response(
        content=f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>{response[:160]}</Message>
</Response>""",
        media_type="text/xml"
    )

@router.post("/email")
async def email_webhook(request: Request):
    """
    Handle incoming support emails (e.g. SendGrid Inbound Parse).
    """
    try:
        body = await request.json()
        from_email = body.get("from")
        message_body = body.get("text")
        subject = body.get("subject", "")
        conversation_id = f"conv_mail_{from_email}"

        router = ChannelRouter(business_id="mock-business-id")
        await router.route_incoming_message(
            channel="email",
            sender=from_email,
            message=f"{subject} - {message_body}",
            conversation_id=conversation_id
        )
        return {"status": "email_processed"}
    except Exception as e:
        logger.exception("Error processing Inbound Parse Email")
        return {"status": "error", "detail": str(e)}

@router.post("/voice")
async def voice_webhook():
    """
    Greet callers and route to voice IVR gather menu using Twilio Voice XML.
    """
    xml_content = await generate_ivr_menu_xml(language="en")
    return Response(content=xml_content, media_type="text/xml")

@router.post("/voice/gather")
async def voice_gather_webhook(request: Request):
    """
    Handle voice IVR DTMF input digits.
    """
    form_data = await request.form()
    digits = form_data.get("Digits", "")
    xml_content = await generate_ivr_action_xml(digit=digits, language="en")
    return Response(content=xml_content, media_type="text/xml")
