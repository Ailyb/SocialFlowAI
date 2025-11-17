# SocialFlow AI

An AI-powered social media content generation platform that helps marketers, small businesses, and freelancers create engaging social media posts with customizable tone and scheduling capabilities.

## 🚀 Current Features

### Core Functionality
- **AI-Powered Post Generation**: Generate social media posts using Google Gemini AI with customizable topics and tones
- **Multi-Platform Support**: Ready-to-post integration for LinkedIn, Facebook, and Twitter
- **AI Image Generation**: Placeholder for AI-generated images to accompany posts
- **Real-time Preview**: Instant post preview with copy-to-clipboard functionality
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

### Technical Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, React 18
- **UI Components**: Tailwind CSS with shadcn/ui-derived components
- **Form Handling**: React Hook Form with Zod validation
- **AI Integration**: Genkit with Google Gemini for post generation
- **Legacy Backend**: Django 4 with OpenAI integration (alternative implementation)

## 📋 Architecture Overview

### Frontend Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main social post generator interface
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── icons.ts          # Social media platform icons
├── ai/                   # AI integration layer
│   ├── ai-instance.ts    # Genkit AI configuration
│   └── flows/           # AI workflow functions
├── services/            # Social media platform integrations
├── hooks/               # Custom React hooks
└── lib/                # Utility functions
```

### AI Workflows
- **generate-social-post.ts**: Creates social media posts from topic and tone inputs
- **generate-image.ts**: AI image generation workflow (placeholder implementation)
- **summarize-trending-topics.ts**: Trending topic analysis (ready for implementation)

### Social Media Integration
Currently implemented as stub services ready for API integration:
- LinkedIn posting service (`src/services/linkedin.ts`)
- Facebook posting service (`src/services/facebook.ts`) 
- Twitter posting service (`src/services/twitter.ts`)

## 🎯 Vision & Blueprint Goals

Based on the project blueprint, SocialFlow AI aims to become a comprehensive social media management platform with:

### Planned Features
- **User Authentication**: Firebase Auth with email/password, Google, and LinkedIn OAuth
- **Preference Dashboard**: Personalized settings for platforms, tones, keywords, and posting frequency
- **Post Scheduling**: Advanced scheduling system with email approval workflow
- **Niche Templates**: Industry-specific post templates for marketers, startups, and various professions
- **Analytics Dashboard**: Post engagement metrics and performance tracking
- **Subscription Model**: Tiered pricing with free and premium plans ($10-20/month)

### Business Model
- **Target Audience**: Small businesses, marketers, and freelancers
- **Revenue Streams**: Subscription-based model with free tier (5 posts/month)
- **Competitive Advantage**: AI-powered tone customization and niche-specific templates

## 🛣️ Next Development Steps

### Phase 1: Foundation (High Priority)
1. **User Authentication System**
   - Implement Firebase Auth integration
   - Create user registration/login pages
   - Set up Google and LinkedIn OAuth providers
   - Build user profile management

2. **Database Implementation**
   - Set up Firebase Firestore for user data
   - Create user preferences schema
   - Implement posts collection with status tracking
   - Design templates database for niche content

3. **Preferences Dashboard**
   - Build user settings interface
   - Platform selection (LinkedIn, Twitter, Facebook)
   - Tone and frequency preferences
   - Keyword and hashtag management

### Phase 2: Core Features (Medium Priority)
4. **Post Scheduling System**
   - Implement cron-like scheduling functionality
   - Build post queue management
   - Create calendar-based scheduling interface
   - Add time zone support

5. **Email Approval System**
   - Set up email notification service
   - Create approval workflow
   - Build one-click approval links
   - Implement email template system

6. **Real Social Media API Integration**
   - Replace stub services with actual API calls
   - Implement OAuth token management
   - Add error handling and retry logic
   - Create API rate limiting

### Phase 3: Advanced Features (Medium Priority)
7. **Content Templates System**
   - Design niche-specific templates
   - Implement template selection interface
   - Create template customization options
   - Add user-generated template support

8. **Analytics Dashboard**
   - Implement basic post metrics tracking
   - Create engagement analytics
   - Build performance reports
   - Add trend analysis features

### Phase 4: Business & Scale (Lower Priority)
9. **Subscription Management**
   - Implement payment processing (Stripe)
   - Create tiered access control
   - Build subscription management interface
   - Add usage tracking and limits

10. **Advanced AI Features**
    - Implement RAG for better template matching
    - Add multi-language support
    - Create A/B testing for posts
    - Implement sentiment analysis

## 🔧 Technical Debt & Improvements

### Immediate Needs
- Replace placeholder image generation with actual AI service
- Implement proper error boundaries and loading states
- Add comprehensive input validation and sanitization
- Set up proper TypeScript types throughout the application

### Performance Optimizations
- Implement code splitting for better loading times
- Add image optimization and lazy loading
- Set up caching strategies for AI responses
- Optimize bundle size and implement tree shaking

### Security Enhancements
- Implement proper CORS configuration
- Add rate limiting for API endpoints
- Set up content security policy
- Implement proper session management

## 📚 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Google Generative AI API key
- Firebase project configuration (for future features)

### Installation
```bash
# Clone the repository
git clone https://github.com/Ailyb/SocialFlowAI.git
cd SocialFlowAI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your GOOGLE_GENAI_API_KEY to .env

# Run development server
npm run dev

# Run Genkit development server (in separate terminal)
npm run genkit:dev
```

### Available Scripts
- `npm run dev`: Start Next.js development server on port 9002
- `npm run genkit:dev`: Start Genkit development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run typecheck`: Run TypeScript compiler

## 🤝 Contributing

This project is rapidly evolving toward the comprehensive vision outlined in the blueprint. Key areas needing contribution:

1. **Authentication**: Firebase Auth implementation
2. **Backend**: Database design and API development
3. **UI/UX**: Dashboard and settings interface design
4. **Integration**: Real social media API connections
5. **Testing**: Comprehensive test suite implementation

## 📄 License

This project is part of the SocialFlow AI platform and is currently in active development toward its full vision.

---

**Current Status**: MVP with AI post generation ✅  
**Next Milestone**: User authentication and database integration  
**Target Goal**: Full-featured social media management platform 🎯