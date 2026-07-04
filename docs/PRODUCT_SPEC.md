# PortfolioGenie — Product Specification

> Single source of truth for the PortfolioGenie product.
>
> Development roadmap: ../PLANS.md
>
> Engineering rules: ../AGENTS.md

---

# Product Overview

PortfolioGenie is a premium AI-powered SaaS that enables developers to transform their GitHub profile into a professional portfolio, resume, cover letter, and recruiter-ready personal brand.

Instead of spending hours designing websites or writing content from scratch, developers connect their GitHub account and PortfolioGenie automatically analyzes repositories, contributions, technologies, and project history to generate production-ready career assets.

The platform combines GitHub data, AI, beautiful templates, and one-click publishing into a single seamless experience.

---

# Vision

Build the easiest and most trusted platform for developers to showcase their professional experience.

The initial product focuses on helping developers generate high-quality portfolios from GitHub.

Long term, PortfolioGenie will evolve into an AI-powered career platform that helps software engineers build their online presence, improve employability, and manage their professional brand.

---

# Problem Statement

Developers spend significant time building personal portfolios, writing resumes, organizing GitHub repositories, and creating cover letters.

Common pain points include:

- Not knowing how to design a portfolio.
- Poor project descriptions.
- Inconsistent GitHub profiles.
- Difficulty writing professional bios.
- Weak resume formatting.
- Repetitive job application work.
- Lack of confidence presenting technical experience.

These problems slow down job applications and make talented developers appear less experienced than they actually are.

PortfolioGenie solves this by transforming existing GitHub work into polished, recruiter-friendly assets.

---

# Core Value Proposition

PortfolioGenie enables developers to:

- Connect GitHub.
- Let AI analyze repositories.
- Generate a professional portfolio.
- Generate an ATS-friendly resume.
- Generate personalized cover letters.
- Publish everything in minutes.

No design skills required.

No copywriting required.

No coding required after connecting GitHub.

---

# Target Audience

## Primary Audience

- Junior Developers
- Self-Taught Developers
- Bootcamp Graduates
- Mid-Level Software Engineers
- University Students
- Developers actively seeking employment

---

## Secondary Audience

- Freelancers
- Consultants
- Open Source Contributors
- Engineering Teams
- Coding Bootcamps
- Developer Communities

---

# User Personas

## Ahmed

Age: 23

Role: Junior Frontend Developer

Goals

- Build a professional portfolio.
- Apply for internships.
- Improve resume quality.

Pain Points

- Doesn't know what projects to showcase.
- Doesn't know how to write an About Me.
- GitHub profile looks unorganized.

---

## Sarah

Age: 29

Role: Full Stack Engineer

Goals

- Refresh portfolio.
- Apply for senior positions.
- Improve personal branding.

Pain Points

- Portfolio is outdated.
- Resume takes too long to update.
- Wants everything synchronized automatically.

---

# Product Goals

The MVP should allow a developer to:

- Connect GitHub.
- Import repositories.
- Generate an AI-powered portfolio.
- Customize the generated portfolio.
- Publish to a public URL.
- Generate a matching resume.
- Generate a personalized cover letter.

The entire process should take less than five minutes.

---

# Success Metrics

The MVP is considered successful when:

- A new user can publish a portfolio in under 5 minutes.
- GitHub import succeeds for at least 95% of users.
- Portfolio generation completes in under 60 seconds.
- Resume generation completes in under 30 seconds.
- Published portfolios achieve a Lighthouse score of at least 90 for Performance, Accessibility, and SEO.
- The first portfolio publish succeeds without manual intervention.

---

# MVP Scope

The first public release intentionally focuses on the smallest feature set that validates the core product.

## Included

- Authentication
- GitHub Integration
- AI Analysis
- Portfolio Builder
- Resume Builder
- Cover Letter Builder
- Portfolio Templates
- Portfolio Publishing
- Analytics
- Billing

---

## Out of Scope

The following features are intentionally excluded from the MVP:

- Organizations
- Team Workspaces
- Enterprise Features
- Single Sign-On (SSO)
- LinkedIn Optimizer
- Interview Preparation
- AI Chat
- Job Matching
- Chrome Extension
- VS Code Extension
- Mobile Applications
- Recruiter Dashboard
- Public API

These features are reserved for future releases.

---

# Non Goals

PortfolioGenie is not intended to:

- Replace GitHub.
- Replace LinkedIn.
- Become a social network.
- Become a blogging platform.
- Replace applicant tracking systems.
- Replace code hosting platforms.
- Replace developer documentation tools.

Its primary purpose is helping developers build and maintain a professional online presence.

---

# Core User Journey

1. Discover PortfolioGenie.
2. Create an account.
3. Connect GitHub.
4. Import repositories.
5. AI analyzes projects.
6. Portfolio draft is generated.
7. User customizes the portfolio.
8. User publishes the portfolio.
9. User generates a resume.
10. User generates a cover letter.
11. User monitors analytics.

Every product feature should improve one or more steps in this journey.

---

# Product Principles

PortfolioGenie should always prioritize:

- Simplicity over complexity.
- Automation over manual work.
- Beautiful default experiences.
- Accessibility.
- Performance.
- Type safety.
- Production-quality UI.
- AI assistance without removing user control.
- Fast onboarding.
- Recruiter-friendly outputs.

Every new feature should support these principles.

# Product Modules

The following modules make up the PortfolioGenie platform.

Each module is independently developed while integrating seamlessly with the others.

---

# Authentication

Authentication is powered by Better Auth.

Authentication should require minimal friction while remaining secure.

## Providers

- GitHub OAuth (Primary)
- Google OAuth
- Email & Password

GitHub OAuth is the recommended onboarding flow.

---

## User Accounts

Every user has:

- Profile
- Avatar
- Name
- Username
- Email
- Authentication Provider
- Subscription Plan
- Portfolio Count
- AI Credits

---

## Sessions

Requirements

- Persistent Sessions
- Secure Cookies
- Session Expiration
- Refresh Tokens
- Device Management
- Logout Everywhere

---

## Account Management

Users can:

- Update profile
- Change password
- Delete account
- Manage connected providers
- Manage billing
- View subscription

---

## Acceptance Criteria

- User registration succeeds.
- Sign in succeeds.
- Sessions persist correctly.
- Protected routes require authentication.
- Account deletion removes user data according to the retention policy.

---

# GitHub Integration

GitHub is the primary data source for PortfolioGenie.

---

## Imported Data

User Profile

- Avatar
- Name
- Username
- Bio
- Company
- Location
- Website
- Followers
- Following

Repositories

- Repository Name
- Description
- Languages
- Stars
- Forks
- Topics
- Visibility
- License
- Last Updated

Repository Content

- README
- Package Managers
- Frameworks
- Build Tools

Organizations

- Public Organizations
- Public Membership

Activity

- Contributions
- Commit Frequency
- Repository Activity

Pinned Projects

- Repository Order
- Featured Projects

---

## Features

Users can

- Connect GitHub
- Disconnect GitHub
- Refresh GitHub Data
- Select Featured Projects
- Hide Projects
- Pin Projects
- Exclude Projects

---

## Synchronization

Manual

- Refresh on demand

Automatic

Free

- Manual only

Pro

- Weekly

Team

- Daily

Enterprise

- Near real-time

---

## Acceptance Criteria

- GitHub account connects successfully.
- Repository import succeeds.
- Repository synchronization succeeds.
- Featured projects can be managed.
- Failed synchronizations surface actionable errors.

---

# AI Analysis Engine

The AI Analysis Engine transforms raw GitHub activity into structured professional content.

This module powers every AI capability inside PortfolioGenie.

---

## Repository Analysis

Analyze

- Repository descriptions
- README files
- Commit history
- Topics
- Technologies

Generate

- Professional summaries
- Technical highlights
- Recruiter-friendly descriptions

---

## Skill Detection

Automatically detect

Programming Languages

Frameworks

Libraries

Developer Tools

Cloud Platforms

Databases

Testing Frameworks

Deployment Platforms

---

## Technology Detection

Examples

- React
- Next.js
- Vue
- Angular
- Node.js
- Express
- NestJS
- Laravel
- Django
- Flask
- Docker
- Kubernetes
- PostgreSQL
- MongoDB
- Redis
- Firebase
- Supabase
- Convex

---

## Experience Analysis

Estimate

- Experience Level
- Primary Stack
- Secondary Stack
- Strongest Skills
- Weakest Areas
- Project Diversity

---

## Project Ranking

Projects are ranked using

- Stars
- Activity
- Documentation Quality
- Technology Diversity
- Recent Updates
- Completeness
- AI Confidence Score

---

## AI Outputs

Generate

- About Me
- Career Summary
- Recruiter Summary
- Skills Summary
- Project Descriptions
- Technical Highlights

---

## Recommendations

Examples

- Improve README quality
- Add screenshots
- Improve deployment
- Add documentation
- Add tests
- Improve project naming
- Pin stronger projects

---

## Acceptance Criteria

- AI analysis completes successfully.
- Skills are detected accurately.
- Generated summaries are editable.
- Recommendations are relevant.
- Analysis can be regenerated without losing user edits.

---

# Portfolio Builder

Portfolio Builder is the primary product experience.

It transforms GitHub data into a production-ready portfolio.

---

## Generation

Automatically generate

- Hero
- About
- Projects
- Skills
- Experience
- Contact
- Social Links

---

## Editing

Users can edit

- Every text field
- Every section
- Every project
- Every skill
- Every heading

No generated content is locked.

---

## Live Preview

Supports

- Desktop Preview
- Tablet Preview
- Mobile Preview

Preview updates instantly.

---

## Layout

Users can choose

- Single Column
- Split Layout
- Wide Layout
- Minimal Layout

---

## Themes

Examples

- Minimal
- Modern
- Startup
- Glass
- Creative

---

## Typography

Users can customize

- Font Family
- Font Scale
- Heading Weight
- Body Weight

---

## Colors

Customize

- Primary
- Secondary
- Accent
- Background
- Surface

---

## Sections

Available sections

- Hero
- About
- Projects
- Skills
- Experience
- Education
- Certifications
- Contact
- Testimonials
- Blog
- Open Source
- Custom Sections

Users may

- Add
- Remove
- Reorder
- Hide

sections.

---

## Project Cards

Each project includes

- Name
- Description
- Technologies
- GitHub Link
- Live Demo
- Images
- Metrics

---

## Drafts

Support

- Auto Save
- Draft Mode
- Restore
- Version History

---

## Publishing

Users can

- Preview
- Publish
- Unpublish
- Republish

---

## Acceptance Criteria

- Portfolio generation succeeds.
- Every generated section is editable.
- Theme changes preserve user content.
- Live preview reflects edits immediately.
- Drafts auto-save successfully.
- Publishing produces a live portfolio.

---

# Resume Builder

The Resume Builder transforms GitHub data and AI insights into a recruiter-ready, ATS-friendly resume.

---

## Generation

Automatically generate

- Professional Summary
- Technical Skills
- Work Experience
- Projects
- Education
- Certifications
- Awards
- Open Source Contributions

Users may regenerate any section independently.

---

## ATS Optimization

The generated resume should follow ATS best practices.

Features

- ATS Score
- Keyword Analysis
- Missing Skills Detection
- Formatting Validation
- Improvement Suggestions

---

## Resume Templates

Templates

- Standard
- Minimal
- Technical
- Modern
- Executive

Each template supports

- Dark editor
- Print preview
- Responsive editor

---

## Editing

Users can edit

- Every section
- Every paragraph
- Skills
- Projects
- Experience
- Ordering

---

## Export

Formats

- PDF
- DOCX
- Markdown

---

## Resume Versions

Support

- Multiple resumes
- Duplicate resume
- Archive
- Restore
- Rename

---

## Acceptance Criteria

- Resume generation succeeds.
- ATS score is generated.
- Users can edit every section.
- PDF export succeeds.
- DOCX export succeeds.
- Multiple resume versions are supported.

---

# Cover Letter Builder

The Cover Letter Builder creates personalized cover letters from the user's portfolio and a target job description.

---

## Inputs

Required

- Job Title
- Company Name
- Job Description

Optional

- Hiring Manager
- Tone
- Extra Notes

---

## AI Generation

Generate

- Opening
- Company-specific introduction
- Experience summary
- Technical achievements
- Closing paragraph

---

## Editing

Support

- Paragraph regeneration
- Inline editing
- Tone adjustment
- Length adjustment

---

## Export

Formats

- PDF
- Plain Text
- Copy to Clipboard
- Markdown

---

## Acceptance Criteria

- Cover letter generation succeeds.
- Job description analysis succeeds.
- Paragraph regeneration works independently.
- Export succeeds.
- Generated content remains editable.

---

# Portfolio Templates

PortfolioGenie ships with production-quality templates optimized for different developer audiences.

---

## Available Templates

### Minimal

Inspired by

- Linear
- Notion

Best For

- Backend Engineers
- Platform Engineers

---

### Modern

Inspired by

- Vercel
- Raycast

Best For

- Full Stack Developers
- Frontend Engineers

---

### Startup

Inspired by

- Stripe
- Arc

Best For

- Founders
- Indie Hackers

---

### Glass

Inspired by

- Apple
- Figma

Best For

- Frontend Developers
- Designers

---

### Creative

Inspired by

- Awwwards
- Dribbble

Best For

- Creative Developers
- UI Engineers

---

## Shared Features

Every template includes

- Hero
- About
- Projects
- Skills
- Experience
- Contact
- SEO
- Responsive Design
- Dark Mode
- Light Mode

---

## Acceptance Criteria

- Five templates available.
- Theme switching preserves user data.
- All templates are responsive.
- All templates meet WCAG AA.
- Lighthouse score ≥ 90.

---

# Portfolio Publishing

Publishing transforms a draft portfolio into a publicly accessible website.

---

## Publishing Modes

- Draft
- Preview
- Published

---

## Domains

Default

username.portfoliogenie.dev

Premium

Custom Domain

---

## SSL

Automatically provision SSL certificates for every published portfolio.

---

## SEO

Every published portfolio includes

- Metadata
- Open Graph
- Twitter Cards
- Sitemap
- robots.txt
- Structured Data

---

## Versioning

Support

- Drafts
- Published Versions
- Restore Previous Version

---

## Acceptance Criteria

- Publishing succeeds.
- Drafts remain private.
- Preview links work.
- SSL is enabled.
- Custom domains function correctly.

---

# Analytics

Portfolio analytics help users understand portfolio performance.

---

## Metrics

Traffic

- Views
- Unique Visitors
- Sessions

Downloads

- Resume Downloads
- Cover Letter Downloads

Engagement

- CTA Clicks
- Contact Button Clicks
- GitHub Clicks
- LinkedIn Clicks

Audience

- Countries
- Cities
- Devices
- Browsers
- Referrers

---

## Dashboard

Visualizations

- Traffic Over Time
- Downloads
- Top Referrers
- Device Breakdown
- Geographic Map

---

## Reports

Support

- Daily
- Weekly
- Monthly

---

## Export

Formats

- CSV
- JSON

---

## Acceptance Criteria

- Analytics update correctly.
- Charts render successfully.
- Export succeeds.
- Historical data is retained.
- Dashboard remains performant.

---

# AI Writing Assistant

The AI Writing Assistant improves all written content across the platform.

Users remain in full control of every generated output.

No AI-generated content is permanently locked.

---

## About Me Generator

Generate

- Professional Bio
- Short Bio
- Long Bio
- Recruiter Summary
- Personal Introduction

Users can

- Rewrite
- Shorten
- Expand
- Change Tone

---

## Project Description Generator

Generate

- Professional summaries
- Technical summaries
- Recruiter-focused summaries
- SEO-friendly summaries

Support

- Regeneration
- Tone changes
- Length adjustment

---

## README Enhancement

Analyze existing README files.

Suggest

- Better structure
- Missing sections
- Badges
- Installation instructions
- Screenshots
- Usage examples

---

## Writing Improvements

Support

- Grammar correction
- Readability improvements
- Professional tone
- Technical accuracy
- SEO suggestions

---

## Acceptance Criteria

- AI generation succeeds.
- Generated content is editable.
- Regeneration preserves manual edits when appropriate.
- Suggestions are relevant and actionable.

---

# Billing

PortfolioGenie uses Stripe for subscriptions.

---

## Free

Designed for new developers.

Features

- 1 Portfolio
- 3 Templates
- Manual GitHub Sync
- Basic Analytics
- 20 AI Credits per Month
- Portfolio Generation
- Resume Generation
- PDF Export
- PortfolioGenie Branding

---

## Pro

Designed for active job seekers.

Features

- Unlimited Portfolios
- All Templates
- Weekly GitHub Sync
- Unlimited Portfolio Generation
- Unlimited Resume Generation
- Unlimited Cover Letters
- AI Writing Assistant
- Full Analytics
- Custom Domain
- DOCX Export
- Remove Branding
- Custom CSS
- 500 AI Credits per Month

---

## Team

Designed for organizations and bootcamps.

Features

- Everything in Pro
- Shared Workspace
- Shared Billing
- Daily GitHub Sync
- Team Management
- Shared AI Credits
- 2,000 AI Credits per Month
- Up to 25 Members

---

## Enterprise

Designed for large organizations.

Features

- Everything in Team
- Unlimited Members
- SSO
- Audit Logs
- Priority Support
- Dedicated Success Manager
- Unlimited AI Credits
- SLA
- Custom Integrations

---

## Feature Matrix

| Feature              |  Free  |    Pro    |     Team     | Enterprise |
| -------------------- | :----: | :-------: | :----------: | :--------: |
| Portfolio Sites      |   1    | Unlimited |  Unlimited   | Unlimited  |
| Templates            |   3    |    All    |     All      |    All     |
| Portfolio Generation |   ✅   | Unlimited |  Unlimited   | Unlimited  |
| Resume Builder       |   ✅   | Unlimited |  Unlimited   | Unlimited  |
| Cover Letter Builder |   ❌   | Unlimited |  Unlimited   | Unlimited  |
| AI Writing Assistant |   ❌   |    ✅     |      ✅      |     ✅     |
| PDF Export           |   ✅   |    ✅     |      ✅      |     ✅     |
| DOCX Export          |   ❌   |    ✅     |      ✅      |     ✅     |
| Custom Domain        |   ❌   |    ✅     |      ✅      |     ✅     |
| Remove Branding      |   ❌   |    ✅     |      ✅      |     ✅     |
| Custom CSS           |   ❌   |    ✅     |      ✅      |     ✅     |
| Analytics            | Basic  |   Full    |     Full     |    Full    |
| GitHub Sync          | Manual |  Weekly   |    Daily     | Real-Time  |
| AI Credits / Month   |   20   |    500    | 2,000 Shared | Unlimited  |

---

# Dashboard Modules

## Home

Displays

- Quick Actions
- Recent Activity
- Portfolio Status
- AI Usage
- Analytics Summary

---

## Portfolio

Users can

- Create
- Edit
- Duplicate
- Archive
- Publish
- Delete

portfolios.

---

## Resume

Users can

- Generate
- Edit
- Export
- Manage resume versions.

---

## Cover Letters

Users can

- Generate
- Edit
- Save
- Export

cover letters.

---

## GitHub

Displays

- Connection Status
- Repository Management
- Sync History
- Sync Controls

---

## AI Studio

Central hub for

- Portfolio Generation
- Resume Generation
- Cover Letter Generation
- Writing Assistant

---

## Analytics

Displays

- Traffic
- Downloads
- Visitors
- Reports

---

## Billing

Displays

- Current Plan
- Usage
- AI Credits
- Invoices
- Upgrade Options

---

## Settings

Users can manage

- Profile
- Security
- Connected Accounts
- Notifications
- Appearance
- Billing
- Danger Zone

---

# Non-Functional Requirements

The application must be

- Fast
- Accessible
- Responsive
- Secure
- Type Safe
- Production Ready

Performance goals

- Lighthouse Performance ≥ 90
- Lighthouse Accessibility ≥ 90
- Lighthouse SEO ≥ 90
- Lighthouse Best Practices ≥ 90

Accessibility

- WCAG AA
- Keyboard Navigation
- Screen Reader Support
- Reduced Motion Support

---

# Security & Privacy

Requirements

- Secure authentication
- Encrypted OAuth tokens
- Secure cookies
- CSRF protection
- Rate limiting
- Input validation
- XSS prevention
- SQL/NoSQL injection prevention
- Secure file uploads

Privacy

- Users own their data.
- Users can export their data.
- Users can permanently delete their account.
- PortfolioGenie never sells user data.

---

# Release Roadmap

## v0.1

Marketing Website

---

## v0.2

Authentication

---

## v0.3

GitHub Integration

---

## v0.4

AI Analysis Engine

---

## v0.5

Portfolio Builder

---

## v0.6

Resume Builder

---

## v0.7

Cover Letter Builder

---

## v0.8

Publishing

---

## v0.9

Analytics

---

## v1.0

Public Launch

---

# Product Acceptance Criteria

PortfolioGenie is considered ready for public launch when:

- Authentication is fully functional.
- GitHub import succeeds reliably.
- AI analysis produces high-quality outputs.
- Users can generate and publish portfolios.
- Resume generation works correctly.
- Cover letter generation works correctly.
- Portfolio publishing succeeds.
- Analytics are accurate.
- Billing functions correctly.
- All Lighthouse scores meet or exceed 90.
- WCAG AA accessibility requirements are met.
- TypeScript compiles with zero errors.
- ESLint passes with zero errors.
- The application is production-ready.

---

# Future Vision

The MVP focuses on helping developers create professional portfolios.

Future releases may include:

- AI Career Coach
- LinkedIn Optimizer
- Interview Preparation
- Job Matching
- Resume Review
- Portfolio Review
- Chrome Extension
- VS Code Extension
- Mobile Applications
- Recruiter Workspace
- Public API

These ideas are intentionally outside the MVP scope and should not influence current development priorities.
