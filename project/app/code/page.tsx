"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code as CodeIcon, 
  Play, 
  Save, 
  Download, 
  Upload, 
  FileCode, 
  Settings,
  Lightbulb
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CodePage() {
  const [code, setCode] = useState(`// Welcome to Wipecoding Code Editor
// Start typing your code here

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`);
  
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const handleRunCode = () => {
    try {
      // Create a safe evaluation environment
      const originalConsoleLog = console.log;
      let outputBuffer = "";
      
      // Override console.log to capture output
      console.log = (...args) => {
        outputBuffer += args.join(" ") + "\n";
      };
      
      // Execute the code
      // Note: In a production environment, you'd want to use a sandboxed evaluation
      // or send the code to a backend service for execution
      eval(code);
      
      // Restore original console.log
      console.log = originalConsoleLog;
      
      // Update output
      setOutput(outputBuffer || "Code executed successfully with no output.");
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput("An unknown error occurred.");
      }
    }
  };

  const handleSaveCode = () => {
    toast({
      title: "Code Saved",
      description: "Your code has been saved to your account.",
    });
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wipecoding-code.js";
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Complete",
      description: "Your code has been downloaded successfully.",
    });
  };

  const handleExplainCode = () => {
    toast({
      title: "AI Explanation",
      description: "Code explanation feature coming soon!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-muted p-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <FileCode className="h-4 w-4 mr-2" />
                New File
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Open
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button onClick={handleRunCode} size="sm">
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
              <Button variant="outline" onClick={handleSaveCode} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleDownloadCode} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={handleExplainCode} size="sm">
                <Lightbulb className="h-4 w-4 mr-2" />
                Explain
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <Tabs defaultValue="editor" className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="editor" className="flex items-center">
                  <CodeIcon className="h-4 w-4 mr-2" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="output" className="flex items-center">
                  <Play className="h-4 w-4 mr-2" />
                  Output
                </TabsTrigger>
              </TabsList>
              
              <div className="text-sm text-muted-foreground">
                JavaScript
              </div>
            </div>
            
            <TabsContent value="editor" className="flex-1 mt-0">
              <div className="h-full border rounded-md overflow-hidden">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-card"
                  spellCheck="false"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="output" className="flex-1 mt-0">
              <div className="h-full border rounded-md overflow-auto bg-black text-white p-4 font-mono text-sm">
                {output || "Run your code to see output here."}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}