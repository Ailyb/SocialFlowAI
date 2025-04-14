import google.generativeai as genai
from decouple import config
import firebase_admin
from firebase_admin import firestore
import asyncio

# Initialize Firebase Firestore
firebase_admin.initialize_app()
db = firestore.client()

async def generate_post(platform: str, tone: str, niche: str, keywords: list, max_length: int):
    # Configure Gemini
    genai.configure(api_key=config("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-1.5-pro")  # Use desired Gemini model

    # Fetch niche template from Firestore (RAG simulation)
    template_ref = db.collection("templates").document(niche)
    template_doc = template_ref.get()
    template = template_doc.to_dict().get("content", "Create a {platform} post in a {tone} tone for {niche} audience using keywords {keywords}.") if template_doc.exists else "Create a {platform} post in a {tone} tone for {niche} audience using keywords {keywords}."

    # Build prompt
    prompt = template.format(
        platform=platform,
        tone=tone,
        niche=niche,
        keywords=", ".join(keywords)
    ) + f" Keep it under {max_length} characters."

    # Generate post
    response = await asyncio.to_thread(model.generate_content, prompt)
    post = response.text.strip()

    # Ensure length constraint
    return post[:max_length]