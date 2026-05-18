import logging

logger = logging.getLogger(__name__)

async def generate_ivr_menu_xml(language: str = "en") -> str:
    """
    Generate XML instructions for Twilio Voice IVR menus, adapting to Arabic, French, or English.
    """
    if language == "ar":
        greeting = "مرحباً بكم في وصلة إي آي. اضغط واحد لتتبع طلبك، اضغط إثنان للتحدث مع ممثل الخدمة."
        digit_prompt = "يرجى إدخال رقم."
    elif language == "fr":
        greeting = "Bienvenue chez Wasla AI. Appuyez sur 1 pour le statut de votre commande, ou sur 2 pour joindre un conseiller."
        digit_prompt = "Veuillez entrer un numéro."
    else:
        greeting = "Welcome to Wasla AI. Press 1 for order status, or press 2 to reach a human support agent."
        digit_prompt = "Please enter a digit."

    xml_response = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="{ "ar-EG" if language == "ar" else "fr-FR" if language == "fr" else "en-US" }">{greeting}</Say>
    <Gather action="/webhook/voice/gather" numDigits="1" timeout="10">
        <Say voice="alice" language="{ "ar-EG" if language == "ar" else "fr-FR" if language == "fr" else "en-US" }">{digit_prompt}</Say>
    </Gather>
</Response>"""
    return xml_response

async def generate_ivr_action_xml(digit: str, language: str = "en") -> str:
    """
    Handle digits pressed in the IVR gather step.
    """
    xml_response = ""
    if digit == "1":
        prompt = "Please say or enter your order ID now." if language == "en" else "Veuillez dire ou entrer votre numéro de commande." if language == "fr" else "يرجى إدخال رقم طلبك الآن."
        xml_response = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="{ "ar-EG" if language == "ar" else "fr-FR" if language == "fr" else "en-US" }">{prompt}</Say>
    <Gather action="/webhook/voice/order-status" numDigits="5" timeout="10">
        <Say voice="alice" language="{ "ar-EG" if language == "ar" else "fr-FR" if language == "fr" else "en-US" }">Waiting for input.</Say>
    </Gather>
</Response>"""
    elif digit == "2":
        prompt = "Connecting you to an agent." if language == "en" else "Connexion avec un conseiller." if language == "fr" else "جاري تحويلك لممثل الخدمة."
        xml_response = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="{ "ar-EG" if language == "ar" else "fr-FR" if language == "fr" else "en-US" }">{prompt}</Say>
    <Dial>+212600123456</Dial>
</Response>"""
    else:
        prompt = "Invalid input. Let's try again." if language == "en" else "Saisie invalide. Recommençons." if language == "fr" else "رقم غير صحيح. فلنحاول مجدداً."
        xml_response = f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="{ "ar-EG" if language == "ar" else "fr-FR" if language == "fr" else "en-US" }">{prompt}</Say>
    <Redirect>/webhook/voice</Redirect>
</Response>"""
    
    return xml_response
