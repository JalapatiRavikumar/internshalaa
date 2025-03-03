import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pencil, Code, Music, Palette } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Create, Code, and Design <span className="text-primary">Together</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Wipecoding combines drawing tools, code editing, and design assets in one powerful platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/draw">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">
                  Explore Features
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">All-in-One Creative Platform</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Pencil className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Drawing Tools</h3>
                <p className="text-muted-foreground">Create sketches and diagrams with our intuitive drawing tools.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Code Editor</h3>
                <p className="text-muted-foreground">Write, analyze, and explain code with AI-powered assistance.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Spotify Integration</h3>
                <p className="text-muted-foreground">Listen to your favorite coding playlists while you work.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Design Assets</h3>
                <p className="text-muted-foreground">Access a library of UI components and design resources.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join thousands of developers and designers who are already using Wipecoding.
            </p>
            <Button size="lg" asChild>
              <Link href="/draw">
                Start Creating Now
              </Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-card py-8 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Pencil className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold">Wipecoding</span>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground">About</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Features</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
            © 2025 Wipecoding. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}