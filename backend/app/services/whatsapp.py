import os
from twilio.rest import Client
from fastapi import Request, HTTPException

def get_twilio_client():
    account_sid = os.getenv("TWILIO_ACCOUNT_SID", "mock_sid")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN", "mock_token")
    # Return mock client if we are not actually having real credentials in env
    if account_sid == "mock_sid":
        class MockClient:
            class messages:
                @staticmethod
                def create(**kwargs):
                    print(f"Mock Twilio Send: {kwargs}")
                    return True
        return MockClient()
    return Client(account_sid, auth_token)

async def send_whatsapp_message(to: str, body: str) -> bool:
    """Send a WhatsApp message via Twilio."""
    client = get_twilio_client()
    try:
        from_number = os.getenv("TWILIO_WHATSAPP_NUMBER", "whatsapp:+14155238886")
        message = client.messages.create(
            body=body,
            from_=from_number,
            to=f"whatsapp:{to}"
        )
        return True
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Twilio error: {str(e)}")

async def verify_twilio_signature(request: Request) -> bool:
    """Verify Twilio request signature (security)."""
    # Skipping actual validation for mock purposes if env is missing
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    if not auth_token:
        return True

    from twilio.request_validator import RequestValidator
    validator = RequestValidator(auth_token)
    form_data = await request.form()
    url = str(request.url)
    signature = request.headers.get("X-Twilio-Signature", "")
    return validator.compute_signature(url, dict(form_data)) == signature
