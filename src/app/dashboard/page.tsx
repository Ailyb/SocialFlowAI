'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">SocialFlow AI</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <Icons.user className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <Icons.logout className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.displayName || 'User'}!
              </h2>
              <p className="text-gray-600">
                Manage your social media content and preferences from your dashboard.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icons.edit className="h-5 w-5 mr-2" />
                    Create Post
                  </CardTitle>
                  <CardDescription>
                    Generate AI-powered social media posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/">
                    <Button className="w-full">
                      Create New Post
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icons.settings className="h-5 w-5 mr-2" />
                    Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure your posting preferences and platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icons.share className="h-5 w-5 mr-2" />
                    Scheduled Posts
                  </CardTitle>
                  <CardDescription>
                    View and manage your scheduled content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* User Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your current account details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.photoURL || ''} />
                    <AvatarFallback>
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-lg">{user?.displayName || 'No name set'}</p>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-sm text-gray-500">
                      Account created: {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}