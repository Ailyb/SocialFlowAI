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
 
-      // Using the generatedPost.post as the prompt for image generation
+      
+      // Using the generatedPost.post as the prompt for image generation      
       const imageUrl = await generateAIImage(generatedPost.post); // Replace generateAIImage with your actual function
 
       setGeneratedImage(imageUrl);
@@ -123,7 +120,7 @@
 
   useEffect(() => {
     if (generatedPost) {
-        console.log("Generated Post:", generatedPost.post); // Debugging line
+      console.log("Generated Post:", generatedPost.post); // Debugging line
     }
   }, [generatedPost]);
 
@@ -206,7 +203,7 @@
             </div>
           ) : (
             
-              
+            
               {generatedImage && (
                 
                     
@@ -217,7 +214,7 @@
               
             
             
-              
+            
               
                 <Button onClick={handleGenerateImage} className="mt-4">
                   Add AI Generated Image
@@ -225,7 +222,7 @@
               
             
             
-              
+            
               Post It
               <Button onClick={() => copyToClipboard(generatedPost.post)} className="mt-4">
                 Copy to Clipboard
@@ -233,7 +230,7 @@
               
             
             
-              
+            
               
                 
                   
@@ -242,7 +239,7 @@
                   LinkedIn
                 
               
-              
+              
                 
                   
                     Facebook
                   
               
-              
+              
                 
                   
                     Twitter
                   
               
-              
+              
                 
                   
                     Instagram
                   
               
-            
+            
           )}
         
       

