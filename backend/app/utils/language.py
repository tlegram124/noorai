from langdetect import detect

def detect_language(text: str) -> str:
    try:
        lang = detect(text)
        if lang in ["ar", "fr", "en"]:
            return lang
        return "en"  # Default to English
    except:
        return "en"
