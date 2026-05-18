import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Wasla AI",
      orders: "Orders",
      conversations: "Conversations",
      dashboard: "Dashboard",
      knowledge_base: "Knowledge Base",
      settings: "Settings",
      messages_7_days: "Messages (7 days)",
      ai_resolution_rate: "AI Resolution Rate",
      confirmed_orders: "Confirmed Orders",
      active: "Active",
      resolved: "Resolved",
      escalated: "Escalated",
      escalate: "Escalate",
      active_whatsapp: "Active WhatsApp Chat",
      search_conv: "Search conversations...",
      create_order: "Create Order",
      search_order: "Search by Order ID or Phone...",
      filter: "Filter",
      order_id: "Order ID",
      cust_phone: "Customer Phone",
      items: "Items",
      total_amount: "Total Amount",
      status: "Status",
      date: "Date",
      download_report: "Download Report",
      msg_activity: "Message Activity",
      type_msg: "Type a message to reply..."
    }
  },
  ar: {
    translation: {
      welcome: "مرحبا بكم في Wasla AI",
      orders: "الطلبات",
      conversations: "المحادثات",
      dashboard: "لوحة القيادة",
      knowledge_base: "قاعدة المعرفة",
      settings: "الإعدادات",
      messages_7_days: "الرسائل (7 أيام)",
      ai_resolution_rate: "معدل دقة الذكاء الاصطناعي",
      confirmed_orders: "الطلبات المؤكدة",
      active: "نشط",
      resolved: "تم حلها",
      escalated: "تم تصعيدها",
      escalate: "تصعيد",
      active_whatsapp: "دردشة واتساب نشطة",
      search_conv: "بحث في المحادثات...",
      create_order: "إنشاء طلب",
      search_order: "البحث عن طريق رقم الطلب أو الهاتف...",
      filter: "تصفية",
      order_id: "رقم الطلب",
      cust_phone: "هاتف العميل",
      items: "العناصر",
      total_amount: "المبلغ الإجمالي",
      status: "الحالة",
      date: "التاريخ",
      download_report: "تحميل التقرير",
      msg_activity: "نشاط الرسائل",
      type_msg: "اكتب رسالة للرد..."
    }
  },
  fr: {
    translation: {
      welcome: "Bienvenue sur Wasla AI",
      orders: "Commandes",
      conversations: "Conversations",
      dashboard: "Tableau de bord",
      knowledge_base: "Base de connaissances",
      settings: "Paramètres",
      messages_7_days: "Messages (7 jours)",
      ai_resolution_rate: "Taux de résolution IA",
      confirmed_orders: "Commandes confirmées",
      active: "Actif",
      resolved: "Résolu",
      escalated: "Escaladé",
      escalate: "Escalader",
      active_whatsapp: "Chat WhatsApp actif",
      search_conv: "Rechercher des conversations...",
      create_order: "Créer une commande",
      search_order: "Rechercher par ID ou Téléphone...",
      filter: "Filtrer",
      order_id: "ID Commande",
      cust_phone: "Téléphone Client",
      items: "Articles",
      total_amount: "Montant Total",
      status: "Statut",
      date: "Date",
      download_report: "Télécharger le Rapport",
      msg_activity: "Activité des Messages",
      type_msg: "Tapez un message pour répondre..."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
