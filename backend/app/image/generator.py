from diffusers import StableDiffusionPipeline
import os

async def generate_image(text: str):
    pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
    image = pipe(text).images[0]
    image_path = f"static/images/{hash(text)}.png"
    image.save(image_path)
    return f"/{image_path}"