import React, { useState } from "react";
import { Sparkles, HelpCircle, Laptop, Download, Terminal, Layers, ArrowRight } from "lucide-react";
import GeneratorPanel from "./components/GeneratorPanel";
import PortfolioPreview from "./components/PortfolioPreview";
import { PortfolioData, INITIAL_PORTFOLIO } from "./types";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(INITIAL_PORTFOLIO);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!inputText || inputText.trim().length < 10) {
      setError("Please write or paste at least a short paragraph or select a quick template above!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const generatedData = await response.json();
      setPortfolioData(generatedData);
      
      // Auto scroll down to preview
      setTimeout(() => {
        const element = document.getElementById("portfolio_workspace");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

    } catch (err: any) {
      console.error("Fetch Exception:", err);
      setError(err?.message || "There was an issue parsing your biographical text. Please verify the server setup or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePortfolio = (updated: PortfolioData) => {
    setPortfolioData(updated);
  };

  return (
    <div id="elegant_dark_application" class="min-h-screen bg-zinc-950 text-zinc-300 font-sans flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Absolute Decorative Glow Mesh */}
      <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none z-0" />
      <div class="fixed bottom-0 right-10 w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Top Professional Header Navigation */}
      <nav id="app_navbar" class="relative z-10 flex-none h-14 border-b border-zinc-800/80 flex items-center justify-between px-6 md:px-12 bg-zinc-950/50 backdrop-blur-md">
        <div class="flex items-center gap-3 select-none">
          {/* Rotated Indigo Prism Logo from design guide */}
          <div class="w-6 h-6 bg-indigo-600 rounded-md rotate-45 transform flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span class="text-[10px] text-white font-bold -rotate-45">P</span>
          </div>
          <span class="font-extrabold text-white tracking-widest text-sm">PORTFOLIO.AI</span>
        </div>
        
        {/* Navigation Actions */}
        <div class="hidden sm:flex items-center gap-8 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
          <a href="#parser" class="hover:text-zinc-200 transition-colors">Parser Board</a>
          <a href="#designer" class="hover:text-zinc-200 transition-colors">Live Designer</a>
          <span class="text-indigo-400 font-medium tracking-normal lowercase bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/10 inline-flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"></span>
            active generator model
          </span>
        </div>
      </nav>

      <main class="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
        
        {/* Left Interactive Guide & Background CV Input column */}
        <section id="parser" class="lg:col-span-5 space-y-8">
          
          {/* Elegant Hero Pitch */}
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-3 h-3" />
              <span>Next-Gen Profile Engine</span>
            </div>
            <h1 class="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-none">
              Perfect portfolios, <br className="hidden sm:inline" /> 
              curated entirely <br className="hidden sm:inline" />
              <span class="bg-gradient-to-r from-indigo-400 via-violet-300 to-white bg-clip-text text-transparent">by Artificial Intelligence.</span>
            </h1>
            <p class="text-sm text-zinc-400 leading-relaxed font-light">
              Don't spend hours tweaking templates. Paste your career timeline, LinkedIn biography, or CV. Our engine will structure, design, and render a beautifully stylized static website ready to deploy.
            </p>
          </div>

          {/* Core Interactive Parser Dashboard Panel */}
          <GeneratorPanel
            text={inputText}
            onTextChange={setInputText}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            error={error}
          />

          {/* Quick FAQ / Design Philosophy Widget */}
          <div class="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 space-y-4">
            <h3 class="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-zinc-500" />
              Quick Instructions
            </h3>
            <ul class="space-y-3.5 text-xs text-zinc-400 font-light leading-relaxed">
              <li class="flex gap-2">
                <span class="text-indigo-400 font-bold">1.</span>
                <span>Paste clean LinkedIn text, markdown output, or an unstructured CV paragraph.</span>
              </li>
              <li class="flex gap-2">
                <span class="text-indigo-400 font-bold">2.</span>
                <span>Click the prominent <b>"Generate My Website"</b> button and watch the layout construct.</span>
              </li>
              <li class="flex gap-2">
                <span class="text-indigo-400 font-bold">3.</span>
                <span>Instantly optimize roles, tweak custom color aesthetics, and download HTML.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Right Live Interactive Preview Layout Column */}
        <section id="designer" class="lg:col-span-7 space-y-6">
          <div class="flex items-center justify-between select-none">
            <div class="flex items-center gap-2.5">
              <div class="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                Interactive Design Workspace
              </span>
            </div>
            <div class="text-[11px] text-zinc-500 font-mono">
              Obsidian Dark Active
            </div>
          </div>

          {/* Live Preview Container Frame */}
          <PortfolioPreview
            data={portfolioData}
            onUpdate={handleUpdatePortfolio}
          />
        </section>

      </main>

      {/* Elegant Obsidian Footer Info */}
      <footer id="app_footer" class="relative z-10 flex-none h-14 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between px-6 md:px-12">
        <div class="flex items-center gap-4">
          <div class="flex gap-1.5 items-center">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              AI Engine: Gemini Pro Active
            </span>
          </div>
        </div>
        <div class="text-[10px] text-zinc-600 tracking-wider">
          &copy; {new Date().getFullYear()} PORTFOLIO.AI &mdash; SOLID RESUME PARSER WORKSPACE
        </div>
      </footer>

    </div>
  );
}
