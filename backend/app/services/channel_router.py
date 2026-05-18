import logging
from typing import Optional, Dict, Any
from app.agents.customer_support_agent import CustomerSupportAgent
from app.services.facebook import send_facebook_message
from app.services.sms import send_sms_twilio, send_sms_maroc_telecom
from app.services.email import send_email_sendgrid
from app.services.voice import generate_ivr_action_xml

logger = logging.getLogger(__name__)

class ChannelRouter:
    def __init__(self, business_id: str, configs: Optional[Dict[str, Any]] = None):
        self.business_id = business_id
        self.agent = CustomerSupportAgent(business_id=business_id)
        # Dynamic channel configurations
        self.configs = configs or {
            "facebook_page_token": "mock-fb-token",
            "twilio_account_sid": "mock-twilio-sid",
            "twilio_auth_token": "mock-twilio-token",
            "twilio_phone_number": "+1234567890",
            "sendgrid_api_key": "mock-sg-key",
            "maroc_telecom_api_key": "mock-mt-key"
        }

    async def route_incoming_message(self, channel: str, sender: str, message: str, conversation_id: str) -> str:
        """
        Route incoming messages from any channel to the shared GenAI Agent,
        retrieve RAG semantic replies, and dispatch the response through the matching channel driver.
        """
        logger.info(f"Incoming omnichannel message on {channel} from {sender}: {message}")

        # 1. Process inquiry through the shared GenAI agent
        ai_response = await self.agent.handle_message(
            phone=sender if channel in ["whatsapp", "sms", "voice"] else "omnified-customer",
            message=message,
            conversation_id=conversation_id
        )

        # 2. Dispatch response through the matching channel gateway
        if channel == "whatsapp":
            # Already handled by agent's send_whatsapp helper internally
            pass
            
        elif channel == "facebook" or channel == "instagram":
            fb_token = self.configs.get("facebook_page_token")
            await send_facebook_message(recipient_id=sender, message=ai_response, page_token=fb_token)
            
        elif channel == "sms":
            # For SMS we prefer short, direct text
            truncated_sms = ai_response[:160]
            twilio_sid = self.configs.get("twilio_account_sid")
            twilio_token = self.configs.get("twilio_auth_token")
            twilio_from = self.configs.get("twilio_phone_number")
            
            # Check for local Moroccan phone number prefix (+212)
            if sender.startswith("+212"):
                mt_key = self.configs.get("maroc_telecom_api_key")
                await send_sms_maroc_telecom(to_number=sender, message=truncated_sms, api_key=mt_key)
            else:
                await send_sms_twilio(
                    to_number=sender,
                    from_number=twilio_from,
                    message=truncated_sms,
                    account_sid=twilio_sid,
                    auth_token=twilio_token
                )
                
        elif channel == "email":
            sg_key = self.configs.get("sendgrid_api_key")
            subject = f"Support Update - Ticket {conversation_id}"
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <div style="border-bottom: 2px solid #3B82F6; padding-bottom: 10px; margin-bottom: 20px;">
                        <h2 style="color: #3B82F6; margin: 0;">Wasla AI Customer Service</h2>
                    </div>
                    <p>{ai_response}</p>
                    <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; font-size: 12px; color: #777;">
                        You received this because you initiated an inquiry with our store. Replying directly is supported.
                    </div>
                </body>
            </html>
            """
            await send_email_sendgrid(to_email=sender, subject=subject, html_content=html_body, api_key=sg_key)
            
        elif channel == "livechat":
            # For web live chat we return response directly to WebSocket listener
            pass
            
        else:
            logger.error(f"Unsupported channel routing requested: {channel}")
            
        return ai_response
