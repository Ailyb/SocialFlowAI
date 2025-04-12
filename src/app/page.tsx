import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to SocialFlow AI</h1>
      <p className="text-lg mb-8">
        Your AI-powered social media post generator.
      </p>
      <Button>Get Started</Button>
    </div>
  );
}
