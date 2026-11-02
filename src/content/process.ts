/**
 * The five delivery steps. Home shows the compact line (title + text);
 * /process is the only page with the full story.
 * TODO: add typical durations once the team confirms them.
 */
export const processSteps = [
  {
    id: "discover",
    title: "Discover",
    text: "Understand the business, the users, and the constraints.",
    detail:
      "We learn how the work happens today, who it is for, and what success should look like — before anything is designed.",
    deliverables: ["Problem statement", "User and workflow map", "Constraints and risks"],
    involvement: "Share goals, current tools and examples. Bring the people who do the work.",
  },
  {
    id: "architect",
    title: "Architect",
    text: "Define the scope, system, and path to a useful first release.",
    detail:
      "The essential journeys, integrations and acceptance criteria are agreed, and the first release is separated from what can follow.",
    deliverables: ["Agreed scope", "System architecture", "Milestone plan"],
    involvement: "Review the scope and priorities, and sign off the plan before the build starts.",
  },
  {
    id: "build",
    title: "Build",
    text: "Develop in reviewable increments, with quality built in.",
    detail:
      "Work arrives as working software you can review, with tests and code review part of every increment rather than an afterthought.",
    deliverables: ["Working increments", "Demo builds", "Tested code"],
    involvement: "Review demos and give focused feedback. Discuss scope changes before they’re added.",
  },
  {
    id: "launch",
    title: "Launch",
    text: "Test the whole experience and prepare for real use.",
    detail:
      "The full experience is tested end to end, deployment and handover are prepared, and the team is ready for real users.",
    deliverables: ["Production release", "Documentation", "Handover walkthrough"],
    involvement: "Run acceptance checks, prepare your team, and agree the go-live moment.",
  },
  {
    id: "improve",
    title: "Improve",
    text: "Learn from use and prioritize what comes next.",
    detail:
      "Real usage shows what matters. We help prioritise improvements and keep the system healthy as the business changes.",
    deliverables: ["Usage insights", "Improvement backlog", "Maintenance plan"],
    involvement: "Share what users say and decide together what earns a place on the roadmap.",
  },
] as const;

/** "Know what comes next" — how the engagement itself is run. */
export const workingTogether = [
  [
    "Start with the problem",
    "Bring your goals, current workflow, and any constraints. Screenshots, an existing product, or a short brief can help make the first conversation useful.",
  ],
  [
    "Agree on a practical scope",
    "Identify the essential user journeys, integrations, and acceptance criteria. Separate the first release from improvements that can follow.",
  ],
  [
    "Review progress together",
    "Use working demonstrations and focused feedback to make decisions. Discuss changes to scope and their effect on timing before adding work.",
  ],
  [
    "Prepare for life after launch",
    "Plan testing, deployment, documentation, and handover. Discuss maintenance and future improvements as part of the engagement.",
  ],
] as const;
