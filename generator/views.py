
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import PostForm
from .models import Post
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")

async def generate_social_post(topic, tone):
    """
    Generate a social media post using OpenAI.
    """
    prompt = f"Generate a social media post about {topic} with a {tone} tone."
    try:
        response = openai.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7,
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"Error generating social media post: {str(e)}"


async def generate_ai_image(post_text):
    """
    Generate an AI image URL using DALL-E based on the post text.
    """
    try:
        response = openai.images.generate(
            model="dall-e-3",
            prompt=post_text,
            n=1,
            size="512x512"
        )
        return response.data[0].url
    except Exception as e:
        return f"Error generating AI image: {str(e)}"

def home(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            topic = form.cleaned_data['topic']
            tone = form.cleaned_data['tone']
            # Generate social media post
            social_post = generate_social_post(topic, tone)
            # Generate AI image
            image_url = generate_ai_image(await social_post)  # Ensure social_post is awaited
            # Create a Post instance in the database
            post = Post.objects.create(topic=topic, tone=tone, content=await social_post, image_url=image_url)
            return render(request, 'generator/result.html', {'post': post})
    else:
        form = PostForm()
    return render(request, 'generator/home.html', {'form': form})
