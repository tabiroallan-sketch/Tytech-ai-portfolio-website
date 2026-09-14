export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  /** Service landing page or anchor to suggest next. */
  relatedService?: { label: string; href: string };
  /** Case study directly tied to this article. */
  relatedProjectSlug?: string;
  body: ArticleSection[];
}

/**
 * Starter resource articles. Written from the capabilities the business
 * actually offers — no invented client outcomes, no fabricated statistics.
 */
export const articles: Article[] = [
  {
    slug: "automating-lead-follow-up",
    title: "Automating lead follow-up so no enquiry goes cold",
    description:
      "Why enquiries slip through and how a combination of AI qualification and an n8n workflow can make sure every one gets a fast, human-friendly response.",
    category: "Automation",
    publishedAt: "2026-09-08",
    readingMinutes: 6,
    relatedService: { label: "AI Automation for Business", href: "/services/ai-automation" },
    relatedProjectSlug: "ai-lead-qualification-system",
    body: [
      {
        paragraphs: [
          "A lead that waits is a lead that decides. Even a business that answers every enquiry struggles with the gap between somebody asking a question at 9pm and a team member seeing it the next morning. When someone is comparing you to two other suppliers, that gap is often where the decision gets made.",
        ],
      },
      {
        heading: "Why the work actually drops",
        paragraphs: [
          "It usually isn't laziness — it's that the reply pipeline has too many manual steps. An enquiry lands in a form, a mailbox or a WhatsApp chat. Someone has to notice it, read it, work out what the person actually needs, look up a price or a policy, and type a response. If nobody owns that moment, the enquiry simply sits there.",
        ],
      },
      {
        heading: "What an automated follow-up looks like",
        paragraphs: [
          "The systems we build look like this in practice:",
        ],
        bullets: [
          "Capture — an enquiry arrives from a form, WhatsApp or email and lands in one place automatically.",
          "Qualify — an AI agent reads it, scores how ready the person is, and pulls any context about the company or the question they asked.",
          "Route — the lead and its context appear in your CRM with a suggested priority, and the right team member is notified immediately.",
          "Follow-up — instant, scripted acknowledgements go out automatically, so the customer is never left silent, while the real conversation still happens with a person.",
          "Review — everything logged, so you can see which channels and messages actually convert.",
        ],
      },
      {
        heading: "Where AI helps — and where it shouldn't take over",
        paragraphs: [
          "AI is useful for the answering part: replying with accurate information in seconds, at any hour, using your own documents and pricing. It's genuinely good at that. It is not a substitute for the human moment where a prospect needs to discuss price, push back, or explain a messy situation. Good systems escalate to a person at exactly that point — and tell a human everything the agent already learned.",
        ],
      },
      {
        heading: "How to start without overcomplicating it",
        bullets: [
          "Write down the one channel where leads arrive the most and reply the slowest.",
          "Collect the 10–20 questions customers actually ask, and the answers you'd give.",
          "Automate just one link first: inquiry arrives → instant acknowledgement → you get notified. Nothing more.",
          "Once that runs reliably for a week, add AI qualification and CRM routing.",
        ],
        paragraphs: [
          "You don't need a giant platform. You need one honest, reliable pipeline and a human who sees the hand-off. Everything else builds on that.",
        ],
      },
    ],
  },
  {
    slug: "n8n-vs-custom-code",
    title: "n8n vs custom code: when a workflow tool is enough",
    description:
      "A practical decision guide for choosing between configuring a workflow tool like n8n and paying for bespoke code — and why most integrations don't need a developer project.",
    category: "Automation",
    publishedAt: "2026-09-05",
    readingMinutes: 7,
    relatedService: { label: "Workflow Automation with n8n", href: "/services/n8n-automation" },
    relatedProjectSlug: "whatsapp-business-automation",
    body: [
      {
        paragraphs: [
          "Almost every automation conversation starts with the same question in different words: do we need a developer, or will a workflow tool do? It's the right question to ask — the wrong answer usually comes from guessing instead of looking at the job.",
        ],
      },
      {
        heading: "What n8n is actually good at",
        paragraphs: [
          "n8n sits between your existing tools and moves data between them. It is excellent at the shape of work that businesses do every day: a new row in a spreadsheet triggers an email, a form submission updates a CRM, a payment notification starts a follow-up. It handles retries, error alerting, scheduling and credentials out of the box, and it can be self-hosted, which means your data stays on your infrastructure.",
        ],
      },
      {
        heading: "When custom code genuinely wins",
        bullets: [
          "The logic is dense — heavy data transformation, complex validation, or maths that a drag-and-drop canvas makes hard to read.",
          "The integration target has no standard API or only a niche one.",
          "Performance matters at scale, where timestamp precision or throughput of individual nodes get in the way.",
          "The workflow IS the product — a thing other people will pay to use — rather than a thing that runs your day-to-day ops.",
        ],
        paragraphs: [
          "If one of those is true, well-written code is probably the right tool. If none of them is, a workflow is faster to build, cheaper to change and easier for someone else to understand when you hand it over.",
        ],
      },
      {
        heading: "A practical checklist",
        bullets: [
          "Does the job move data between tools you already use? → workflow tool.",
          "Does it need decision logic that a person can read? → workflow tool, where the steps stay visible.",
          "Is it going to run forever with rare changes? → workflow still fine; document it.",
          "Does it need custom behaviour no API exposes? → get a developer involved now.",
        ],
      },
      {
        heading: "Start small, stay replaceable",
        paragraphs: [
          "The best first automation is one that matters but isn't scary: a notification, a sync, a digest. Build it in a workflow tool so the steps are visible, run it for a week, and only reach for code when the workflow demonstrates it can't carry the weight. Most of the time it never does.",
        ],
      },
    ],
  },
  {
    slug: "what-ai-support-agents-can-do",
    title: "What an AI customer support agent can — and can't — do",
    description:
      "Where AI support agents genuinely earn their place (and where they shouldn't), plus the guardrails that keep them from becoming a liability.",
    category: "AI Agents",
    publishedAt: "2026-08-28",
    readingMinutes: 6,
    relatedService: { label: "AI Agents for Business", href: "/services/ai-agents" },
    relatedProjectSlug: "ai-customer-support-agent",
    body: [
      {
        paragraphs: [
          "An AI support agent is a chat assistant trained on your own information: policies, pricing, FAQs, troubleshooting steps. Treated like a well-briefed new hire with a rulebook, it's genuinely useful. Treated like a replacement for good judgment, it becomes a support liability. The difference is set at the design stage, not by the model.",
        ],
      },
      {
        heading: "What it does well",
        bullets: [
          "Answers the same questions hundreds of people have, consistently, at any hour — the 'what's your opening time' and 'how do I reset' layer that burns real human hours.",
          "Answers from your documents, not from imagination — as long as retrieval is bounded to a knowledge base you maintain.",
          "Escalates cleanly: when it hits an edge case or detects a frustrated user, it hands off to a human with the full conversation attached.",
        ],
      },
      {
        heading: "What it can't do — and shouldn't try",
        bullets: [
          "Make judgment calls about your edge cases that even your team debates.",
          "Handle an angry or urgent customer the way a practised human does.",
          "Take actions with money or data consequences on its own — refunds, data deletion, contract changes — without an approval step.",
          "Know things that aren't in the material you gave it, no matter how 'smart' it sounds.",
        ],
      },
      {
        heading: "The guardrails that keep it honest",
        paragraphs: [
          "Three things matter. First, an escalation rule: anything outside the knowledge base goes to a human, always. Second, logging: every conversation is reviewable, so if an answer was wrong you see it and fix the source. Third, an explicit fallback: when the agent is unsure, its default is to say so and find a person — never to guess confidently.",
        ],
      },
      {
        heading: "Where it fits in your team",
        paragraphs: [
          "Think of it as the front desk that handles the routine 80 percent and knows exactly when to page someone. The people on your team keep doing the conversations that need judgement, empathy and authority — they just stop answering 'how do I log in' for the fourth time today.",
        ],
      },
    ],
  },
  {
    slug: "data-ready-for-ai-checklist",
    title: "Is your data ready for AI? A checklist before buying AI tools",
    description:
      "Before you spend on AI, spend ten minutes checking where your data lives, how clean it is, and what you'd actually ask it. Small checklist, big difference.",
    category: "AI Business Systems",
    publishedAt: "2026-08-20",
    readingMinutes: 5,
    relatedService: { label: "AI Integrations & API Automation", href: "/services/ai-integrations" },
    relatedProjectSlug: "ai-content-automation-system",
    body: [
      {
        paragraphs: [
          "The most common reason an AI project underwhelms has nothing to do with the AI. It's that the data the system needs — the numbers, the records, the documents — lives in five places, half of it is out of date, and nobody is sure which copy is the truth. A model can't fix that. It will just repeat the mess, faster and more confidently.",
        ],
      },
      {
        heading: "A ten-minute readiness checklist",
        bullets: [
          "Where does the data live? — If it's spread across inboxes, spreadsheets and a CRM, list the sources before anything else.",
          "Who owns it? — One person who can say 'this is the current, correct version' saves more work than any tool.",
          "Is it structured enough to query? — AI can read messy text, but it answers best when records have consistent fields.",
          "Is it complete for the questions you'll actually ask? — An assistant can only answer from material it has. If customers ask about X and you've never captured X, that's the gap to close first.",
          "What is it allowed to see? — Privacy matters: decide what the system may read and who may see its answers before you connect anything.",
        ],
      },
      {
        heading: "What to connect first",
        paragraphs: [
          "Connect the data your team already moves by hand. That's typically a CRM, email, WhatsApp and a spreadsheet. The moment those feed one pipeline, every automation above them — agents, workflows, digests — has real material to work with instead of guesses.",
        ],
      },
      {
        heading: "A first realistic AI project",
        paragraphs: [
          "Pick one narrow, honest use: draft content for your approval, summarize enquiries, keep a reporting document current. Give the system exactly the data and rules for that one job. Run it for two weeks, review the output yourself, and let the workflow earn its place before you expand it. That's how AI stops being an experiment and becomes part of how the business runs.",
        ],
      },
    ],
  },
  {
    slug: "ai-agents-vs-chatbots",
    title: "AI agents vs chatbots: the difference that matters",
    description:
      "Both give your website the ability to talk to customers — but one of them can also do things. Here's the difference in plain terms, and when each makes sense.",
    category: "AI Agents",
    publishedAt: "2026-09-12",
    readingMinutes: 6,
    relatedService: { label: "AI Agents for Business", href: "/services/ai-agents" },
    relatedProjectSlug: "ai-customer-support-agent",
    body: [
      {
        paragraphs: [
          "The words get used interchangeably, which is a shame, because the thing your business actually needs is decided by the difference. A chatbot talks. An AI agent can also act — check a record, update a field, trigger a workflow, send a notification — and then report back on what it did.",
        ],
      },
      {
        heading: "A chatbot answers questions",
        bullets: [
          "It reads the customer's message and responds with information.",
          "Its job ends at the answer — nothing in the business changes because of the conversation.",
          "Useful for FAQs, opening hours, order status explanations, polite redirection.",
        ],
        paragraphs: [
          "If a conversation ends in an answer, a chatbot is exactly the right amount of machinery. It's why most 'AI' buttons on websites are really just this, and that's fine — frankly it's what most customers want when they ask 'what time do you close?'",
        ],
      },
      {
        heading: "An AI agent also does things",
        bullets: [
          "It can look up an order by number and tell you its exact status, not a general guess.",
          "It can create or update records — a lead, a ticket, a follow-up task — inside your CRM.",
          "It can escalate to a human the moment a conversation leaves its rules.",
          "It hands the team a summary of what happened and what it changed.",
        ],
        paragraphs: [
          "The key word is agency: the system takes a step that changes the state of your business. That's what turns a chat widget from a small convenience into a device that actually saves hours every week.",
        ],
      },
      {
        heading: "Which one should your business add?",
        paragraphs: [
          "Start with the outcome you need, not the buzzword. If customers mostly ask questions, a chatbot is quicker to build and cheaper to run. If you're losing time to work that happens in the chat's aftermath — qualifying leads, updating records, following up — an agent is what moves the needle, because it removes the manual step the old chat leaves behind.",
        ],
      },
      {
        heading: "The honest middle ground",
        paragraphs: [
          "The systems we ship are usually a hybrid: an agent that answers like a chatbot, but with actions attached to defined, guarded tasks and a human in the loop for anything consequential. That gives you the convenience of instant answers and the reliability of a person deciding the parts that actually cost money.",
        ],
      },
    ],
  },
  {
    slug: "how-much-does-ai-automation-cost",
    title: "How much does AI automation cost? An honest breakdown",
    description:
      "A realistic look at why automation prices range so wildly online, what you're actually paying for, and how to budget for a system that doesn't quietly die.",
    category: "AI Business Systems",
    publishedAt: "2026-09-10",
    readingMinutes: 7,
    relatedService: { label: "AI Automation for Business", href: "/services/ai-automation" },
    relatedProjectSlug: "ai-lead-qualification-system",
    body: [
      {
        paragraphs: [
          "Search for 'AI automation cost' and you'll get an answer range so wide it's meaningless — from a few hundred dollars to six figures. The truth is that both figures are real and both are correct, because the price is not set by the technology. It's set by three things no tool can tell you: the complexity of the process, the stakes of a failure, and what happens after launch.",
        ],
      },
      {
        heading: "What you're actually paying for",
        bullets: [
          "Discovery — understanding how the process really works today, including the exceptions your team has memorised.",
          "The build — configuring the workflow, integrating the tools, and the AI work needed for anything unstructured.",
          "Guardrails — error handling, retries, logging, and the points where a human must approve a decision.",
          "Handover — documentation, and some amount of help until the team trusts it.",
          "Running costs — the subscription or platform usage fees the system needs to keep working.",
        ],
        paragraphs: [
          "The gap between 'a few hundred dollars' and 'expensive' is almost never the AI itself. It's how much discovery and hardening the job demands, and whether the person building it bothers with the parts that keep it alive after the demo.",
        ],
      },
      {
        heading: "The price ranges that actually make sense",
        paragraphs: [
          "Allow us to be deliberately vague with the numbers, because in good conscience nobody can quote your automation without seeing the process. What we can tell you is how the bands break down, so you can sanity-check what you're being offered:",
        ],
        bullets: [
          "Tidy, single-step jobs — a form forwarding to a spreadsheet, a notification pipeline — are genuinely small jobs, worth a modest fixed fee. They're cheap because they're simple, not because the vendor is kind.",
          "Real process automation — AI involvement, multiple tools, exceptions, CRM updates — sits comfortably in the range of a typical services engagement. You're paying for discovery and hardening brought together.",
          "Enterprise-class systems — high volume, compliance, custom code, monitoring — cost accordingly, and attract people with experience of those demands.",
        ],
      },
      {
        heading: "How to avoid the two classic buys",
        paragraphs: [
          "The first classic mistake is paying the premium rate for a job that's actually simple, because hype made it sound exotic. The second is buying a cheap build that only works in the demo: no retries, no logging, no error alerting, no page. Ask for the two things that don't look impressive but decide everything — what happens when an API is down, and what happens when the workflow makes a mistake. The answer tells you how the system will behave in month three.",
        ],
      },
      {
        heading: "Budgeting honestly",
        paragraphs: [
          "Put your budget next to the hours the process costs you each month, and treat the automation as a tool that should pay for itself within a handful of months. If it can clear that bar, the price discussion is about a credible plan, not a gamble. If it can't, the automation isn't worth buying at any price.",
        ],
      },
    ],
  },
  {
    slug: "which-tasks-to-automate-first",
    title: "Which tasks should you automate first? A prioritisation guide",
    description:
      "Most teams overcomplicate their first automation. A three-question test that points you to the workflow worth automating first — without the hype.",
    category: "Automation",
    publishedAt: "2026-09-14",
    readingMinutes: 5,
    relatedService: { label: "Workflow Automation with n8n", href: "/services/n8n-automation" },
    relatedProjectSlug: "whatsapp-business-automation",
    body: [
      {
        paragraphs: [
          "The teams that succeed with automation don't have better tools or bigger budgets. They just picked the right first job. The teams that stall picked the most impressive job — the flashy end-to-end dream system — and watched it take months to build while nothing shipped.",
        ],
      },
      {
        heading: "The three-question test",
        bullets: [
          "How repetitive is it? — Does this happen daily or weekly, in the same shape every time? The first automation should be something that occurs constantly.",
          "How much does it actually cost? — Count the real time it eats each week, and the cost of the delays it causes. Automate the thing whose friction you can feel.",
          "How clear are the rules? — Can you write the decision tree on one page? If yes, it automates cleanly. If the process depends on in-the-moment judgment, leave it for later.",
        ],
        paragraphs: [
          "A task that scores high on all three is your first automation. A task that scores high on excitement but low on all three is the one your team will abandon mid-build.",
        ],
      },
      {
        heading: "Great first automations",
        bullets: [
          "Enquiry capture and instant acknowledgement — never leave a customer in silence again.",
          "Data entry that moves records between a form, a CRM and a spreadsheet by hand today.",
          "Notifications that tell the right person the right thing at the right time.",
          "A digest — a daily summary of leads, orders or messages that replaces an hour of clicking.",
        ],
      },
      {
        heading: "Automations that are premature",
        paragraphs: [
          "Skip anything that only runs monthly, anything that depends on one person's judgment call, and anything you can't test safely this week. A system nobody trusts is worse than the manual process it replaces — it fails quietly and you blame the wrong thing.",
        ],
      },
      {
        heading: "Ship the seam, then widen it",
        paragraphs: [
          "The best first automation is one you can run in parallel with the manual process for a week, compare the outputs side by side, and only then trust. Once that seam is earning its keep, the next automation gets easier — you've already got a pattern, a process and a team that believes in it.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}