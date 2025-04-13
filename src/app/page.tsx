'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {generateSocialPost, GenerateSocialPostOutput } from '@/ai/flows/generate-social-post';
import { Icons } from '@/components/icons';
import { Checkbox } from "@/components/ui/checkbox"
import {generateImage, GenerateImageOutput} from '@/ai/flows/generate-image';
import { useToast } from "@/hooks/use-toast"
import { useEffect } from 'react';
import * as React from "react"
import {z} from 'zod';
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import {postToFacebook} from '@/services/facebook';
import {postToLinkedIn} from '@/services/linkedin';
import {postToTwitter} from '@/services/twitter';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  tone: z.string().min(2, {
    message: "Tone must be at least 2 characters.",
  }),
})
 

export default function Home() {
  const [formData, setFormData] = React.useState({ topic: '', tone: '' });
  const [generatedPost, setGeneratedPost] = React.useState<GenerateSocialPostOutput | null>(null);
  const [generatedImage, setGeneratedImage] = React.useState<string | null>(null);
  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values. 
    // ✅ This will be type-safe and validated.
    console.log(values)
    setFormData(values);
    const post = await generateSocialPost({ topic: values.topic, tone: values.tone });
    setGeneratedPost(post);
  }

  async function handleCopyToClipboard() {
    let textToCopy = generatedPost?.post || '';
    if (generatedImage) {
      textToCopy += `\nImage URL: ${generatedImage}`;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied to clipboard!",
        description: "You can now paste the text and image URL.",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Could not copy to clipboard!",
        description: "Please try again.",
      })
     }
   }
 

  async function generateAIImage(postText: string | undefined): Promise<string | undefined> {
    if (!postText) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No post to generate an image from!",
      });
      return undefined;
    }
 
    try {
      const imageResult = await generateImage({ prompt: postText });
 
      if (imageResult && imageResult.imageUrl) {
        return imageResult.imageUrl;
      } else {
        toast({
          variant: "destructive",
          title: "Image Generation Failed",
          description: "Could not generate image. Please try again.",
        });
        return undefined;
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        variant: "destructive",
        title: "Image Generation Error",
        description: "There was an error generating the image.",
      });
      return undefined;
    }
  }
 

  async function handleGenerateImage() {
     if (!generatedPost?.post) {
       toast({
         variant: "destructive",
         title: "Error",
         description: "No post to generate an image from!",
       });
       return;
     }
 
     const imageUrl = await generateAIImage(generatedPost.post);
     if (imageUrl) {
       setGeneratedImage(imageUrl);
     }
   }
+ 
+  async function handlePostToLinkedIn() {
+    if (!generatedPost?.post) {
+      toast({
+        variant: 'destructive',
+        title: 'Error',
+        description: 'No post to share!',
+      });
+      return;
+    }
+
+    try {
+      // Replace 'YOUR_LINKEDIN_AUTH_TOKEN' with the actual user's auth token
+      const linkedInPost = await postToLinkedIn(generatedPost.post, 'YOUR_LINKEDIN_AUTH_TOKEN');
+      toast({
+        title: 'Posted to LinkedIn!',
+        description: `Successfully posted: ${linkedInPost.postUrl}`,
+      });
+    } catch (error) {
+      console.error('LinkedIn post error:', error);
+      toast({
+        variant: 'destructive',
+        title: 'Failed to Post to LinkedIn',
+        description: 'There was an error posting to LinkedIn.',
+      });
+    }
+  }
+
+  async function handlePostToFacebook() {
+    if (!generatedPost?.post) {
+      toast({
+        variant: 'destructive',
+        title: 'Error',
+        description: 'No post to share!',
+      });
+      return;
+    }
+
+    try {
+      // Replace 'YOUR_FACEBOOK_AUTH_TOKEN' with the actual user's auth token
+      const facebookPost = await postToFacebook(generatedPost.post, 'YOUR_FACEBOOK_AUTH_TOKEN');
+      toast({
+        title: 'Posted to Facebook!',
+        description: `Successfully posted: ${facebookPost.postUrl}`,
+      });
+    } catch (error) {
+      console.error('Facebook post error:', error);
+      toast({
+        variant: 'destructive',
+        title: 'Failed to Post to Facebook',
+        description: 'There was an error posting to Facebook.',
+      });
+    }
+  }
+
+  async function handlePostToTwitter() {
+    if (!generatedPost?.post) {
+      toast({
+        variant: 'destructive',
+        title: 'Error',
+        description: 'No post to share!',
+      });
+      return;
+    }
+
+    try {
+      // Replace 'YOUR_TWITTER_AUTH_TOKEN' with the actual user's auth token
+      const tweet = await postToTwitter(generatedPost.post, 'YOUR_TWITTER_AUTH_TOKEN');
+      toast({
+        title: 'Posted to Twitter!',
+        description: `Successfully posted: ${tweet.tweetUrl}`,
+      });
+    } catch (error) {
+      console.error('Twitter post error:', error);
+      toast({
+        variant: 'destructive',
+        title: 'Failed to Post to Twitter',
+        description: 'There was an error posting to Twitter.',
+      });
+    }
+  }
   
   useEffect(() => {
     if (generatedPost) {
@@ -159,7 +156,7 @@
                       
                     
                       <FormItem>
-                    
+                    
                         <FormControl>
                           <Input placeholder="Topic of Social Media Post" {...field} />
                         </FormControl>
@@ -167,7 +164,7 @@
                         
                     
                       
-                    Tone
+                    Tone
                         The tone of voice for the social media post
                       
                     
@@ -197,7 +194,7 @@
           {generatedPost && (
             
               
-                Generated Post:
+                Generated Post
                 {generatedPost.post}
                 {generatedImage && (
                   
@@ -205,37 +202,37 @@
                   
                 )}
               
+              
                 Post It
                 
                   Copy to Clipboard
                   
                 
                 
-                  
+                  
                     <Icons.linkedin className="h-4 w-4 mb-1" />
                     LinkedIn
                   
                  
                 
-                  
+                  
                     <Icons.facebook className="h-4 w-4 mb-1" />
                     Facebook
                   
                  
                 
-                  
+                  
                     <Icons.twitter className="h-4 w-4 mb-1" />
                     X
                   
                  
                 
-                  
+                  
                     <Icons.instagram className="h-4 w-4 mb-1" />
                     Instagram
                   
                  
                 
-              
+              
                
                 Add AI Generated Image
                
@@ -243,7 +240,7 @@
             
         
       
-    
+    
   )
 }
 
