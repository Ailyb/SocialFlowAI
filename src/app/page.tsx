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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      tone: '',
      email: '',
    },
  });

  const handleLinkedInPost = async (content: string) => {
    if (!authToken) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please sign in to post to LinkedIn.',
      });
      return;
    }

    try {
      const linkedInPost: LinkedInPost = await postToLinkedIn(content, authToken);
      toast({
        title: 'Posted to LinkedIn!',
        description: `Your post has been published. View it here: ${linkedInPost.postUrl}`,
      });
    } catch (error: any) {
      console.error('Error posting to LinkedIn:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to post to LinkedIn. Please try again.',
      });
    }
  };

  const handleFacebookPost = async (content: string) => {
    if (!authToken) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please sign in to post to Facebook.',
      });
      return;
    }

    try {
      const facebookPost: FacebookPost = await postToFacebook(content, authToken);
      toast({
        title: 'Posted to Facebook!',
        description: `Your post has been published. View it here: ${facebookPost.postUrl}`,
      });
    } catch (error: any) {
      console.error('Error posting to Facebook:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to post to Facebook. Please try again.',
      });
    }
  };

  const handleTwitterPost = async (content: string) => {
    if (!authToken) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please sign in to post to Twitter.',
      });
      return;
    }

    try {
      const tweet: Tweet = await postToTwitter(content, authToken);
      toast({
        title: 'Posted to Twitter!',
        description: `Your tweet has been published. View it here: ${tweet.tweetUrl}`,
      });
    } catch (error: any) {
      console.error('Error posting to Twitter:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to post to Twitter. Please try again.',
      });
    }
  };


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const post = await generateSocialPost({topic: values.topic, tone: values.tone});
      setGeneratedPost(post);
      toast({
        title: 'Post Generated!',
        description: 'Your social media post has been generated successfully.',
      });
    } catch (error: any) {
      console.error('Error generating post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to generate social media post. Please try again.',
      });
    }
  };

  useEffect(() => {
    if (form.formState.errors) {
      Object.keys(form.formState.errors).forEach(key => {
        const error = form.formState.errors[key as keyof z.infer<typeof formSchema>]?.message;
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error,
          });
        }
      });
    }
  }, [form.formState.errors, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">SocialFlow AI</h1>
      <p className="text-lg mb-8">Your AI-powered social media post generator.</p>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create a Social Media Post</CardTitle>
          <CardDescription>Enter the topic, tone, and email to generate a social media post.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter topic" {...field} />
                    </FormControl>
                    <FormDescription>What is the post about?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Tone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tone (e.g., professional, funny)" {...field} />
                    </FormControl>
                    <FormDescription>What is the desired tone of the post?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} type="email" />
                    </FormControl>
                    <FormDescription>Where should we notify you?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Generate Post</Button>
            </form>
          </Form>
        </CardContent>
        {generatedPost && (
          <>
            <CardFooter>
              <Textarea className="w-full" value={generatedPost.post} readOnly />
            </CardFooter>
            <div className="flex flex-col items-center justify-center w-full">
              <h2 className="text-2xl font-bold mt-4">Post It</h2>
              <div className="flex flex-row justify-center space-x-4 mt-2">
                <Button className="flex flex-col items-center" onClick={() => handleLinkedInPost(generatedPost.post)}>
                  <Icons.linkedin className="mx-auto" size={20} />
                  LinkedIn
                </Button>
                <Button className="flex flex-col items-center" onClick={() => handleFacebookPost(generatedPost.post)}>
                  <Icons.facebook className="mx-auto" size={20} />
                  Facebook
                </Button>
                <Button className="flex flex-col items-center" onClick={() => handleTwitterPost(generatedPost.post)}>
                  <Icons.twitter className="mx-auto" size={20} />
                  X
                </Button>
                {/* Placeholder for Instagram - No direct posting available */}
                <Button disabled className="flex flex-col items-center">
                  <Icons.instagram className="mx-auto" size={20} />
                  Instagram
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
