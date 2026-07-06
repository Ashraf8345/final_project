export interface RepoScoreInput {
  name: string;
  repoId: number;
  overallScore: number;
  technicalSummary: string;
  readmeScore: number;
}

export function getRecommendationsPrompt(
  repos: RepoScoreInput[],
  skills: { frontend: string[]; backend: string[]; DevOps: string[] }
): { system: string; prompt: string } {
  const system = `You are a career development coach and senior technical advisor for software engineers.
Your goal is to evaluate a developer's portfolio (their project scope, technology spread, README quality, and scores) and offer constructive, actionable recommendations.
Identify their core strengths, highlight gaps or weaknesses in their portfolio, suggest missing types of projects to improve their marketability, and suggest which 2-3 repositories they should showcase as their featured projects.`;

  const repoBulletins = repos
    .map(
      (r) =>
        `- **${r.name}** (Score: ${Math.round(r.overallScore)}/100, README: ${r.readmeScore}/100): ${r.technicalSummary}`
    )
    .join("\n");

  const prompt = `Please review this developer's portfolio assessment and suggest improvements:

**Portfolio Repositories & Assessment**:
${repoBulletins}

**Detected Skill Highlights**:
- Frontend: ${skills.frontend.join(", ") || "None"}
- Backend: ${skills.backend.join(", ") || "None"}
- DevOps/Cloud: ${skills.DevOps.join(", ") || "None"}

Please generate:
1. **strengths**: A list of 3-5 technical or architectural strengths based on their repository evidence (e.g. "Excellent TypeScript patterns", "Strong database schemas").
2. **weaknesses**: A list of 2-4 areas of improvement or skill gaps identified (e.g. "Lack of unit tests", "No CI/CD configuration").
3. **missingPortfolioContent**: A list of 2-3 projects or sections they should build next to complete their portfolio (e.g. "A full-stack CRUD application with authentication", "A project showing serverless backend API integrations").
4. **suggestedFeaturedRepos**: A list of the names of 2-3 specific repositories from the portfolio that represent their best work and should be featured on their public profile page.`;

  return { system, prompt };
}
