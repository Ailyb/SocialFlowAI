'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {generateSocialPost, GenerateSocialPostOutput} from '@/ai/flows/generate-social-post';
import {useToast} from '@/hooks/use-toast';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useState, useCallback, useEffect} from 'react';
import {toast} from "@/hooks/use-toast";
import {postToLinkedIn, LinkedInPost} from "@/services/linkedin";
import {postToFacebook, FacebookPost} from "@/services/facebook";
import {postToTwitter, Tweet} from "@/services/twitter";
import {Icons} from '@/components/icons';
import { LucideIcon } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Copy } from "lucide-react";

import {ai} from '@/ai/ai-instance';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
  tone: z.string().min(2, {
    message: 'Tone must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export default function Home() {
  const [generatedPost, setGeneratedPost] = useState<GenerateSocialPostOutput | null>(null);
  const {toast} = useToast();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null); // Store the URL of the generated image
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      tone: '',
      email: '',
    },
  });

  const generateAIImage = useCallback(async (prompt: string): Promise<string | null> => {
   try {
     const response = await ai.callFlow('generateImageFlow', { prompt });
     return response.imageUrl;
   } catch (error: any) {
     console.error('Error generating AI image:', error);
     toast({
       variant: 'destructive',
       title: 'Error',
       description: error.message || 'Failed to generate AI image. Please try again.',
     });
     return null;
   }
  }, [toast]);

  const handleGenerateImage = useCallback(async () => {
   if (!generatedPost?.post) {
     toast({
       variant: 'destructive',
       title: 'Error',
       description: 'Please generate a social media post first.',
     });
     return;
   }
   setIsGeneratingImage(true);
   try {
     // Using the generatedPost.post as the prompt for image generation
     const imageUrl = await generateAIImage(generatedPost.post);
     if (imageUrl) {
       setGeneratedImage(imageUrl);
     }
   } finally {
     setIsGeneratingImage(false);
   }
  }, [generatedPost, generateAIImage, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const post = await generateSocialPost({topic: values.topic, tone: values.tone});
      setGeneratedPost(post);
      setGeneratedImage(null);
      toast({
        title: 'Post Generated!',
        description: 'Your social media post has been generated successfully.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to generate social media post. Please try again.',
      });
    }
  }

  const handleCopyToClipboard = useCallback(async (text: string, imageUrl: string | null) => {
    try {
      if (imageUrl) {
        // Fetch the image as a blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Create a new file from the blob
        const file = new File([blob], "image.png", {type: "image/png"});

        // Use the ClipboardItem API to copy both text and image
        const data = [
          new ClipboardItem({
            'text/plain': new Promise((resolve) => resolve(text)),
            'image/png': new Promise((resolve) => resolve(file)),
          })
        ];
        await navigator.clipboard.write(data);
      } else {
        await navigator.clipboard.writeText(text);
      }

      toast({
        title: 'Copied to clipboard!',
        description: 'The post content has been copied to your clipboard.',
      });
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to copy text to clipboard. Please try again.',
      });
    }
  }, [toast]);

  async function handlePostToLinkedIn() {
    if (!generatedPost?.post) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please generate a social media post first.',
      });
      return;
    }
  }

  async function handlePostToFacebook() {
    if (!generatedPost?.post) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please generate a social media post first.',
      });
      return;
    }
  }

  async function handlePostToTwitter() {
    if (!generatedPost?.post) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please generate a social media post first.',
      });
      return;
    }
  }

  return (
    <>
      
        
          
            
              Social Post Generator
              Generate AI Social Media Posts
            
            
              <Form {...form}>
                
                  
                    Topic
                  
                  
                    
                  
                  
                    What is the post about?
                  
                  
                
                
                  
                    Tone
                  
                  
                    
                  
                  
                    What is the desired tone of the post?
                  
                  
                
                
                  
                    Email
                  
                  
                    
                  
                  
                    Where should we notify you?
                  
                  
                
                
                  Generate Post
                
              
            </Form>
          
          {generatedPost && (
            
              
                
                  
                    {generatedImage && (
                      
                    )}
                    Copy to Clipboard
                    {isGeneratingImage ? (
                      
                    ) : (
                      
                        Add AI Generated Image
                      
                    )}
                  
                
               Post It
               
                  
                      LinkedIn
                    
                    
                      Facebook
                    
                    
                      X
                    
                    
                      Instagram
                    
                  
                
              
            
          )}
        
      
    </>
  );
}
