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
import {useEffect, useState} from 'react';
import {toast} from "@/hooks/use-toast";
import {postToLinkedIn, LinkedInPost} from "@/services/linkedin";
import {postToFacebook, FacebookPost} from "@/services/facebook";
import {postToTwitter, Tweet} from "@/services/twitter";
import { Icons } from '@/components/icons';
import { Checkbox } from "@/components/ui/checkbox"
import {generateImage, GenerateImageOutput} from '@/ai/flows/generate-image';
 
 const formSchema = z.object({
    topic: z.string().min(2, {
      message: "Topic must be at least 2 characters.",
    }),
  });
 
 function copyToClipboard(text: string) {
   navigator.clipboard.writeText(text)
     .then(() => {
       toast({
         title: "Copied to clipboard!",
         description: "Ready to paste.",
       });
     })
     .catch(err => {
       toast({
         title: "Error copying to clipboard!",
         description: err.message,
         variant: "destructive",
       });
     });
 }
 
 export default function Home() {
   const [generatedPost, setGeneratedPost] = useState<GenerateSocialPostOutput | null>(null);
   const [generatedImage, setGeneratedImage] = useState<string | null>(null);
   const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       topic: "",
     },
   });
 
   async function onSubmit(values: z.infer<typeof formSchema>) {
     try {
       const response = await generateSocialPost({
         topic: values.topic,
         tone: "professional", // Default tone for now
       });
       setGeneratedPost(response);
     } catch (error: any) {
       toast({
         title: "Error generating post!",
         description: error.message,
         variant: "destructive",
       });
     }
   }
 
  async function generateAIImage(postText: string): Promise<string> {
    try {
       const response = await generateImage({
         prompt: postText,
       });
       if (response && response.imageUrl) {
         return response.imageUrl;
       } else {
         toast({
           title: "Error generating image!",
           description: "Failed to generate image. Please try again.",
           variant: "destructive",
         });
         return "";
       }
     } catch (error: any) {
       toast({
         title: "Error generating image!",
         description: error.message,
         variant: "destructive",
       });
       return "";
     }
   }
 
   const handleGenerateImage = async () => {
     if (!generatedPost) {
       toast({
         title: "Generate a post first!",
         description: "Please generate a social media post before generating an image.",
         variant: "destructive",
       });
         return;
       }
 
       // Using the generatedPost.post as the prompt for image generation
       const imageUrl = await generateAIImage(generatedPost.post); // Replace generateAIImage with your actual function
 
       setGeneratedImage(imageUrl);
    };
 
    useEffect(() => {
     if (generatedPost) {
       console.log("Generated Post:", generatedPost.post); // Debugging line
     }
   }, [generatedPost]);
 
   const handleLinkedInPost = async () => {
     if (!generatedPost) {
       toast({
         title: "Generate a post first!",
         description: "Please generate a social media post before posting.",
         variant: "destructive",
       });
       return;
     }
 
     try {
       // Replace 'YOUR_LINKEDIN_AUTH_TOKEN' with the actual user's LinkedIn OAuth token
       const linkedInPost = await postToLinkedIn(generatedPost.post, 'YOUR_LINKEDIN_AUTH_TOKEN');
       toast({
         title: "Posted to LinkedIn!",
         description: `Successfully posted: ${linkedInPost.content}`,
       });
     } catch (error: any) {
       toast({
         title: "Error posting to LinkedIn!",
         description: error.message,
         variant: "destructive",
       });
     }
   };
 
   const handleFacebookPost = async () => {
     if (!generatedPost) {
       toast({
         title: "Generate a post first!",
         description: "Please generate a social media post before posting.",
         variant: "destructive",
       });
       return;
     }
 
     try {
       // Replace 'YOUR_FACEBOOK_AUTH_TOKEN' with the actual user's Facebook OAuth token
       const facebookPost = await postToFacebook(generatedPost.post, 'YOUR_FACEBOOK_AUTH_TOKEN');
       toast({
         title: "Posted to Facebook!",
         description: `Successfully posted: ${facebookPost.content}`,
       });
     } catch (error: any) {
       toast({
         title: "Error posting to Facebook!",
         description: error.message,
         variant: "destructive",
       });
     }
   };
 
   const handleTwitterPost = async () => {
     if (!generatedPost) {
       toast({
         title: "Generate a post first!",
         description: "Please generate a social media post before tweeting.",
         variant: "destructive",
       });
       return;
     }
 
     try {
       // Replace 'YOUR_TWITTER_AUTH_TOKEN' with the actual user's Twitter OAuth token
       const tweet = await postToTwitter(generatedPost.post, 'YOUR_TWITTER_AUTH_TOKEN');
       toast({
         title: "Posted to Twitter!",
         description: `Successfully tweeted: ${tweet.content}`,
       });
     } catch (error: any) {
       toast({
         title: "Error posting to Twitter!",
         description: error.message,
         variant: "destructive",
       });
     }
   };
 
  const handleInstagramPost = async () => {
       if (!generatedPost) {
         toast({
           title: "Generate a post first!",
           description: "Please generate a social media post before posting to Instagram.",
           variant: "destructive",
         });
         return;
       }
 
       toast({
         title: "Instagram Posting",
         description: "Instagram posting is not supported yet!",
         variant: "warning",
       });
     };
 
   return (
     
       
         
           Social Post Generator
           Generate AI Social Media Posts
         
         
           
             
               
                 Topic
                 
                   
                     
                       Enter topic
                     
                   
                 
               
             
             
               Generate Post
             
           
         
 
         
           {generatedPost ? (
             
               
                 {generatedImage && (
                   
                     
                       
                         
                       
                     
                   
                 )}
                 
                   
                     Add AI Generated Image
                   
                 
                 
                   Post It
                   
                     Copy to Clipboard
                   
                 
                 
                   
                     
                       
                         LinkedIn
                       
                     
                     
                       
                         Facebook
                       
                     
                     
                       
                         Twitter
                       
                     
                     
                       
                         Instagram
                       
                     
                   
                 
               
             
           ) : (
             
           )}
         
       
     
   );
 }
