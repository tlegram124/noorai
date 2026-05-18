import requests
import logging

logger = logging.getLogger(__name__)

FACEBOOK_API_URL = "https://graph.facebook.com/v18.0/me/messages"

async def send_facebook_message(recipient_id: str, message: str, page_token: str) -> dict:
    """
    Send an AI reply back via Facebook Messenger or Instagram DMs using the Page Access Token.
    """
    if not page_token:
        logger.error("Missing Facebook Page Access Token.")
        return {"error": "Page access token is missing"}

    payload = {
        "recipient": {"id": recipient_id},
        "message": {"text": message},
        "messaging_type": "RESPONSE"
    }
    
    headers = {
        "Authorization": f"Bearer {page_token}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(FACEBOOK_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logger.exception("Error sending message via Facebook Graph API")
        return {"error": str(e)}

async def handle_facebook_webhook(data: dict) -> dict:
    """
    Process incoming messages from Facebook Messenger and Instagram DM webhooks.
    """
    try:
        entry = data.get("entry", [])[0]
        messaging = entry.get("messaging", [])[0]
        sender_id = messaging.get("sender", {}).get("id")
        message_text = messaging.get("message", {}).get("text")
        
        return {
            "sender_id": sender_id,
            "message": message_text,
            "channel": "facebook" if "message" in messaging else "instagram"
        }
    except Exception as e:
        logger.error(f"Error parsing Facebook/Instagram webhook: {e}")
        return {}
