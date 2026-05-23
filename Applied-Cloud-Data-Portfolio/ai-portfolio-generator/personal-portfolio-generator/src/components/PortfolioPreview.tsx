import React, { useState } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Mail, 
  Linkedin, 
  Github, 
  Edit3, 
  Check, 
  Eye, 
  Plus, 
  Trash2, 
  Download, 
  Sparkles,
  ExternalLink,
  Code2
} from "lucide-react";
import { PortfolioData, Experience, Education, SkillCategory } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface PortfolioPreviewProps {
  data: PortfolioData;
  onUpdate: (updatedData: PortfolioData) => void;
}

export default function PortfolioPreview({ data, onUpdate }: PortfolioPreviewProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Styling helper based on the active accent color
  const getAccentStyles = (accent: string) => {
    switch (accent) {
      case "emerald":
        return {
          text: "text-emerald-400",
          border: "border-emerald-500/20",
          focusBorder: "focus:border-emerald-500",
          badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          bg: "bg-emerald-500",
          ring: "ring-emerald-500/20",
          hoverBg: "hover:bg-emerald-500/20",
          accentLine: "from-emerald-500 to-transparent"
        };
      case "violet":
        return {
          text: "text-violet-400",
          border: "border-violet-500/20",
          focusBorder: "focus:border-violet-500",
          badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
          bg: "bg-violet-500",
          ring: "ring-violet-500/20",
          hoverBg: "hover:bg-violet-500/20",
          accentLine: "from-violet-500 to-transparent"
        };
      case "sky":
        return {
          text: "text-sky-400",
          border: "border-sky-500/20",
          focusBorder: "focus:border-sky-500",
          badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
          bg: "bg-sky-500",
          ring: "ring-sky-500/20",
          hoverBg: "hover:bg-sky-500/20",
          accentLine: "from-sky-500 to-transparent"
        };
      case "amber":
        return {
          text: "text-amber-400",
          border: "border-amber-500/20",
          focusBorder: "focus:border-amber-500",
          badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          bg: "bg-amber-500",
          ring: "ring-amber-500/20",
          hoverBg: "hover:bg-amber-500/20",
          accentLine: "from-amber-500 to-transparent"
        };
      case "rose":
        return {
          text: "text-rose-400",
          border: "border-rose-500/20",
          focusBorder: "focus:border-rose-500",
          badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
          bg: "bg-rose-500",
          ring: "ring-rose-500/20",
          hoverBg: "hover:bg-rose-500/20",
          accentLine: "from-rose-500 to-transparent"
        };
      case "indigo":
      default:
        return {
          text: "text-indigo-400",
          border: "border-indigo-500/20",
          focusBorder: "focus:border-indigo-500",
          badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
          bg: "bg-indigo-500",
          ring: "ring-indigo-500/20",
          hoverBg: "hover:bg-indigo-500/20",
          accentLine: "from-indigo-500 to-transparent"
        };
    }
  };

  const style = getAccentStyles(data.aestheticAccent);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Handler functions to update editable state directly
  const handleChange = (field: keyof PortfolioData, value: any) => {
    onUpdate({
      ...data,
      [field]: value,
    });
  };

  const handleContactChange = (field: keyof typeof data.contact, value: string) => {
    onUpdate({
      ...data,
      contact: {
        ...data.contact,
        [field]: value
      }
    });
  };

  const handleArrayItemChange = <T extends any>(
    field: 'experience' | 'education' | 'skills',
    index: number,
    key: string,
    value: any
  ) => {
    const list = [...data[field]] as any[];
    list[index] = {
      ...list[index],
      [key]: value
    };
    handleChange(field, list);
  };

  const addArrayItem = (field: 'experience' | 'education' | 'skills') => {
    if (field === 'experience') {
      const newItem: Experience = {
        role: "New Role",
        company: "Company Name",
        period: "2025 - Present",
        description: "Engaging bullet achievement or role deliverables summary."
      };
      onUpdate({ ...data, experience: [...data.experience, newItem] });
    } else if (field === 'education') {
      const newItem: Education = {
        degree: "Field of Study / Degree Name",
        school: "College or Institution",
        period: "2021 - 2025",
        description: "Academic focus or highlights if any."
      };
      onUpdate({ ...data, education: [...data.education, newItem] });
    } else if (field === 'skills') {
      const newItem: SkillCategory = {
        category: "Skill Grouping",
        items: ["Awesome Skill"]
      };
      onUpdate({ ...data, skills: [...data.skills, newItem] });
    }
  };

  const deleteArrayItem = (field: 'experience' | 'education' | 'skills', index: number) => {
    const list = [...data[field]] as any[];
    list.splice(index, 1);
    handleChange(field, list);
  };

  const handleSkillItemChange = (catIdx: number, skillIdx: number, val: string) => {
    const list = [...data.skills];
    list[catIdx].items[skillIdx] = val;
    handleChange('skills', list);
  };

  const addSkillItem = (catIdx: number) => {
    const list = [...data.skills];
    list[catIdx].items.push("New skill");
    handleChange('skills', list);
  };

  const deleteSkillItem = (catIdx: number, skillIdx: number) => {
    const list = [...data.skills];
    list[catIdx].items.splice(skillIdx, 1);
    handleChange('skills', list);
  };

  // Export as simple HTML document with direct Tailwind link for user download
  const handleDownloadHtml = () => {
    const htmlToExport = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} | ${data.title}</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen selection:bg-${data.aestheticAccent}-500/30 selection:text-${data.aestheticAccent}-300">

  <!-- Interactive Flare Accent -->
  <div class="fixed top-0 left-1/4 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] rounded-full bg-${data.aestheticAccent}-500/5 blur-[120px] pointer-events-none"></div>

  <!-- Header Section -->
  <header class="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-900">
    <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="#" class="font-bold text-lg tracking-tight hover:text-${data.aestheticAccent}-400 transition-colors">${data.name}</a>
      <nav class="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
        <a href="#about" class="hover:text-slate-200 transition-colors">About</a>
        <a href="#experience" class="hover:text-slate-200 transition-colors">Experience</a>
        <a href="#skills" class="hover:text-slate-200 transition-colors">Skills</a>
        <a href="#contact" class="hover:text-slate-200 transition-colors">Contact</a>
      </nav>
      <a href="#contact" class="px-4 py-2 text-xs font-semibold rounded-lg bg-${data.aestheticAccent}-500 text-slate-950 hover:bg-${data.aestheticAccent}-400 transition-all duration-300 shadow-md shadow-${data.aestheticAccent}-500/10">
        Let's Connect
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="relative max-w-5xl mx-auto px-6 pt-24 pb-16 flex flex-col justify-center min-h-[50vh]">
    <div class="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-${data.aestheticAccent}-500/10 text-${data.aestheticAccent}-400 border border-${data.aestheticAccent}-500/20 mb-6 w-fit animate-pulse">
      <span class="w-1.5 h-1.5 bg-${data.aestheticAccent}-400 rounded-full"></span>
      Available for Projects
    </div>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
      Hi, I'm <span class="bg-gradient-to-r from-white via-slate-200 to-${data.aestheticAccent}-400 bg-clip-text text-transparent">${data.name}</span>
    </h1>
    <h2 class="text-xl md:text-2xl font-semibold text-slate-300 mb-6">${data.title}</h2>
    <p class="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
      ${data.tagline}
    </p>
    <div class="flex flex-wrap items-center gap-4">
      <a href="#contact" class="px-5 py-3 text-sm font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-${data.aestheticAccent}-500/50 transition-all duration-300">
        Get in Touch
      </a>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="max-w-5xl mx-auto px-6 py-16 border-t border-slate-900/50 scroll-mt-20">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-1">
        <h3 class="text-xs font-bold tracking-widest text-${data.aestheticAccent}-400 uppercase">About Me</h3>
        <h4 class="text-2xl font-bold text-white mt-1">My Background</h4>
      </div>
      <div class="md:col-span-2 text-slate-400 font-light leading-relaxed text-base space-y-4">
        <p>${data.aboutMe}</p>
      </div>
    </div>
  </section>

  <!-- Experience & Education -->
  <section id="experience" class="max-w-5xl mx-auto px-6 py-16 border-t border-slate-900/50 scroll-mt-20">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div class="md:col-span-1">
        <h3 class="text-xs font-bold tracking-widest text-${data.aestheticAccent}-400 uppercase">Timeline</h3>
        <h4 class="text-2xl font-bold text-white mt-1">Experience & Edu</h4>
        <p class="text-sm text-slate-500 mt-2">chronological overview of my professional and educational milestones.</p>
      </div>
      
      <div class="md:col-span-2 space-y-12">
        <div class="space-y-6">
          <h5 class="text-sm font-semibold tracking-wider text-slate-300 uppercase inline-flex items-center gap-2">
            Work Experience
          </h5>
          <div class="relative border-l border-slate-900 pl-6 ml-1 space-y-8">
            ${data.experience.map(exp => `
              <div class="relative group">
                <span class="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border border-${data.aestheticAccent}-400/50 group-hover:bg-${data.aestheticAccent}-400 transition-colors duration-300"></span>
                <span class="text-xs font-medium text-${data.aestheticAccent}-400">${exp.period}</span>
                <h6 class="text-lg font-bold text-white mt-0.5">${exp.role}</h6>
                <p class="text-sm text-slate-400 font-medium">${exp.company}</p>
                <p class="text-sm text-slate-500 mt-2 font-light leading-relaxed">${exp.description}</p>
              </div>
            `).join('')}
          </div>
        </div>

        ${data.education.length > 0 ? `
        <div class="space-y-6 pt-4">
          <h5 class="text-sm font-semibold tracking-wider text-slate-300 uppercase inline-flex items-center gap-2">
            Education & Academic Coursework
          </h5>
          <div class="relative border-l border-slate-900 pl-6 ml-1 space-y-8">
            ${data.education.map(edu => `
              <div class="relative group">
                <span class="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border border-slate-800"></span>
                <span class="text-xs font-medium text-slate-500">${edu.period}</span>
                <h6 class="text-lg font-bold text-white mt-0.5">${edu.degree}</h6>
                <p class="text-sm text-${data.aestheticAccent}-400 font-medium">${edu.school}</p>
                ${edu.description ? `<p class="text-sm text-slate-500 mt-2 font-light">${edu.description}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="max-w-5xl mx-auto px-6 py-16 border-t border-slate-900/50 scroll-mt-20">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-1">
        <h3 class="text-xs font-bold tracking-widest text-${data.aestheticAccent}-400 uppercase">Expertise</h3>
        <h4 class="text-2xl font-bold text-white mt-1">Skills & Tools</h4>
        <p class="text-sm text-slate-500 mt-2">Direct stack and professional toolsets I interact with daily.</p>
      </div>
      <div class="md:col-span-2 space-y-8">
        ${data.skills.map(cat => `
          <div class="space-y-3">
            <h5 class="text-xs font-bold uppercase tracking-widest text-slate-400">${cat.category}</h5>
            <div class="flex flex-wrap gap-2">
              ${cat.items.map(skill => `
                <span class="px-3.5 py-1.5 rounded-md text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:border-${data.aestheticAccent}-500/30 hover:text-white transition-all duration-300">
                  ${skill}
                </span>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="max-w-5xl mx-auto px-6 py-20 border-t border-slate-900/50 scroll-mt-20">
    <div class="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900/80 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-${data.aestheticAccent}-500/5 blur-[80px] pointer-events-none"></div>
      
      <h3 class="text-xs font-bold tracking-widest text-${data.aestheticAccent}-400 uppercase">Get in Touch</h3>
      <h4 class="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4">Let's build something epic!</h4>
      <p class="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-8 font-light">
         I'm always looking to connect with innovative teams, open-source developers, and potential advisory prospects. Do not hesitate to drop a message.
      </p>

      <div class="inline-flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        ${data.contact.email ? `
          <a href="mailto:${data.contact.email}" class="flex items-center gap-3 text-slate-300 hover:text-${data.aestheticAccent}-400 text-sm font-medium transition-colors">
            <span class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
              <!-- Inline Mail Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </span>
            ${data.contact.email}
          </a>
        ` : ''}

        ${data.contact.location ? `
          <span class="flex items-center gap-3 text-slate-300 text-sm font-medium">
            <span class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
              <!-- Inline Pin Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </span>
            ${data.contact.location}
          </span>
        ` : ''}
      </div>

      <div class="flex items-center justify-center gap-4">
        ${data.contact.linkedin ? `
          <a href="https://${data.contact.linkedin}" target="_blank" rel="noopener noreferrer" class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-${data.aestheticAccent}-500/50 transition-all duration-300">
            LinkedIn
          </a>
        ` : ''}
        ${data.contact.github ? `
          <a href="https://${data.contact.github}" target="_blank" rel="noopener noreferrer" class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-${data.aestheticAccent}-500/50 transition-all duration-300">
            GitHub
          </a>
        ` : ''}
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-900/50 py-8 text-center text-xs text-slate-600">
    <div class="max-w-5xl mx-auto px-6">
      <p>&copy; ${new Date().getFullYear()} ${data.name}. Generated via AI Studio.</p>
    </div>
  </footer>

</body>
</html>`;

    const element = document.createElement("a");
    const file = new Blob([htmlToExport], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${data.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}_portfolio.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="portfolio_workspace" class="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Decorative Blur Backdrops */}
      <div className={`absolute top-0 right-10 w-96 h-96 rounded-full bg-slate-900/80 blur-3xl pointer-events-none`} />
      <div className={`absolute top-40 left-10 w-72 h-72 rounded-full ${style.text}/5 blur-3xl pointer-events-none`} />

      {/* Control Actions Belt */}
      <div id="preview_header" class="border-b border-slate-900 bg-slate-950/95 sticky top-0 z-20 px-6 py-4 flex items-center justify-between flex-wrap gap-4 select-none backdrop-blur-md">
        <div class="flex items-center gap-3">
          <div class={`p-2 rounded-xl bg-slate-900 border ${style.border}`}>
            <Sparkles className={`w-4 h-4 ${style.text}`} />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white">Dynamic Portfolio Output</h3>
            <p class="text-xs text-slate-500">Edit fields inline or export to production-ready HTML code</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          {/* Accent Color Switcher Widget */}
          <div class="bg-slate-900 border border-slate-800/80 rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-xs">
            <span class="text-slate-500 font-medium">Palette:</span>
            <div class="flex items-center gap-1.5">
              {(['indigo', 'emerald', 'violet', 'sky', 'amber', 'rose'] as const).map(color => (
                <button
                  key={color}
                  id={`accent_${color}`}
                  type="button"
                  title={`Toggle ${color}`}
                  onClick={() => handleChange('aestheticAccent', color)}
                  className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all ${
                    color === 'indigo' ? 'bg-indigo-500' :
                    color === 'emerald' ? 'bg-emerald-500' :
                    color === 'violet' ? 'bg-violet-500' :
                    color === 'sky' ? 'bg-sky-500' :
                    color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                  } ${data.aestheticAccent === color ? 'ring-2 ring-slate-100 scale-125' : 'opacity-60 hover:opacity-100 scale-100'}`}
                />
              ))}
            </div>
          </div>

          <button
            id="toggle_edit_mode"
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
              isEditMode 
                ? "bg-${data.aestheticAccent}-500/10 text-white border-white/20 hover:bg-white/10" 
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {isEditMode ? (
              <>
                <Eye className="w-3.5 h-3.5 text-slate-300" />
                <span>Publish View</span>
              </>
            ) : (
              <>
                <Edit3 className={`w-3.5 h-3.5 ${style.text}`} />
                <span>Edit Fields</span>
              </>
            )}
          </button>

          <button
            id="export_html_button"
            type="button"
            onClick={handleDownloadHtml}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download HTML</span>
          </button>
        </div>
      </div>

      {/* Editor or Website Preview Mode Container */}
      <div id="preview_workspace_content" class="min-h-[60vh] max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {isEditMode ? (
            <motion.div
              key="edit-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              class="p-6 md:p-10 space-y-8 text-slate-300"
            >
              <div class="border-b border-slate-800 pb-4">
                <h4 class="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-slate-400" />
                  Visual Interactive Editor
                </h4>
                <p class="text-xs text-slate-500 mt-1">Directly tweak text or values to customize your portfolio representation.</p>
              </div>

              {/* General Core Bio Block */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-slate-400" htmlFor="edit_name">Full Name</label>
                  <input
                    id="edit_name"
                    type="text"
                    value={data.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-slate-600 text-white transition-colors"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-slate-400" htmlFor="edit_title">Professional Headline</label>
                  <input
                    id="edit_title"
                    type="text"
                    value={data.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-slate-600 text-white transition-colors"
                  />
                </div>
                <div class="md:col-span-2 space-y-1">
                  <label class="text-xs font-semibold text-slate-400" htmlFor="edit_tagline">Impact Slogan / Tagline</label>
                  <input
                    id="edit_tagline"
                    type="text"
                    value={data.tagline}
                    onChange={(e) => handleChange('tagline', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-slate-600 text-white transition-colors"
                  />
                </div>
                <div class="md:col-span-2 space-y-1">
                  <label class="text-xs font-semibold text-slate-400" htmlFor="edit_about">Biography (About Me)</label>
                  <textarea
                    id="edit_about"
                    rows={4}
                    value={data.aboutMe}
                    onChange={(e) => handleChange('aboutMe', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-slate-600 text-white resize-y transition-colors leading-relaxed"
                  />
                </div>
              </div>

              {/* Experience List Header & Block */}
              <div class="space-y-4 pt-4 border-t border-slate-900">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-bold text-slate-200">Experiences list</h4>
                  <button
                    id="add_exp_button"
                    type="button"
                    onClick={() => addArrayItem('experience')}
                    className="flex items-center gap-1 text-xs text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Role</span>
                  </button>
                </div>

                <div class="space-y-4">
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 relative space-y-3">
                      <button
                        type="button"
                        onClick={() => deleteArrayItem('experience', idx)}
                        className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/30 class-transition"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                        <div class="space-y-1">
                          <label class="text-[10px] uppercase font-bold text-slate-500">Role Title</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleArrayItemChange('experience', idx, 'role', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                        <div class="space-y-1">
                          <label class="text-[10px] uppercase font-bold text-slate-500">Company Name</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleArrayItemChange('experience', idx, 'company', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                        <div class="space-y-1">
                          <label class="text-[10px] uppercase font-bold text-slate-500">Duration Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => handleArrayItemChange('experience', idx, 'period', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                      </div>
                      <div class="space-y-1">
                        <label class="text-[10px] uppercase font-bold text-slate-500">What did you achieve?</label>
                        <textarea
                          rows={2}
                          value={exp.description}
                          onChange={(e) => handleArrayItemChange('experience', idx, 'description', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none resize-y leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education List Header & Block */}
              <div class="space-y-4 pt-4 border-t border-slate-900">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-bold text-slate-200">Education Details</h4>
                  <button
                    id="add_edu_button"
                    type="button"
                    onClick={() => addArrayItem('education')}
                    className="flex items-center gap-1 text-xs text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Education</span>
                  </button>
                </div>

                <div class="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 relative space-y-3">
                      <button
                        type="button"
                        onClick={() => deleteArrayItem('education', idx)}
                        className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/30 class-transition"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                        <div class="space-y-1">
                          <label class="text-[10px] uppercase font-bold text-slate-500">Degree / Focus Degree</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleArrayItemChange('education', idx, 'degree', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                        <div class="space-y-1">
                          <label class="text-[10px] uppercase font-bold text-slate-500">School / Institution</label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => handleArrayItemChange('education', idx, 'school', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                        <div class="space-y-1">
                          <label class="text-[10px] uppercase font-bold text-slate-500">Duration Period</label>
                          <input
                            type="text"
                            value={edu.period}
                            onChange={(e) => handleArrayItemChange('education', idx, 'period', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                        <div class="md:col-span-3 space-y-1">
                          <label class="text-[10px] uppercase font-bold text-slate-500">Additional academic highlights (Optional)</label>
                          <input
                            type="text"
                            value={edu.description || ""}
                            onChange={(e) => handleArrayItemChange('education', idx, 'description', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Editor Panel */}
              <div class="space-y-4 pt-4 border-t border-slate-900">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-bold text-slate-200">Skills Groupings & Tags</h4>
                  <button
                    id="add_skills_cat_button"
                    type="button"
                    onClick={() => addArrayItem('skills')}
                    className="flex items-center gap-1 text-xs text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Category</span>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.skills.map((cat, catIdx) => (
                    <div key={catIdx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 relative space-y-3">
                      <button
                        type="button"
                        onClick={() => deleteArrayItem('skills', catIdx)}
                        className="absolute right-3 top-3 p-1 rounded-lg bg-slate-950 border border-slate-850 text-slate-500 hover:text-rose-400 hover:border-rose-500/30"
                        title="Delete category"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                      <div class="space-y-1 pr-6">
                        <label class="text-[10px] uppercase font-bold text-slate-500">Category Tag</label>
                        <input
                          type="text"
                          value={cat.category}
                          onChange={(e) => handleArrayItemChange('skills', catIdx, 'category', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                        />
                      </div>

                      <div class="space-y-2">
                        <label class="text-[10px] uppercase font-bold text-slate-500 block mb-1">Tags</label>
                        <div class="flex flex-wrap gap-2">
                          {cat.items.map((skill, skillIdx) => (
                            <div key={skillIdx} class="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs">
                              <input
                                type="text"
                                value={skill}
                                onChange={(e) => handleSkillItemChange(catIdx, skillIdx, e.target.value)}
                                className="bg-transparent text-white border-none outline-none focus:ring-0 xs:w-16 w-20 text-xs py-0.5"
                              />
                              <button
                                type="button"
                                onClick={() => deleteSkillItem(catIdx, skillIdx)}
                                className="text-slate-500 hover:text-rose-400 ml-1 font-semibold"
                                title="Remove tag"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addSkillItem(catIdx)}
                            className="bg-slate-900 hover:bg-slate-850 border border-dashed border-slate-800 hover:border-slate-750 text-[10px] text-slate-400 hover:text-white px-2.5 py-1 rounded"
                          >
                            + Tag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info Form Section */}
              <div class="space-y-4 pt-4 border-t border-slate-900">
                <h4 class="text-sm font-bold text-slate-200">Contact Details</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="text-xs font-semibold text-slate-400" htmlFor="edit_email">Email address</label>
                    <input
                      id="edit_email"
                      type="email"
                      value={data.contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-slate-600 text-white transition-colors"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs font-semibold text-slate-400" htmlFor="edit_location">General Location</label>
                    <input
                      id="edit_location"
                      type="text"
                      value={data.contact.location}
                      onChange={(e) => handleContactChange('location', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-slate-600 text-white transition-colors"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs font-semibold text-slate-400" htmlFor="edit_linkedin">LinkedIn profile handle</label>
                    <input
                      id="edit_linkedin"
                      type="text"
                      value={data.contact.linkedin || ""}
                      onChange={(e) => handleContactChange('linkedin', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-slate-600 text-white transition-colors"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs font-semibold text-slate-400" htmlFor="edit_github">GitHub profile handle</label>
                    <input
                      id="edit_github"
                      type="text"
                      value={data.contact.github || ""}
                      onChange={(e) => handleContactChange('github', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-slate-600 text-white transition-colors"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="rendered-portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              class="text-slate-100 font-sans"
            >
              {/* Actual Single Page Elegant Showcase Portfolio UI */}
              
              {/* Dynamic Header */}
              <div class="max-w-4xl mx-auto px-6 md:px-10 py-6 border-b border-slate-900/40 flex items-center justify-between select-none">
                <span class="font-extrabold text-base tracking-tight text-white hover:text-slate-300 transition-colors">
                  {data.name}
                </span>

                <div class="flex items-center gap-4 text-xs font-semibold text-slate-400">
                  <a href="#about_sec" class="hover:text-white transition-colors">About</a>
                  <a href="#timeline_sec" class="hover:text-white transition-colors">Timeline</a>
                  <a href="#skills_sec" class="hover:text-white transition-colors">Skills</a>
                  <a href="#contact_sec" class="hover:text-white transition-colors">Contact</a>
                </div>
              </div>

              {/* 1. HERO SECTION */}
              <section id="hero_sec" class="max-w-4xl mx-auto px-6 md:px-10 pt-20 pb-16 relative">
                <div class={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full ${style.badge} mb-6 w-fit`}>
                  <span class={`w-1.5 h-1.5 ${style.bg} rounded-full`}></span>
                  Active / Open to Roles
                </div>

                <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                  Hi, I'm <span class="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">{data.name}</span>
                </h1>
                <h2 className={`text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent mb-6`}>
                  {data.title}
                </h2>
                
                <p class="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mb-8 font-light">
                  {data.tagline}
                </p>

                <div class="flex items-center gap-4">
                  <a
                    href="#contact_sec"
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all bg-white text-slate-950 hover:bg-slate-200 shadow-md shadow-white/5 cursor-pointer`}
                  >
                    Get in Touch
                  </a>
                  <a
                    href="#timeline_sec"
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-slate-750 transition-all"
                  >
                    Explore Experience
                  </a>
                </div>
              </section>

              {/* 2. ABOUT ME SUMMARY */}
              <section id="about_sec" class="max-w-4xl mx-auto px-6 md:px-10 py-16 border-t border-slate-900/50 scroll-mt-10">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div class="md:col-span-1">
                    <span className={`text-[10px] tracking-widest font-bold uppercase ${style.text}`}>Overview</span>
                    <h3 class="text-lg font-bold text-white mt-1">Biography</h3>
                  </div>
                  <div class="md:col-span-2">
                    <p class="text-slate-400 leading-relaxed text-sm md:text-base font-light whitespace-pre-line">
                      {data.aboutMe}
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. EXPERIENCE & EDUCATION timeline */}
              <section id="timeline_sec" class="max-w-4xl mx-auto px-6 md:px-10 py-16 border-t border-slate-900/50 scroll-mt-10">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div class="md:col-span-1">
                    <span className={`text-[10px] tracking-widest font-bold uppercase ${style.text}`}>Timeline</span>
                    <h3 class="text-lg font-bold text-white mt-1">Experience & Edu</h3>
                    <p class="text-xs text-slate-500 mt-2 font-light leading-relaxed">
                      Detailed chronological trajectory of my career accomplishments and educational certifications.
                    </p>
                  </div>

                  <div class="md:col-span-2 space-y-14">
                    {/* Experience Stack */}
                    <div class="space-y-6">
                      <h4 class="text-xs font-bold tracking-widest text-slate-400 uppercase inline-flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        Professional Career History
                      </h4>
                      
                      <div class="relative border-l border-slate-900 pl-6 ml-1 space-y-8">
                        {data.experience.map((exp, expIdx) => (
                          <div key={expIdx} class="group relative">
                            {/* Bullet decoration */}
                            <div className={`absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-slate-950 border-2 border-slate-800 transition-colors ${style.hoverBg}`} />
                            <div class="flex items-center justify-between flex-wrap gap-2">
                              <span className={`text-xs font-bold ${style.text}`}>{exp.period}</span>
                            </div>
                            <h5 class="text-sm font-bold text-white mt-1">{exp.role}</h5>
                            <span class="text-xs text-slate-500 font-medium">{exp.company}</span>
                            <p class="text-xs text-slate-400 mt-3 font-light leading-relaxed whitespace-pre-line">
                              {exp.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education Stack */}
                    {data.education && data.education.length > 0 && (
                      <div class="space-y-6 pt-4">
                        <h4 class="text-xs font-bold tracking-widest text-slate-400 uppercase inline-flex items-center gap-2">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                          Education & Academics
                        </h4>

                        <div class="relative border-l border-slate-900 pl-6 ml-1 space-y-8">
                          {data.education.map((edu, eduIdx) => (
                            <div key={eduIdx} class="group relative">
                              <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-slate-950 border border-slate-800 group-hover:bg-slate-700 transition-colors" />
                              <div class="flex items-center justify-between flex-wrap gap-2">
                                <span class="text-xs font-bold text-slate-500">{edu.period}</span>
                              </div>
                              <h5 class="text-sm font-bold text-white mt-1">{edu.degree}</h5>
                              <span className={`text-xs font-medium ${style.text}`}>{edu.school}</span>
                              {edu.description && (
                                <p class="text-xs text-slate-500 mt-2 font-light leading-relaxed">
                                  {edu.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* 4. SKILLS */}
              <section id="skills_sec" class="max-w-4xl mx-auto px-6 md:px-10 py-16 border-t border-slate-900/50 scroll-mt-10 animate-fade">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div class="md:col-span-1">
                    <span className={`text-[10px] tracking-widest font-bold uppercase ${style.text}`}>Expertise</span>
                    <h3 class="text-lg font-bold text-white mt-1">Skills & Stack</h3>
                    <p class="text-xs text-slate-500 mt-2 font-light leading-relaxed">
                      Primary technologies, software utilities, and concepts I leverage daily.
                    </p>
                  </div>
                  
                  <div class="md:col-span-2 space-y-8">
                    {data.skills.map((cat, catIdx) => (
                      <div key={catIdx} class="space-y-2.5">
                        <span class="text-[10px] uppercase font-bold tracking-widest text-slate-500">{cat.category}</span>
                        <div class="flex flex-wrap gap-2">
                          {cat.items.map((skill, skillIdx) => (
                            <span
                              key={skillIdx}
                              className={`px-3 py-1.5 rounded-xl text-xs bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-300 transition-all font-light`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 5. CONTACT footer */}
              <section id="contact_sec" class="max-w-4xl mx-auto px-6 md:px-10 py-20 border-t border-slate-900/50 scroll-mt-10">
                <div class="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden text-center">
                  <div className={`absolute inset-0 bg-gradient-to-r ${style.hoverBg} hover:opacity-10 opacity-0 transition-opacity duration-500`} />
                  <div className={`absolute top-0 right-1/2 translate-x-1/2 w-44 h-44 rounded-full ${style.text}/5 blur-2xl pointer-events-none`} />

                  <span className={`text-[10px] tracking-widest font-bold uppercase ${style.text} mb-3 block`}>Get in Touch</span>
                  <h3 class="text-xl md:text-3xl font-extrabold text-white mb-3">Let's create something together!</h3>
                  <p class="text-xs md:text-sm text-slate-400 max-w-lg mx-auto mb-8 font-light">
                    Interested in connecting, discussing role opportunities, or exploring open source features? Reach out via any of the channels below.
                  </p>

                  <div class="inline-flex flex-col md:flex-row items-center gap-6 justify-center mb-8">
                    {data.contact.email && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(data.contact.email, "email")}
                        className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <span class="p-2 rounded-lg bg-slate-950 border border-slate-850 text-slate-400">
                          <Mail class="w-3.5 h-3.5" />
                        </span>
                        <span>{data.contact.email}</span>
                        {copiedText === "email" && <span className={`text-[10px] px-1.5 py-0.5 rounded ${style.badge}`}>Copied!</span>}
                      </button>
                    )}

                    {data.contact.location && (
                      <span class="flex items-center gap-2.5 text-xs text-slate-300">
                        <span class="p-2 rounded-lg bg-slate-950 border border-slate-850 text-slate-400">
                          <MapPin class="w-3.5 h-3.5" />
                        </span>
                        <span>{data.contact.location}</span>
                      </span>
                    )}
                  </div>

                  <div class="flex items-center justify-center gap-4">
                    {data.contact.linkedin && (
                      <a
                        href={`https://${data.contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-2xl text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-300 flex items-center gap-1.5 text-xs"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-40" />
                      </a>
                    )}
                    {data.contact.github && (
                      <a
                        href={`https://${data.contact.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-2xl text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-300 flex items-center gap-1.5 text-xs"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-40" />
                      </a>
                    )}
                  </div>
                </div>
              </section>

              {/* Small credits footer */}
              <footer class="border-t border-slate-900 py-6 text-center text-[10px] text-slate-600 tracking-wide select-none">
                <p>&copy; {new Date().getFullYear()} {data.name}. Generated dynamically with Personal Portfolio Generator.</p>
              </footer>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
