# **App Name**: SocialFlow AI

## Core Features:

- User Authentication: User authentication and profile management using Firebase Auth (email/password, Google, LinkedIn OAuth).
- Preference Dashboard: Dashboard for setting post preferences (platform, tone, keywords, frequency) with a clear, intuitive interface.
- AI Post Generation: AI-powered post generation using niche-specific templates and user-defined tone, with a preview and editing interface.
- Post Scheduling: Scheduling and queuing posts using a cron-like system, with options to 'approve' posts via email.
- Social Media Integration: Direct posting to social media platforms (LinkedIn, Twitter, Facebook) through proxy API calls (OAuth).

## Style Guidelines:

- Primary color: White or light grey for a clean, professional look.
- Secondary color: A muted blue (#3498db) to convey trust and reliability.
- Accent: A vibrant teal (#008080) for call-to-action buttons and highlights.
- Clean, card-based layout for post previews and scheduling.
- Use clear and recognizable icons for social media platforms and post actions.
- Subtle transitions and animations for a smooth user experience.

## Original User Request:
My goal is to build a semi-passive, subscription-based OR ad based web app called “SocialPostGenerator” that auto-generates posts for LinkedIn and other social media platforms (e.g., Twitter, Facebook).  I want to differentiate it from competitors like Hootsuite or Buffer by offering AI-powered tone customization and niche-specific templates (e.g., for marketers, startups).
Please create a full-stack web application with the following requirements:
App Overview:
Purpose: Users sign up, set preferences (platform, tone, frequency), and receive AI-generated social media posts, which they can edit, schedule, or post directly after clicking on an 'approve' or 'post' button. Users should be able to sign up to receive emails to 'approve' of the posts. 

Business Model: Subscription-based ($10-$20/month per user), with a free tier (e.g., 5 posts/month).

Target Audience: Small businesses, marketers, and freelancers.

Front-End:
Framework: React (TypeScript preferred for maintainability).

Features:
User authentication (email/password, Google, LinkedIn OAuth).

Dashboard to set post preferences (platform, tone, keywords, frequency).

Post preview and editing interface (markdown support, drag-and-drop scheduling).

Responsive design for desktop and mobile.

Optimize for performance (lazy loading, code splitting).

Include basic analytics (e.g., post engagement metrics, if available via APIs).

Back-End:
Framework: Python FastAPI for API endpoints, integrated with Firebase for authentication and storage.

Features:
API endpoints for user management, post generation, and scheduling.

Integration with an LLM (use a placeholder for my local LLM deployment, e.g., LLaMA or a fine-tuned model, via RAG for niche templates).

Generate posts based on user preferences (e.g., “professional tone for LinkedIn, 100-150 words”).

Queue and schedule posts using a cron-like system.

Proxy calls to social media APIs (LinkedIn, Twitter, etc.) for direct posting (use OAuth tokens).

Ensure security (input validation, rate limiting, CORS).

Database:
users: Store user ID, email, preferences (platform, tone, frequency), subscription status.

posts: Store user ID, platform, content, status (draft, scheduled, posted), timestamp.

templates: Store niche-specific prompt templates for LLM (e.g., “startup founder pitch”).

Optimize queries for fast retrieval (indexes on user_id, timestamp).

Secure with rules: Only authenticated users access their own data.

LLM Integration:
Create a FastAPI endpoint to call the LLM with user inputs (tone, platform, keywords).

Use RAG techniques to pull from a template database for better post relevance.

Cache LLM outputs in Firestore to reduce costs and latency.
  