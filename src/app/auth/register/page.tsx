'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to create account with Google');
      console.error('Google sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Email/password authentication will be implemented in Phase 2
    toast.info('Email authentication coming soon!');
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Choose your preferred sign up method
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <Button 
            variant="outline" 
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}
            Continue with Google
          </Button>
          
          <Button 
            variant="outline" 
            disabled
            className="w-full"
          >
            <Icons.linkedin className="mr-2 h-4 w-4" />
            Continue with LinkedIn (Coming Soon)
          </Button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>
        
        <form onSubmit={handleEmailSignUp} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled>
            Sign Up (Coming Soon)
          </Button>
        </form>
        
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}