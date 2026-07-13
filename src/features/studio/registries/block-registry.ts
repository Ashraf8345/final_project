/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabling explicit-any rule is justified in this block registry to allow flexible plugin configurations and dynamic rendering types.
import { RegisteredBlock } from "../types";
import { z } from "zod";
import {
  HeroCanvasBlock,
  AboutCanvasBlock,
  SkillsCanvasBlock,
  ProjectsCanvasBlock,
  ContactCanvasBlock,
  TestimonialsCanvasBlock,
  CodeSnippetCanvasBlock,
  CalloutCanvasBlock,
  DividerCanvasBlock,
  QuoteCanvasBlock,
  ImageCanvasBlock,
  VideoCanvasBlock,
  HtmlCanvasBlock,
  GalleryCanvasBlock,
  TimelineCanvasBlock,
  MarkdownCanvasBlock,
  SpacerCanvasBlock,
  ButtonGroupCanvasBlock,
} from "../components/canvas-blocks";
import {
  Sparkles,
  FileText,
  Settings,
  Award,
  Layers,
  Users,
  Code,
  AlertCircle,
  Minus,
  Quote as QuoteIcon,
  Image as ImageIcon,
  Video as VideoIcon,
  Terminal,
  LayoutGrid,
  Calendar,
  Maximize,
  Play,
} from "lucide-react";

class BlockRegistryClass {
  private registry = new Map<string, RegisteredBlock>();

  register(block: RegisteredBlock) {
    this.registry.set(block.type, block);
  }

  get(type: string): RegisteredBlock | undefined {
    return this.registry.get(type);
  }

  getAll(): RegisteredBlock[] {
    return Array.from(this.registry.values());
  }
}

export const BlockRegistry = new BlockRegistryClass();

// ==========================================
// REGISTER INITIAL BLOCKS
// ==========================================

// 1. HERO BLOCK
BlockRegistry.register({
  id: "hero",
  type: "hero",
  category: "hero",
  icon: Sparkles as any,
  defaultProps: {
    title: "Hello, I am a Developer",
    subtitle: "Welcome to my portfolio",
    ctaText: "Get in touch",
    ctaUrl: "#contact",
    avatarUrl: "",
  },
  schema: z.object({
    title: z.string().min(1),
    subtitle: z.string(),
    ctaText: z.string(),
    ctaUrl: z.string(),
    avatarUrl: z.string().optional(),
  }),
  canvasRenderer: HeroCanvasBlock as any,
  inspectorPanels: ["typography", "spacing", "colors"],
  aiCapabilities: {
    canRewrite: true,
    prompts: [
      "Make my name/headline more catchy",
      "Write a professional elevator pitch for the subtitle",
      "Create a persuasive call-to-action text",
    ],
  },
});

// 2. ABOUT BLOCK
BlockRegistry.register({
  id: "about",
  type: "about",
  category: "about",
  icon: FileText as any,
  defaultProps: {
    title: "About Me",
    text: "Write your professional experience summary here...",
  },
  schema: z.object({
    title: z.string().min(1),
    text: z.string().min(10),
  }),
  canvasRenderer: AboutCanvasBlock as any,
  inspectorPanels: ["typography", "spacing"],
  aiCapabilities: {
    canRewrite: true,
    prompts: [
      "Rewrite my bio to sound like a senior engineer",
      "Shorten this about section for maximum readability",
      "Improve the vocabulary and style",
    ],
  },
});

// 3. SKILLS BLOCK
BlockRegistry.register({
  id: "skills",
  type: "skills",
  category: "showcase",
  icon: Award as any,
  defaultProps: {
    title: "Skills & Stack",
    layout: "categories",
    frontend: ["React", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Convex", "PostgreSQL"],
    devops: ["Docker", "Vercel", "GitHub Actions"],
  },
  schema: z.object({
    title: z.string().min(1),
    layout: z.enum(["badges", "categories"]),
    frontend: z.array(z.string()),
    backend: z.array(z.string()),
    devops: z.array(z.string()),
  }),
  canvasRenderer: SkillsCanvasBlock as any,
  inspectorPanels: ["spacing", "colors"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});

// 4. PROJECTS BLOCK
BlockRegistry.register({
  id: "projects",
  type: "projects",
  category: "showcase",
  icon: Layers as any,
  defaultProps: {
    title: "Featured Projects",
    projectIds: [],
    showLanguages: true,
    showStars: true,
  },
  schema: z.object({
    title: z.string().min(1),
    projectIds: z.array(z.number()),
    showLanguages: z.boolean(),
    showStars: z.boolean(),
  }),
  canvasRenderer: ProjectsCanvasBlock as any,
  inspectorPanels: ["spacing", "colors", "projects"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});

// 5. CONTACT BLOCK
BlockRegistry.register({
  id: "contact",
  type: "contact",
  category: "custom",
  icon: Settings as any,
  defaultProps: {
    title: "Connect With Me",
    description: "Feel free to drop me a message!",
    email: "",
    githubUrl: "",
    linkedinUrl: "",
  },
  schema: z.object({
    title: z.string().min(1),
    description: z.string(),
    email: z.string().email().or(z.literal("")),
    githubUrl: z.string().url().or(z.literal("")),
    linkedinUrl: z.string().url().or(z.literal("")),
  }),
  canvasRenderer: ContactCanvasBlock as any,
  inspectorPanels: ["typography", "spacing", "colors"],
  aiCapabilities: {
    canRewrite: true,
    prompts: [
      "Make my contact description sound warm and inviting",
      "Draft a strong CTA invitation for recruiters",
    ],
  },
});

// 6. TESTIMONIALS BLOCK
BlockRegistry.register({
  id: "testimonials",
  type: "testimonials",
  category: "custom",
  icon: Users as any,
  defaultProps: {
    title: "Testimonials",
    items: [
      {
        id: "test-1",
        avatar: "",
        name: "Sarah Connor",
        role: "Principal Architect",
        company: "Cyberdyne Systems",
        quote: "Incredibly fast execution and absolute dedication to production code quality.",
        rating: 5,
      },
      {
        id: "test-2",
        avatar: "",
        name: "John Doe",
        role: "Engineering Manager",
        company: "Acme Corp",
        quote: "Devora Studio completely transformed how our team presents engineering portfolios.",
        rating: 5,
      },
    ],
  },
  schema: z.object({
    title: z.string().min(1),
    items: z.array(
      z.object({
        id: z.string(),
        avatar: z.string().optional(),
        name: z.string(),
        role: z.string(),
        company: z.string(),
        quote: z.string(),
        rating: z.number().optional(),
      })
    ),
  }),
  canvasRenderer: TestimonialsCanvasBlock as any,
  inspectorPanels: ["spacing", "colors"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});

// 7. CODE SNIPPET BLOCK
BlockRegistry.register({
  id: "code",
  type: "code",
  category: "custom",
  icon: Code as any,
  defaultProps: {
    title: "Code Example",
    language: "typescript",
    code: `const devora = new StudioEditor();\ndevora.buildBeautifulBranding();`,
  },
  schema: z.object({
    title: z.string(),
    language: z.string(),
    code: z.string(),
  }),
  canvasRenderer: CodeSnippetCanvasBlock as any,
  inspectorPanels: ["typography", "spacing"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});

// 8. CALLOUT BLOCK
BlockRegistry.register({
  id: "callout",
  type: "callout",
  category: "custom",
  icon: AlertCircle as any,
  defaultProps: {
    type: "info",
    title: "Tip",
    text: "Remember to connect your GitHub profile to synchronize repositories in real-time!",
  },
  schema: z.object({
    type: z.enum(["info", "warning", "success", "tip"]),
    title: z.string(),
    text: z.string(),
  }),
  canvasRenderer: CalloutCanvasBlock as any,
  inspectorPanels: ["spacing", "colors"],
  aiCapabilities: {
    canRewrite: true,
    prompts: ["Make this tip more technical", "Explain this alert concisely"],
  },
});

// 9. DIVIDER BLOCK
BlockRegistry.register({
  id: "divider",
  type: "divider",
  category: "custom",
  icon: Minus as any,
  defaultProps: {
    thickness: 1,
    style: "solid",
    color: "#e4e4e7",
  },
  schema: z.object({
    thickness: z.number(),
    style: z.enum(["solid", "dashed", "dotted"]),
    color: z.string(),
  }),
  canvasRenderer: DividerCanvasBlock as any,
  inspectorPanels: ["spacing", "colors"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});

// 10. QUOTE BLOCK
BlockRegistry.register({
  id: "quote",
  type: "quote",
  category: "custom",
  icon: QuoteIcon as any,
  defaultProps: {
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
  },
  schema: z.object({
    text: z.string(),
    author: z.string(),
  }),
  canvasRenderer: QuoteCanvasBlock as any,
  inspectorPanels: ["typography", "spacing", "colors"],
  aiCapabilities: {
    canRewrite: true,
    prompts: ["Make this quote sound more inspirational", "Synthesize this statement"],
  },
});

// 11. IMAGE BLOCK
BlockRegistry.register({
  id: "image",
  type: "image",
  category: "custom",
  icon: ImageIcon as any,
  defaultProps: {
    url: "",
    alt: "Image layout asset",
    caption: "",
  },
  schema: z.object({
    url: z.string(),
    alt: z.string(),
    caption: z.string(),
  }),
  canvasRenderer: ImageCanvasBlock as any,
  inspectorPanels: ["spacing", "image"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});

// 12. VIDEO BLOCK
BlockRegistry.register({
  id: "video",
  type: "video",
  category: "custom",
  icon: VideoIcon as any,
  defaultProps: {
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    provider: "direct",
    autoplay: false,
  },
  schema: z.object({
    url: z.string(),
    provider: z.enum(["direct", "youtube", "vimeo"]),
    autoplay: z.boolean(),
  }),
  canvasRenderer: VideoCanvasBlock as any,
  inspectorPanels: ["spacing", "video"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});

// 13. HTML BLOCK (SCAFFOLD)
BlockRegistry.register({
  id: "html",
  type: "html",
  category: "custom",
  icon: Terminal as any,
  defaultProps: {
    html: "<div class='p-4 border rounded-xl bg-muted/40 text-center font-bold'>Custom HTML Scaffold Box</div>",
  },
  schema: z.object({
    html: z.string(),
  }),
  canvasRenderer: HtmlCanvasBlock as any,
  inspectorPanels: ["spacing"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});

// 14. GALLERY BLOCK
BlockRegistry.register({
  id: "gallery",
  type: "gallery",
  category: "custom",
  icon: LayoutGrid as any,
  defaultProps: {
    title: "Project Gallery",
    items: [
      { id: "g-1", url: "", caption: "Gallery Image 1" },
      { id: "g-2", url: "", caption: "Gallery Image 2" },
      { id: "g-3", url: "", caption: "Gallery Image 3" },
    ],
  },
  schema: z.object({
    title: z.string().min(1),
    items: z.array(
      z.object({
        id: z.string(),
        url: z.string(),
        caption: z.string(),
      })
    ),
  }),
  canvasRenderer: GalleryCanvasBlock as any,
  inspectorPanels: ["spacing", "colors"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});

// 15. TIMELINE BLOCK
BlockRegistry.register({
  id: "timeline",
  type: "timeline",
  category: "custom",
  icon: Calendar as any,
  defaultProps: {
    title: "Experience Timeline",
    items: [
      {
        id: "t-1",
        date: "2024 - Present",
        title: "Senior Full Stack Engineer",
        subtitle: "Devora Studio",
        text: "Pioneered development of visual block compilers and low-code designer frameworks.",
      },
      {
        id: "t-2",
        date: "2022 - 2024",
        title: "Frontend Developer",
        subtitle: "Github Inc",
        text: "Crafted dashboard components and polished accessible layout engines.",
      },
    ],
  },
  schema: z.object({
    title: z.string().min(1),
    items: z.array(
      z.object({
        id: z.string(),
        date: z.string(),
        title: z.string(),
        subtitle: z.string(),
        text: z.string(),
      })
    ),
  }),
  canvasRenderer: TimelineCanvasBlock as any,
  inspectorPanels: ["spacing", "colors"],
  aiCapabilities: {
    canRewrite: true,
    prompts: ["Make the timeline descriptions sound more professional", "Enhance technical details in history"],
  },
});

// 16. MARKDOWN BLOCK
BlockRegistry.register({
  id: "markdown",
  type: "markdown",
  category: "custom",
  icon: FileText as any,
  defaultProps: {
    title: "Markdown Readme",
    markdown: "# Professional Experience\n\n- Build high-performance client panels\n- Synchronize schema structures in real-time\n- Optimize bundle sizing & SEO metrics",
  },
  schema: z.object({
    title: z.string(),
    markdown: z.string(),
  }),
  canvasRenderer: MarkdownCanvasBlock as any,
  inspectorPanels: ["typography", "spacing"],
  aiCapabilities: {
    canRewrite: true,
    prompts: ["Refine markdown copy for technical clarity", "Expand details in list format"],
  },
});

// 17. SPACER BLOCK
BlockRegistry.register({
  id: "spacer",
  type: "spacer",
  category: "custom",
  icon: Maximize as any,
  defaultProps: {
    height: 32,
  },
  schema: z.object({
    height: z.number(),
  }),
  canvasRenderer: SpacerCanvasBlock as any,
  inspectorPanels: ["spacing"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});

// 18. BUTTON GROUP BLOCK
BlockRegistry.register({
  id: "buttons",
  type: "buttons",
  category: "custom",
  icon: Play as any,
  defaultProps: {
    align: "left",
    items: [
      { id: "btn-1", label: "View Resume", url: "/resume", variant: "primary" },
      { id: "btn-2", label: "Github Profile", url: "https://github.com", variant: "outline" },
    ],
  },
  schema: z.object({
    align: z.enum(["left", "center", "right"]),
    items: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        url: z.string(),
        variant: z.enum(["primary", "secondary", "outline"]),
      })
    ),
  }),
  canvasRenderer: ButtonGroupCanvasBlock as any,
  inspectorPanels: ["spacing", "colors"],
  aiCapabilities: {
    canRewrite: false,
    prompts: [],
  },
});
