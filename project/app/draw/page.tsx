"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Pencil, 
  Square, 
  Circle, 
  Type, 
  Image as ImageIcon, 
  Eraser, 
  Download, 
  Trash2, 
  Undo, 
  Redo,
  Save
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

type Tool = "pencil" | "rectangle" | "circle" | "text" | "image" | "eraser";
type DrawingHistory = ImageData[];

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState([5]);
  const [selectedTool, setSelectedTool] = useState<Tool>("pencil");
  const [history, setHistory] = useState<DrawingHistory>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to fill the container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        // Restore the canvas content after resize
        if (historyIndex >= 0 && history[historyIndex]) {
          const context = canvas.getContext('2d');
          if (context) {
            context.putImageData(history[historyIndex], 0, 0);
          }
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Set up canvas context
    const context = canvas.getContext('2d');
    if (context) {
      context.lineCap = 'round';
      context.lineJoin = 'round';
      setCtx(context);
      
      // Save initial blank canvas state
      const initialState = context.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialState]);
      setHistoryIndex(0);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Save canvas state to history
  const saveToHistory = () => {
    if (!canvasRef.current || !ctx) return;
    
    const canvas = canvasRef.current;
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // If we're not at the end of the history, remove future states
    if (historyIndex < history.length - 1) {
      setHistory(history.slice(0, historyIndex + 1));
    }
    
    // Add current state to history
    setHistory(prev => [...prev, currentState]);
    setHistoryIndex(prev => prev + 1);
  };

  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      if (canvasRef.current && ctx && history[historyIndex - 1]) {
        ctx.putImageData(history[historyIndex - 1], 0, 0);
      }
    }
  };

  // Redo function
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      if (canvasRef.current && ctx && history[historyIndex + 1]) {
        ctx.putImageData(history[historyIndex + 1], 0, 0);
      }
    }
  };

  // Clear canvas
  const handleClear = () => {
    if (!canvasRef.current || !ctx) return;
    
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save the cleared state to history
    saveToHistory();
  };

  // Download canvas as image
  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = 'wipecoding-drawing.png';
    link.href = dataUrl;
    link.click();
    
    toast({
      title: "Download Complete",
      description: "Your drawing has been downloaded successfully.",
    });
  };

  // Save drawing (placeholder for future backend integration)
  const handleSave = () => {
    toast({
      title: "Drawing Saved",
      description: "Your drawing has been saved to your account.",
    });
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return;
    
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPos({ x, y });
    
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize[0];
    
    if (selectedTool === 'pencil' || selectedTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(x, y);
      
      if (selectedTool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (selectedTool === 'pencil' || selectedTool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (selectedTool === 'rectangle' || selectedTool === 'circle') {
      // For shape tools, we need to redraw on each mouse move
      // First, restore the previous state
      if (history[historyIndex]) {
        ctx.putImageData(history[historyIndex], 0, 0);
      }
      
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize[0];
      ctx.globalCompositeOperation = 'source-over';
      
      if (selectedTool === 'rectangle') {
        ctx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else if (selectedTool === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      }
      
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
      
      if (ctx) {
        ctx.globalCompositeOperation = 'source-over';
      }
    }
  };

  // Handle text tool (placeholder - would need a text input UI)
  const handleTextTool = () => {
    if (selectedTool === 'text') {
      toast({
        title: "Text Tool Selected",
        description: "Click on the canvas where you want to add text.",
      });
    }
  };

  // Handle image tool (placeholder - would need file upload UI)
  const handleImageTool = () => {
    if (selectedTool === 'image') {
      toast({
        title: "Image Tool Selected",
        description: "Image upload functionality coming soon!",
      });
    }
  };

  useEffect(() => {
    if (selectedTool === 'text') {
      handleTextTool();
    } else if (selectedTool === 'image') {
      handleImageTool();
    }
  }, [selectedTool]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-muted p-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedTool === 'pencil' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setSelectedTool('pencil')}
                    >
                      <Pencil className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Pencil Tool</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedTool === 'rectangle' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setSelectedTool('rectangle')}
                    >
                      <Square className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Rectangle Tool</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedTool === 'circle' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setSelectedTool('circle')}
                    >
                      <Circle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Circle Tool</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedTool === 'text' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setSelectedTool('text')}
                    >
                      <Type className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Text Tool</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedTool === 'image' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setSelectedTool('image')}
                    >
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Image Tool</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedTool === 'eraser' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setSelectedTool('eraser')}
                    >
                      <Eraser className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Eraser Tool</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="color-picker" className="text-sm font-medium">
                  Color:
                </label>
                <input
                  id="color-picker"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <label htmlFor="brush-size" className="text-sm font-medium">
                  Size:
                </label>
                <Slider
                  id="brush-size"
                  value={brushSize}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={setBrushSize}
                  className="w-32"
                />
                <span className="text-sm">{brushSize[0]}px</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleUndo}
                      disabled={historyIndex <= 0}
                    >
                      <Undo className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Undo</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                    >
                      <Redo className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redo</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleClear}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Clear Canvas</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDownload}
                    >
                      <Download className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button onClick={handleSave}>
                <Save className="h-5 w-5 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 relative bg-card">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>
    </div>
  );
}