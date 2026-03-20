# AI-Powered Product Development Workflow

[한국어](README.md) | English

An end-to-end AI-assisted product development platform for solo founders. Guides you from idea validation to user acquisition through Claude Code plugins.

```
Idea → Business Strategy → Planning → Design → Development → Deployment → User Acquisition
(Stage 0)   (Stage 1)     (Stage 2)  (Stage 3)  (Stage 4)    (Stage 5)     (Stage 6)
```

## Installation

```bash
claude plugin marketplace add https://github.com/bbangjooo/agent-workflow.git
```

## Quick Start

```bash
# Run the full pipeline automatically (Stage 0~6, resume from where you left off)
/build-project

# Run stage by stage
/ideate → /monetize → /plan → /design → /develop → /deploy → /grow
```

## Plugins

### Main Pipeline

| Stage | Command | Role | Key Output |
|-------|---------|------|------------|
| 0 | `/ideate` | Turn a vague idea into a concrete product concept | `idea-brief.md` |
| 1 | `/monetize` | Design revenue model, pricing strategy, and business model | `business-model.md` |
| 2 | `/plan` | Write a PRD incorporating the business model | `prd.md` |
| 3 | `/design` | Generate developer-ready design specs | `design-spec.md`, `design-tokens.md` |
| 4 | `/develop` | Implement MVP code based on the design spec | Project code |
| 5 | `/deploy` | Auto-deploy to free hosting | Live URL |
| 6 | `/grow` | Analyze project artifacts to create a tailored user acquisition strategy | `acquisition-plan.md` |

### Promotional Content Generation

After building your strategy with `/grow`, use `/promote` to generate ready-to-post content for each channel.

```bash
/promote                  # Generate content for all channels at once
/promote product-hunt     # Product Hunt tagline, description, maker comment
/promote show-hn          # Hacker News Show HN post
/promote reddit           # Subreddit-specific posts
/promote twitter          # Launch thread + individual tweets
/promote disquiet         # Disquiet product page + launch post (Korean)
/promote naver-blog       # Naver Blog SEO-optimized post (Korean)
/promote press-release    # Press release (Korean/English) + journalist pitch emails
/promote email-sequence   # Waitlist activation + onboarding emails
/promote landing-copy     # Full landing page copy (all sections)
/promote community        # IndieHackers, Dev.to, GeekNews, OKKY, Velog
```

### Feedback & Iteration

| Command | Role |
|---------|------|
| `/reflect` | Post-stage retrospective — collect learnings and improvements |
| `/decide` | Record and track key decisions |
| `/review` | Cross-stage artifact consistency check |
| `/iterate {stage}` | Go back to a previous stage to improve (e.g., `/iterate planning`) |
| `/next-version` | Start a new version (v2) after completing current |
| `/new-product` | Start an entirely new product |

### Goals & Roadmap

| Command | Role |
|---------|------|
| `/roadmap` | Define project goals and generate a roadmap |
| `/where` | Track current progress |
| `/align` | Verify goal alignment |
| `/next` | Combined view of goals + progress + next actions |

### Utilities

| Command | Role |
|---------|------|
| `/build-project` | Auto-run Stage 0~6 sequentially (pause/resume supported) |
| `/debug` | Systematic error resolution during development/deployment |
| `/check-ui-spec` | Verify UI matches the design spec |
| `/goal` | Project goals status dashboard |

## Examples

### Start a new project

```bash
/build-project
# → Asks "What product do you want to build?" then runs Stage 0 through 6
```

### Start with business strategy

```bash
/monetize
# → Revenue model analysis, pricing strategy, unit economics,
#   payment infrastructure, business model canvas
# → Generates business-model.md → /plan auto-includes billing features in PRD
```

### Design only

```bash
/design
# → Platform selection → Screen analysis → Reference analysis → Wireframes
#   → Design tokens → Components → Spec → Animation → Prototype
```

### User acquisition

```bash
/grow
# → Auto-analyzes previous artifacts (idea, business model, PRD)
# → Generates tailored market targeting, launch plan, growth channels, 12-week roadmap

/promote product-hunt
# → Generates 3 tagline options, description, maker comment, launch checklist
```

### Feedback loop

```bash
/reflect            # Retrospective after completing a stage
/iterate design     # Go back and improve the design stage
/next-version       # Start v2
```

## Project Structure

```
plugins/
├── ideation/              # Stage 0: Idea validation
├── monetization/          # Stage 1: Business strategy & revenue model
├── planning/              # Stage 2: Product planning
├── design/                # Stage 3: Design system & specs
├── development/           # Stage 4: Code implementation
├── deployment/            # Stage 5: Deployment
├── growth/                # Stage 6: User acquisition + channel content
├── orchestrator/          # Full pipeline management
├── feedback/              # Feedback & retrospectives
├── iteration/             # Iteration management
├── roadmap/               # Goals & roadmap
├── debugging/             # Debugging
└── workflow-state-manager/ # State management
```

## License

MIT License
