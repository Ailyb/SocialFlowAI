
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import PostForm
from .models import Post
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")

async def generate_social_post(topic, tone, max_length):
    """
    Generate a social media post using OpenAI, ensuring the length is within the specified range.
    """
    min_length = int(max_length * 0.5)
    prompt = f"Generate a social media post about {topic} with a {tone} tone. The post should be between {min_length} and {max_length} characters."
    try:
        response = openai.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7,
        )
        post_content = response.choices[0].text.strip()
        
        # Ensure the generated post is within the length constraints
        if len(post_content) < min_length:
            prompt = f"Expand the following social media post to be at least {min_length} characters while maintaining the same topic and tone: {post_content}"
            response = openai.completions.create(
                model="gpt-3.5-turbo-instruct",
                prompt=prompt,
                max_tokens=200,
                n=1,
                stop=None,
                temperature=0.7,
            )
            post_content = response.choices[0].text.strip()
        elif len(post_content) > max_length:
            post_content = post_content[:max_length]
        
        return post_content
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
            max_length = form.cleaned_data['max_length']

            # Generate social media post
            social_post = await generate_social_post(topic, tone, max_length)

            # Generate AI image
            image_url = await generate_ai_image(social_post)  # Ensure social_post is awaited
            
            # Create a Post instance in the database
            post = Post.objects.create(topic=topic, tone=tone, content=social_post, image_url=image_url)
            return render(request, 'generator/result.html', {'post': post})
    else:
        form = PostForm()
    return render(request, 'generator/home.html', {'form': form})


    