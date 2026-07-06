export interface ProfileInput {
  username: string;
  displayName: string | null;
  bio: string | null;
  followers: number;
  publicRepos: number;
}

export interface AnalyzedRepoInput {
  name: string;
  primaryLanguage: string | null;
  technicalSummary: string;
  resumeSummary: string;
  businessImpact: string;
}

export function getCareerSummaryPrompt(
  profile: ProfileInput,
  repos: AnalyzedRepoInput[]
): { system: string; prompt: string } {
  const system = `You are a professional resume writer and talent agent representing software engineers.
Your goal is to synthesize a developer's GitHub history and profile details into a compelling career summary.
Avoid generic AI fluff (like "passionate developer", "expert problem solver", "detail-oriented coding enthusiast").
Instead, frame their expertise based on concrete evidence in their code repositories: what they built, their primary tech stack, and their engineering strengths.`;

  const repoBulletins = repos
    .map(
      (r) =>
        `- **${r.name}** (${r.primaryLanguage || "Unknown"}):
  * Technical Scope: ${r.technicalSummary}
  * Highlight: ${r.resumeSummary}
  * Value: ${r.businessImpact}`
    )
    .join("\n\n");

  const prompt = `Please generate a career summary and pitch deck for this developer based on their profile and repositories:

**Developer Profile**:
- **Username**: ${profile.username}
- **Display Name**: ${profile.displayName || "Not set."}
- **Bio**: ${profile.bio || "No bio provided."}
- **Repositories count**: ${profile.publicRepos}
- **Followers**: ${profile.followers}

**Analyzed Projects**:
${repoBulletins || "No projects analyzed yet."}

Please generate:
1. A **Professional Summary**: A cohesive 1-2 paragraph description of their software engineering expertise, core specializations, and typical problems they solve based on their projects.
2. A **Recruiter Pitch**: A short, bulleted pitch directed at high-level recruiters explaining why this developer is a strong hire, focusing on concrete evidence from their repos (languages, architecture, scale).
3. An **Elevator Pitch**: A concise, punchy 2-3 sentence introduction highlighting who they are, what they excel at, and the impact of their engineering work.`;

  return { system, prompt };
}
