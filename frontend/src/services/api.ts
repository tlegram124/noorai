const API_BASE = "http://localhost:8000";

export const fetchAnalytics = async () => {
  try {
    const res = await fetch(`${API_BASE}/analytics/overview`, {
      headers: {
        Authorization: "Bearer mock-token"
      }
    });
    if (!res.ok) throw new Error("Failed to fetch analytics");
    return await res.json();
  } catch (err) {
    console.warn("FastAPI backend offline. Falling back to local demo mock data.", err);
    return {
      message_volume: 1240,
      ai_resolution_rate: 85.5,
      confirmed_orders: 142
    };
  }
};

export const fetchConversations = async () => {
  try {
    const res = await fetch(`${API_BASE}/conversations`, {
      headers: {
        Authorization: "Bearer mock-token"
      }
    });
    if (!res.ok) throw new Error("Failed to fetch conversations");
    return await res.json();
  } catch (err) {
    console.warn("FastAPI backend offline. Falling back to local demo mock data.", err);
    return [
      { id: "#C-8921", phone: "+212 600 123 456", lastMsg: "My order ID is #12345.", time: "10:02 AM", status: "active" },
      { id: "#C-8920", phone: "+212 611 987 654", lastMsg: "Thank you so much!", time: "09:45 AM", status: "resolved" },
      { id: "#C-8919", phone: "+212 622 345 678", lastMsg: "I need to talk to a human.", time: "09:30 AM", status: "escalated" },
    ];
  }
};

export const fetchMessages = async (conversationId: string) => {
  try {
    const res = await fetch(`${API_BASE}/conversations/${encodeURIComponent(conversationId)}/messages`, {
      headers: {
        Authorization: "Bearer mock-token"
      }
    });
    if (!res.ok) throw new Error("Failed to fetch messages");
    return await res.json();
  } catch (err) {
    console.warn("FastAPI backend offline. Falling back to local demo mock data.", err);
    return [
      { id: "1", sender: "customer", content: "Hello, I want to check my order status.", timestamp: "10:00 AM" },
      { id: "2", sender: "ai", content: "Hi there! I can help with that. Could you please provide your order ID or phone number?", timestamp: "10:01 AM" },
      { id: "3", sender: "customer", content: "My order ID is #12345.", timestamp: "10:02 AM" },
      { id: "4", sender: "ai", content: `Thank you! (Offline Mode) Your order #12345 is currently 'Shipped' and should arrive by tomorrow.`, timestamp: "10:02 AM" }
    ];
  }
};

export const fetchOrders = async () => {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: {
        Authorization: "Bearer mock-token"
      }
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return await res.json();
  } catch (err) {
    console.warn("FastAPI backend offline. Falling back to local demo mock data.", err);
    return [
      { id: "#12345", customer: "+212 600 123 456", amount: "MAD 450.00", items: 2, status: "Shipped", date: "Today, 10:00 AM" },
      { id: "#12344", customer: "+212 611 987 654", amount: "MAD 1,200.00", items: 5, status: "Pending", date: "Yesterday" },
      { id: "#12343", customer: "+212 622 345 678", amount: "MAD 320.00", items: 1, status: "Delivered", date: "May 16, 2026" },
      { id: "#12342", customer: "+212 633 456 789", amount: "MAD 890.00", items: 3, status: "Confirmed", date: "May 15, 2026" },
    ];
  }
};
