# Design System

Before building any custom UI

Always use shadcn/ui first.

Workflow

1. Search existing shadcn component.
2. Install if missing.
3. Compose components.
4. Only build custom components when shadcn cannot solve the problem.

Never recreate

- Button
- Card
- Dialog
- Input
- Dropdown
- Table
- Form
- Badge
- Sheet
- Popover
- Navigation Menu

Use

- Tailwind
- Radix
- CVA
- class-variance-authority
- tailwind-merge

Color system

Use semantic colors only.

Never hardcode colors.

Spacing

Use an 8px spacing scale.

Radius

Use theme radius.

Icons

Always use Better Icons.

Accessibility

Every component must

- support keyboard navigation
- support screen readers
- have visible focus states
