from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.api.v1 import webhook, knowledge, analytics, conversations, orders

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Wasla AI API",
    description="Backend API for Wasla AI customer support platform.",
    version="1.0.0"
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Routers
app.include_router(webhook.router)
app.include_router(knowledge.router)
app.include_router(analytics.router)
app.include_router(conversations.router)
app.include_router(orders.router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}
