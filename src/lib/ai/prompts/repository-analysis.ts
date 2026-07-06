export interface RepositoryInput {
  name: string;
  description: string | null;
  readme: string | null;
  primaryLanguage: string | null;
  topics: string[];
  stars: number;
  forks: number;
}

export function getRepositoryAnalysisPrompt(repo: RepositoryInput): { system: string; prompt: string } {
  const system = `You are an expert technical recruiter and senior software architect. Your job is to analyze a developer's GitHub repository and generate recruiter-quality structured insights about it.
Your analysis must be evidence-based, objective, and highlight both technical depth and business impact. Avoid generic marketing buzzwords (like "groundbreaking" or "revolutionary"). Focus on concrete architectural choices, documentation standards, and overall repository health.`;

  const prompt = `Please analyze the following GitHub repository:

- **Repository Name**: ${repo.name}
- **Description**: ${repo.description || "No description provided."}
- **Primary Language**: ${repo.primaryLanguage || "Not specified."}
- **Topics/Tags**: ${repo.topics.length > 0 ? repo.topics.join(", ") : "None."}
- **Stars**: ${repo.stars}
- **Forks**: ${repo.forks}

- **README Content**:
"""
${repo.readme ? repo.readme.substring(0, 12000) : "No README provided."}
"""

Please evaluate the repository and generate:
1. A technical summary explaining the architecture, core patterns, and codebase design.
2. A resume-ready bullet point showcasing action, metrics, and accomplishments (STAR format).
3. The business, product, or user value this project delivers (e.g. optimizing workflow, automation, user engagement).
4. The key technologies detected (libraries, frameworks, utilities).
5. 2-3 specific technical improvements or suggestions (e.g., adding tests, improving CI/CD, caching, modularity).
6. A README analysis scoring its documentation quality out of 100 and providing concrete improvement ideas.
7. A Repository Health score out of 100 based on activity signals, licensing, setup instructions, and code structure.`;

  return { system, prompt };
}
