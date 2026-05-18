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
      { id: "#C-8921", phone: "+212 600 123 456", lastMsg: "My order ID is #12345.", time: "10:02 AM", status: "active", channel: "whatsapp" },
      { id: "#C-8920", phone: "+212 611 987 654", lastMsg: "Thank you so much!", time: "09:45 AM", status: "resolved", channel: "whatsapp" },
      { id: "#C-8919", phone: "+212 622 345 678", lastMsg: "I need to talk to a human.", time: "09:30 AM", status: "escalated", channel: "whatsapp" },
      
      { id: "#C-8918", phone: "Mehdi Alaoui", lastMsg: "Do you offer shipping to Casablanca?", time: "09:12 AM", status: "active", channel: "facebook" },
      { id: "#C-8917", phone: "Sarah Bensouda", lastMsg: "What is the price of the leather jacket?", time: "08:50 AM", status: "active", channel: "instagram" },
      
      { id: "#C-8916", phone: "+212 655 443 322", lastMsg: "Order #12344 has shipped successfully.", time: "Yesterday", status: "resolved", channel: "sms" },
      
      { id: "#C-8915", phone: "corporate@wasla.ai", lastMsg: "Requesting invoice for order #12343.", time: "May 16, 2026", status: "resolved", channel: "email" },
      
      { id: "#C-8914", phone: "Visitor #8812", lastMsg: "Hi! Do you have sizing charts?", time: "May 15, 2026", status: "active", channel: "livechat" },
      
      { id: "#C-8913", phone: "+212 677 889 900", lastMsg: "Voice Transcription: Check my shipment details.", time: "May 14, 2026", status: "escalated", channel: "voice" }
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
    if (conversationId === "#C-8915") {
      return [
        { id: "1", sender: "customer", content: "Dear Support, could you please send me the invoice for my order #12343?", timestamp: "10:00 AM" },
        { id: "2", sender: "ai", content: `Hello! Sure. (Offline Mode) The invoice for order #12343 has been automatically generated and sent to corporate@wasla.ai. You can also download it right now.`, timestamp: "10:01 AM" }
      ];
    } else if (conversationId === "#C-8913") {
      return [
        { id: "1", sender: "customer", content: "[Voice Call] Hello? I want to check my shipment details for order #12342.", timestamp: "09:00 AM" },
        { id: "2", sender: "ai", content: "[IVR Transcript] (Offline Mode) Your order #12342 is currently Confirmed and scheduled for courier pick up tomorrow.", timestamp: "09:01 AM" }
      ];
    } else if (conversationId === "#C-8918" || conversationId === "#C-8917") {
      return [
        { id: "1", sender: "customer", content: "Hi! I saw your post on social media and wanted to ask about this item.", timestamp: "08:48 AM" },
        { id: "2", sender: "ai", content: "Hi there! I can help you with that. Yes, we ship to all cities in Morocco including Casablanca, Rabat, Marrakech, and Tangier! Shipping is free for orders above 300 MAD.", timestamp: "08:50 AM" }
      ];
    } else if (conversationId === "#C-8916") {
      return [
        { id: "1", sender: "customer", content: "[SMS] Where is my order #12344?", timestamp: "Yesterday" },
        { id: "2", sender: "ai", content: "[SMS] Your order #12344 is currently 'Pending' and scheduled to ship tomorrow.", timestamp: "Yesterday" }
      ];
    } else if (conversationId === "#C-8914") {
      return [
        { id: "1", sender: "customer", content: "Hi! Do you have sizing charts for the activewear?", timestamp: "May 15" },
        { id: "2", sender: "ai", content: "Hello! Yes, our sizing chart is standard Moroccan/EU sizes. S fits 36-38, M fits 40-42, L fits 44-46. Let me know if you need specific measurements!", timestamp: "May 15" }
      ];
    }
    
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
