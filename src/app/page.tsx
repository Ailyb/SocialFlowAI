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
import { generateSocialPost, GenerateSocialPostOutput } from '@/ai/flows/generate-social-post';
import { Icons } from '@/components/icons';
import { Checkbox } from "@/components/ui/checkbox"
import {generateImage, GenerateImageOutput} from '@/ai/flows/generate-image';
 
 const formSchema = z.object({
   topic: z.string().min(2, {
@@ -82,7 +82,7 @@
   const [generatedImage, setGeneratedImage] = React.useState<string | null>(null);
 
   async function onSubmit(values: z.infer<typeof formSchema>) {
-    // Do something with the form values.
+    // Do something with the form values. 
     // ✅ This will be type-safe and validated.
     console.log(values)
     setFormData(values);
@@ -214,8 +214,8 @@
       
          
            
-            Social Post Generator
-            Generate AI Social Media Posts
+           Social Post Generator
+           Generate AI Social Media Posts
           
          
          

