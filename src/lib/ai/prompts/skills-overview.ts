export interface RawSkillInput {
  repoName: string;
  languages: string[];
  topics: string[];
  readmeSnippets: string[];
}

export function getSkillsOverviewPrompt(repos: RawSkillInput[]): { system: string; prompt: string } {
  const system = `You are a static code analyzer and technical screener. Your job is to analyze a list of projects (their languages, topics, and README excerpts) and compile a categorized inventory of technologies, frameworks, and tools used.
Only include technologies that are clearly present in the metadata or READMEs. Do not guess or extrapolate.`;

  const repoDetails = repos
    .map(
      (r) =>
        `- **${r.repoName}**:
  * Languages: ${r.languages.join(", ")}
  * Topics: ${r.topics.join(", ")}
  * Readme Excerpt: ${r.readmeSnippets.join(" | ")}`
    )
    .join("\n\n");

  const prompt = `Please analyze the following project data and group all detected skills and technologies into the specified categories. Do not list generic concepts; list concrete tools, packages, languages, and frameworks:

${repoDetails}

Categorize the technologies into the following arrays:
- **frontend**: React, Vue, Svelte, Tailwind, Next.js, HTML/CSS, etc.
- **backend**: Node.js, Express, NestJS, Go, Python, Django, FastAPI, Ruby on Rails, etc.
- **mobile**: React Native, Flutter, Swift, Kotlin, Objective-C, Java, etc.
- **ai**: TensorFlow, PyTorch, Hugging Face, LangChain, OpenAI, Gemini, scikit-learn, etc.
- **devops**: Docker, Kubernetes, GitHub Actions, Jenkins, Terraform, Ansible, etc.
- **cloud**: AWS, Google Cloud, Vercel, Netlify, Supabase, Firebase, Heroku, Azure, etc.
- **database**: PostgreSQL, MySQL, SQLite, MongoDB, Redis, Prisma, Convex, Drizzle, DynamoDB, etc.`;

  return { system, prompt };
}
