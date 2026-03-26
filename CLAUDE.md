# CLAUDE.md — Frontend Website Rules

## Always Do First

- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images

- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server

- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow

- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults

- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://picsum.photos/seed/[descriptive-word]/WIDTH/HEIGHT` — use descriptive seeds (e.g. `cafe`, `food`, `interior`) for realistic photography in mockups. Only fall back to `placehold.co` for pure layout/size placeholders.
- Mobile-first responsive

## Brand Assets

- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails

- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Client Design Dials

Set these at the start of each project to match the client's brief. Override in chat at any time.

- **DESIGN_VARIANCE: 5** — (1 = safe/symmetric, 10 = asymmetric/artistic). Above 5: use split-screen or asymmetric hero layouts. Never centered heroes above 5.
- **MOTION_INTENSITY: 4** — (1 = static, 10 = full animation). Below 4: hover/active states only. Above 6: scroll-triggered reveals and cascading transitions.
- **VISUAL_DENSITY: 3** — (1 = airy/gallery, 10 = packed). Below 4: generous whitespace, minimal cards. Above 7: tighter padding, borders over card containers.

## AI Tells — Forbidden Patterns

These make designs look obviously AI-generated. Never use them:

**Layout:** No centered hero sections when DESIGN_VARIANCE > 4. No three equal-width card grids side by side. No awkward floating decorative elements.

**Visual:** No neon glows. No pure black (`#000000`) backgrounds. No gradient text (`bg-clip-text`). No oversaturated accents. No custom cursors.

**Typography:** Never use Inter as the primary font — it signals default AI output. No oversized H1s that dwarf all other content.

**Copy & Content:** No placeholder names like "John Doe", "Jane Smith". No company names like "Acme", "Nexus", "Apex". No suspiciously perfect stats like "99.99%" or "10,000+". No filler words like "Elevate", "Seamless", "Empower", "Transform".

## Hard Rules

- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not use `h-screen` for full-height sections — use `min-h-[100dvh]` to prevent iOS viewport bugs
- Prefer CSS Grid over flexbox percentage math for multi-column layouts
