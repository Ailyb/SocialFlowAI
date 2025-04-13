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
+import {generateImage, GenerateImageOutput} from '@/ai/flows/generate-image';
 import { Icons } from '@/components/icons';
 import { Checkbox } from "@/components/ui/checkbox"
-import {generateImage, GenerateImageOutput} from '@/ai/flows/generate-image';
 import { useToast } from "@/hooks/use-toast"
 import { useEffect } from 'react';
 import * as React from "react"
