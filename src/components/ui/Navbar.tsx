"use client";
import React from "react";
import Image from "next/image";

import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full border-b border-border bg-background/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image
              src="/img/codesandtags.png"
              alt="Codes and Tags"
              width={32}
              height={32}
            />
            <span className="ml-2 text-xl font-bold">Codes and Tags</span>
            <Badge variant="secondary" className="ml-2 text-xs">
              BETA
            </Badge>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Retos
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Cursos
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
