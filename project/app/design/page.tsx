"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Palette, 
  Search, 
  Download, 
  Copy, 
  Grid3X3, 
  Layers, 
  Type, 
  Image as ImageIcon,
  Shapes,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for UI components
const UI_COMPONENTS = [
  {
    id: 1,
    category: "buttons",
    name: "Primary Button",
    description: "Main call-to-action button",
    code: `<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button Text
</button>`,
    preview: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1dHRvbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    category: "buttons",
    name: "Outline Button",
    description: "Secondary action button",
    code: `<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Button Text
</button>`,
    preview: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1dHRvbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    category: "cards",
    name: "Basic Card",
    description: "Simple content container",
    code: `<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src="/img/card-top.jpg" alt="Card image">
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Card Title</div>
    <p className="text-gray-700 text-base">
      Card content goes here. This is a basic card component.
    </p>
  </div>
</div>`,
    preview: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 4,
    category: "forms",
    name: "Login Form",
    description: "User authentication form",
    code: `<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
      Username
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
      Password
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
  </div>
  <div className="flex items-center justify-between">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
      Sign In
    </button>
    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
      Forgot Password?
    </a>
  </div>
</form>`,
    preview: "https://images.unsplash.com/photo-1579444741963-5ae219cfe27c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 5,
    category: "navigation",
    name: "Navbar",
    description: "Top navigation bar",
    code: `<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div className="flex items-center flex-shrink-0 text-white mr-6">
    <span className="font-semibold text-xl tracking-tight">Website Name</span>
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </a>
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        About
      </a>
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        Contact
      </a>
    </div>
    <div>
      <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Get Started</a>
    </div>
  </div>
</nav>`,
    preview: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF2YmFyfGVufDB8fDB8fHww"
  },
  {
    id: 6,
    category: "navigation",
    name: "Footer",
    description: "Page footer with links",
    code: `<footer className="bg-gray-800 text-white p-6">
  <div className="container mx-auto">
    <div className="flex flex-col md:flex-row justify-between">
      <div className="mb-4 md:mb-0">
        <h2 className="text-xl font-bold mb-2">Company Name</h2>
        <p className="text-gray-400">Making the world a better place through constructing elegant hierarchies.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Links</h3>
        <ul>
          <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
        </ul>
      </div>
    </div>
    <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-gray-400">
      &copy; 2025 Company Name. All rights reserved.
    </div>
  </div>
</footer>`,
    preview: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1dHRvbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 7,
    category: "cards",
    name: "Product Card",
    description: "Card for displaying products",
    code: `<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src="/img/product.jpg" alt="Product image">
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Product Name</div>
    <p className="text-gray-700 text-base mb-2">
      Product description goes here. This is a great product that you'll love.
    </p>
    <p className="text-gray-900 font-bold text-xl">$99.99</p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Add to Cart
    </button>
  </div>
</div>`,
    preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3QlMjBjYXJkfGVufDB8fDB8fHww"
  },
  {
    id: 8,
    category: "forms",
    name: "Contact Form",
    description: "Form for user inquiries",
    code: `<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
      Name
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name">
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
      Email
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="your@email.com">
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="message">
      Message
    </label>
    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your message here..." rows="4"></textarea>
  </div>
  <div className="flex items-center justify-between">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
      Send Message
    </button>
  </div>
</form>`,
    preview: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udGFjdCUyMGZvcm18ZW58MHx8MHx8fDA%3D"
  }
];

// Mock data for design assets
const DESIGN_ASSETS = [
  {
    id: 1,
    category: "icons",
    name: "User Icon",
    description: "User profile icon",
    preview: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1dHRvbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    category: "icons",
    name: "Settings Icon",
    description: "Settings/configuration icon",
    preview: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1dHRvbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    category: "backgrounds",
    name: "Gradient Background",
    description: "Colorful gradient background",
    preview: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 4,
    category: "backgrounds",
    name: "Abstract Pattern",
    description: "Abstract geometric pattern",
    preview: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFic3RyYWN0JTIwcGF0dGVybnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 5,
    category: "illustrations",
    name: "Workspace Illustration",
    description: "Desk workspace illustration",
    preview: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3NwYWNlfGVufDB8fDB8fHww"
  },
  {
    id: 6,
    category: "illustrations",
    name: "Team Collaboration",
    description: "Team working together illustration",
    preview: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbXdvcmt8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 7,
    category: "patterns",
    name: "Dots Pattern",
    description: "Repeating dots pattern",
    preview: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 8,
    category: "patterns",
    name: "Waves Pattern",
    description: "Flowing waves pattern",
    preview: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D"
  }
];

export default function DesignPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("components");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedComponent, setSelectedComponent] = useState<typeof UI_COMPONENTS[0] | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<typeof DESIGN_ASSETS[0] | null>(null);
  const { toast } = useToast();

  const filteredComponents = UI_COMPONENTS.filter(component => 
    (selectedCategory === "all" || component.category === selectedCategory) &&
    (component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     component.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAssets = DESIGN_ASSETS.filter(asset => 
    (selectedCategory === "all" || asset.category === selectedCategory) &&
    (asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     asset.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const componentCategories = ["all", ...Array.from(new Set(UI_COMPONENTS.map(c => c.category)))];
  const assetCategories = ["all", ...Array.from(new Set(DESIGN_ASSETS.map(a => a.category)))];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Component code copied to clipboard.",
    });
  };

  const handleDownloadAsset = () => {
    toast({
      title: "Asset Downloaded",
      description: "Design asset has been downloaded.",
    });
  };

  const handleSaveToFavorites = () => {
    toast({
      title: "Added to Favorites",
      description: activeTab === "components" 
        ? "Component added to your favorites." 
        : "Asset added to your favorites.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-muted p-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Design Resources</h1>
              <p className="text-muted-foreground">Browse and use UI components and design assets</p>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
            <TabsList className="mb-6">
              <TabsTrigger value="components" className="flex items-center">
                <Grid3X3 className="h-4 w-4 mr-2" />
                UI Components
              </TabsTrigger>
              <TabsTrigger value="assets" className="flex items-center">
                <Palette className="h-4 w-4 mr-2" />
                Design Assets
              </TabsTrigger>
              <TabsTrigger value="logos" className="flex items-center">
                <Shapes className="h-4 w-4 mr-2" />
                Logo Creator
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="components" className="mt-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-64 space-y-4">
                  <div className="bg-card rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-1">
                      {componentCategories.map(category => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "ghost"}
                          className="w-full justify-start capitalize"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  {selectedComponent ? (
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold mb-1">{selectedComponent.name}</h2>
                          <p className="text-muted-foreground">{selectedComponent.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleSaveToFavorites()}>
                            <Heart className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setSelectedComponent(null)}>
                            Back
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-6 aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={selectedComponent.preview} 
                          alt={selectedComponent.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{selectedComponent.code}</code>
                        </pre>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => handleCopyCode(selectedComponent.code)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredComponents.map(component => (
                        <Card 
                          key={component.id} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedComponent(component)}
                        >
                          <div className="aspect-video bg-muted overflow-hidden">
                            <img 
                              src={component.preview} 
                              alt={component.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold mb-1">{component.name}</h3>
                            <p className="text-sm text-muted-foreground">{component.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="assets" className="mt-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-64 space-y-4">
                  <div className="bg-card rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-1">
                      {assetCategories.map(category => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "ghost"}
                          className="w-full justify-start capitalize"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  {selectedAsset ? (
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold mb-1">{selectedAsset.name}</h2>
                          <p className="text-muted-foreground">{selectedAsset.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleSaveToFavorites()}>
                            <Heart className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setSelectedAsset(null)}>
                            Back
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-6 aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={selectedAsset.preview} 
                          alt={selectedAsset.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <Button onClick={handleDownloadAsset}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Asset
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredAssets.map(asset => (
                        <Card 
                          key={asset.id} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedAsset(asset)}
                        >
                          <div className="aspect-square bg-muted overflow-hidden">
                            <img 
                              src={asset.preview} 
                              alt={asset.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold mb-1">{asset.name}</h3>
                            <p className="text-sm text-muted-foreground">{asset.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="logos" className="mt-0">
              <div className="bg-card rounded-lg p-6 shadow-sm text-center">
                <div className="max-w-md mx-auto">
                  <Shapes className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-bold mb-2">Logo Creator</h2>
                  <p className="text-muted-foreground mb-6">
                    Create custom logos for your projects with our easy-to-use logo generator.
                  </p>
                  <Button size="lg">
                    Coming Soon
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}