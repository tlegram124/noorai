from typing import Optional, Dict, Any
# Mock classes for antigravity to avoid import errors since it's an external private pkg mentioned in user prompt
class Agent:
    def __init__(self, name: str):
        self.name = name

class Tool:
    def __init__(self, func, description: str):
        self.func = func
        self.description = description

class CustomerSupportAgent(Agent):
    def __init__(self, business_id: str):
        super().__init__(name="CustomerSupportAgent")
        self.business_id = business_id
        self.conversation_memory = {}

        self.tools = {
            "query_orders": Tool(
                func=self.query_orders,
                description="Retrieve order details by ID or customer phone."
            ),
            "send_whatsapp": Tool(
                func=self.send_whatsapp,
                description="Send a WhatsApp message to the customer."
            ),
        }

    async def query_orders(self, order_id: Optional[str] = None, phone: Optional[str] = None) -> Dict:
        return {"status": "shipped", "order_id": order_id}

    async def send_whatsapp(self, phone: str, message: str) -> bool:
        from app.services.whatsapp import send_whatsapp_message
        return await send_whatsapp_message(phone, message)

    async def handle_message(self, phone: str, message: str, conversation_id: str) -> str:
        # Mock logic
        context = self.conversation_memory.get(conversation_id, {})
        response = f"Thank you for your message: {message}. We are looking into it."
        self.conversation_memory[conversation_id] = {
            **context,
            "last_message": message,
            "last_response": response
        }
        await self.send_whatsapp(phone, response)
        return response
