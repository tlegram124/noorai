import uuid
from sqlalchemy import Column, String, Text, DateTime, JSON, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID, JSONB, BYTEA
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func

Base = declarative_base()

class Business(Base):
    __tablename__ = "businesses"
    __table_args__ = {"schema": "wasla_ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    stripe_customer_id = Column(String(255))
    subscription_plan = Column(String(50), default='free')
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Conversation(Base):
    __tablename__ = "conversations"
    __table_args__ = {"schema": "wasla_ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    business_id = Column(UUID(as_uuid=True), ForeignKey("wasla_ai.businesses.id", ondelete="CASCADE"))
    customer_phone = Column(String(20), nullable=False)
    status = Column(String(50), default='open')
    language = Column(String(10), default='en')
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    business = relationship("Business")
    messages = relationship("Message", back_populates="conversation")

class Message(Base):
    __tablename__ = "messages"
    __table_args__ = {"schema": "wasla_ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("wasla_ai.conversations.id", ondelete="CASCADE"))
    sender = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    metadata_ = Column("metadata", JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    conversation = relationship("Conversation", back_populates="messages")

class Order(Base):
    __tablename__ = "orders"
    __table_args__ = {"schema": "wasla_ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    business_id = Column(UUID(as_uuid=True), ForeignKey("wasla_ai.businesses.id", ondelete="CASCADE"))
    customer_phone = Column(String(20), nullable=False)
    status = Column(String(50), default='pending')
    total_amount = Column(Numeric(10, 2))
    items = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class KnowledgeDocument(Base):
    __tablename__ = "knowledge_documents"
    __table_args__ = {"schema": "wasla_ai"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    business_id = Column(UUID(as_uuid=True), ForeignKey("wasla_ai.businesses.id", ondelete="CASCADE"))
    file_name = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)
    file_url = Column(String(512), nullable=False)
    vector_data = Column(BYTEA)
    metadata_ = Column("metadata", JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
