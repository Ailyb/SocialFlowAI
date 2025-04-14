from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import APIKeyHeader
from pydantic import BaseModel
from app.llm.generator import generate_post
from app.image.generator import generate_image
from app.services.firebase import verify_user
from app.services.social import post_to_platform
import os

app = FastAPI()
api_key_header = APIKeyHeader(name="X-API-Key")

class PostRequest(BaseModel):
    platform: str
    tone: str
    niche: str
    keywords: list[str]
    max_length: int = 200

class PostResponse(BaseModel):
    text: str
    image_url: str | None

def verify_api_key(api_key: str = Depends(api_key_header)):
    if api_key != os.getenv("API_KEY"):
        raise HTTPException(status_code=403, detail="Invalid API key")
    return api_key

@app.post("/generate", response_model=PostResponse)
async def generate_social_post(request: PostRequest, user=Depends(verify_user)):
    post_text = await generate_post(
        platform=request.platform,
        tone=request.tone,
        niche=request.niche,
        keywords=request.keywords,
        max_length=request.max_length
    )
    image_url = await generate_image(post_text)
    return {"text": post_text, "image_url": image_url}

@app.post("/post/{platform}")
async def post_content(platform: str, post: PostResponse, user=Depends(verify_user)):
    post_to_platform(platform, post.text, post.image_url)
    return {"status": "posted"}