import React from "react";
import { Sparkles, RefreshCcw, FileText, AlertCircle, Info, ArrowUpRight } from "lucide-react";
import { SAMPLE_BIOS } from "../types";

interface GeneratorPanelProps {
  text: string;
  onTextChange: (val: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  error: string | null;
}

export default function GeneratorPanel({ 
  text, 
  onTextChange, 
  onGenerate, 
  isLoading, 
  error 
}: GeneratorPanelProps) {
  
  const handlePrefill = (index: number) => {
    onTextChange(SAMPLE_BIOS[index].text);
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-805 bg-zinc-900/40 border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      
      {/* Dynamic Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Background Parser
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Paste your curriculum vitae, LinkedIn summary, or single raw professional paragraph to build an interactive digital website asset.
        </p>
      </div>

      {/* Prefill helper pills */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block">
          Don't have a resume handy? Prefill text samples:
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_BIOS.map((bio, idx) => (
            <button
              id={`prefill_btn_${idx}`}
              key={idx}
              type="button"
              onClick={() => handlePrefill(idx)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs font-semibold select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>{bio.title.split(" & ")[0]}</span>
              <ArrowUpRight className="w-2.5 h-2.5 opacity-40" />
            </button>
          ))}
        </div>
      </div>

      {/* Form Area */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-zinc-400 block" htmlFor="raw_resume_textarea">
          Enter Professional Background Details
        </label>
        <textarea
          id="raw_resume_textarea"
          rows={10}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          disabled={isLoading}
          placeholder="Paste anything describing your history here (e.g., 'My name is Clara. I worked as a Frontend Developer at Netflix for 3 years, then studied at Stanford. My core skills are React and GraphQL...')"
          className="w-full bg-zinc-950/80 text-white border border-zinc-800 focus:border-indigo-500 rounded-xl px-4 py-3.5 text-sm outline-none resize-y transition-all placeholder:text-zinc-600 leading-relaxed font-light"
        />
        <div className="flex items-center justify-between text-[11px] text-zinc-500">
          <span>Min recommended: 100 characters</span>
          <span>Character count: {text.length}</span>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex gap-3 text-xs text-rose-400">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          <div className="space-y-1">
            <span className="font-bold block">Generation Issue</span>
            <p className="font-light leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {/* Generation Info Tip */}
      <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex gap-2.5 text-xs text-zinc-400">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="font-light leading-relaxed">
          Gemini extracts your name, skills, and chronological works, formulating readable summaries. Make sure to review the resulting fields!
        </p>
      </div>

      {/* Main CTA Button */}
      <button
        id="generate_portfolio_btn"
        type="button"
        onClick={onGenerate}
        disabled={isLoading || text.trim().length < 10}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/10 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <RefreshCcw className="w-4 h-4 animate-spin text-white" />
            <span>Parsing Portfolio Details...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Generate My Website</span>
          </>
        )}
      </button>
    </div>
  );
}
