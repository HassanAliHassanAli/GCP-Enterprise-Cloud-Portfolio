export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ContactInfo {
  email: string;
  location: string;
  linkedin?: string;
  github?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  aboutMe: string;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  contact: ContactInfo;
  aestheticAccent: 'emerald' | 'indigo' | 'violet' | 'sky' | 'amber' | 'rose';
}

export const SAMPLE_BIOS = [
  {
    title: "Full Stack Engineer & OSS Maintainer",
    text: `Hassan El-Hassan
Senior Javascript Specialist & Open-source Advocate
London, UK | contact@hassan.dev | github.com/hassanelhassan

I have over 8 years of enterprise React & Node.js application experience. I love styling sleek websites with TailwindCSS, creating high-performance APIs with Fastify/Express, and tinkering with local LLMs.
Previously worked as Lead Developer at Vercel (2022-2025) and Senior Engineer at Stripe (2018-2022).
Graduated from Imperial College London with a BEng in Computing with First Class Honours.
My skills include: TypeScript, Next.js, GraphQL, Redis, PostgreSQL, AWS, UI/UX Design, Docker, and Kubernetes.`
  },
  {
    title: "Senior Product & Brand Designer",
    text: `Elena Rostova
Creative Lead & Brand Architect
San Francisco, CA | elena@creative-studio.co | linkedin.com/in/elena-rostova

I am a passonate product designer with a decade of expertise crafting visual systems, editorial lookbooks, and high-conversion SaaS web applications. My design philosophy is rooted in minimal Swiss styles, beautiful high-contrast typography, and fluid movement. I have led designer teams at Airbnb and Figma, overseeing global design system rollouts.
Holding an MFA in Graphic Design from RISD, I specialize in Figma design, typography, Webflow, CSS art, visual brand positioning, motion, and reactive animated frameworks.`
  },
  {
    title: "AI Researcher & Data scientist",
    text: `Dr. Marcus Vance
Machine Learning Engineer & Applied Scientist
Boston, MA | m.vance@ai-labs.org | github.com/marcusvance

PhD in Computer Science from MIT with focus on Generative AI and reinforcement learning. I translate state-of-the-art academic papers into lightweight production models.
Research Scientist at Google DeepMind (2023-Present) focused on context window optimizations for language models. Authored 12+ peer-reviewed papers at NeurIPS and ICML.
Expert in Python, PyTorch, JAX, CUDA, distributed training, data processing pipelines, Pandas, scikit-learn, and vector indexing database systems.`
  }
];

export const INITIAL_PORTFOLIO: PortfolioData = {
  name: "Dr. Marcus Vance",
  title: "Machine Learning Researcher",
  tagline: "Bridging complex artificial intelligence models into lightweight, responsive production architecture.",
  aboutMe: "I am an applied research scientist with a passion for designing streamlined, context-efficient language agent workflows. With a background originating from cutting edge research at MIT, I balance academic rigour with clean engineering to yield robust, production-ready AI pipelines.",
  experience: [
    {
      role: "Research Scientist",
      company: "Google DeepMind",
      period: "2023 - Present",
      description: "Pioneered architectural enhancements leading to a a 30% reduction in token retrieval latency. Led development of hybrid search grounding integrations across core text generation pipelines."
    },
    {
      role: "Applied ML Engineer",
      company: "Anthropic",
      period: "2021 - 2023",
      description: "Spearheaded reinforcement learning with human feedback datasets creation. Maintained mission-critical training orchestration clusters of over 500 GPUs."
    }
  ],
  education: [
    {
      degree: "PhD in Computer Science",
      school: "MIT (Massachusetts Institute of Technology)",
      period: "2017 - 2021",
      description: "Dissertation focused on generative model optimizations and neural network compression techniques. Nominated for outstanding graduate thesis award."
    }
  ],
  skills: [
    {
      category: "Machine Learning",
      items: ["PyTorch", "JAX", "Reinforcement Learning", "Transformers", "Model Quantization"]
    },
    {
      category: "Backend & Systems",
      items: ["Python", "C++", "CUDA", "FastAPI", "Docker", "Kubernetes", "Vector Databases"]
    }
  ],
  contact: {
    email: "m.vance@ai-labs.org",
    location: "Boston, MA",
    linkedin: "linkedin.com/in/marcus-vance-ai",
    github: "github.com/marcusvance"
  },
  aestheticAccent: "indigo"
};
