"use client";

import Link from "next/link";
import { Pencil, Code, Music, Palette, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Pencil className="h-8 w-8 text-primary mr-2" />
              <span className="font-bold text-xl">Wipecoding</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/draw" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Pencil className="h-4 w-4 mr-1" />
              Draw
            </Link>
            <Link href="/code" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Code className="h-4 w-4 mr-1" />
              Code
            </Link>
            <Link href="/music" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Music className="h-4 w-4 mr-1" />
              Music
            </Link>
            <Link href="/design" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Palette className="h-4 w-4 mr-1" />
              Design
            </Link>
            <ThemeToggle />
            <Button>Sign In</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button variant="ghost" onClick={toggleMenu} className="ml-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/draw" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
            <div className="flex items-center">
              <Pencil className="h-5 w-5 mr-2" />
              Draw
            </div>
          </Link>
          <Link href="/code" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
            <div className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Code
            </div>
          </Link>
          <Link href="/music" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
            <div className="flex items-center">
              <Music className="h-5 w-5 mr-2" />
              Music
            </div>
          </Link>
          <Link href="/design" className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
            <div className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Design
            </div>
          </Link>
          <Button className="w-full mt-2">Sign In</Button>
        </div>
      </div>
    </nav>
  );
}