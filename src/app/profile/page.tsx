'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Profile update will be implemented with Firestore in Phase 2
      toast.info('Profile updates will be saved to database in Phase 2');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <Icons.arrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Profile Settings</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 space-y-6">
            {/* Profile Picture Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  Your profile picture is managed through your Google account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.photoURL || ''} />
                    <AvatarFallback className="text-lg">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user?.displayName || 'No name set'}</p>
                    <p className="text-sm text-gray-600">Update your profile picture in your Google account settings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      placeholder="Your email address"
                    />
                    <p className="text-sm text-gray-500">
                      Email is managed through your authentication provider
                    </p>
                  </div>

                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Information about your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Account ID:</span>
                  <span className="text-gray-600 text-sm font-mono">{user?.uid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Provider:</span>
                  <span className="text-gray-600">Google</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email Verified:</span>
                  <span className={user?.emailVerified ? 'text-green-600' : 'text-red-600'}>
                    {user?.emailVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Account Created:</span>
                  <span className="text-gray-600">
                    {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Sign In:</span>
                  <span className="text-gray-600">
                    {user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}