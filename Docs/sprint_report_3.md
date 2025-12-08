# Sprint 3
**Report (November 5, 2025 – December 6, 2025)**

## YouTube link of Sprint 3
👉 *Unlisted Sprint 3 Demo Video*

---

## What's New (User Facing)

* Completed **Stories** section.
* * Completed **Landing Page** section.
* Added **Story Submission** page allowing users to submit stories for review.
* Implemented **Contact Page** with social links, address, map embed, and CMS-driven fields.
* Enhanced **Events** layout and detail pages (date, time, location, images).
* Integrated **partnership logo strip**, homepage improvements, and hero image fixes.
* Added fallback images, loading states, and responsive UI polish.
* Created first version of **Partnerships** and **Store** placeholder pages.

---

## Work Summary (Developer Facing)

Sprint 3 focused on actual **feature implementation**, **UI polish**, and **CMS integration**, moving the project from prototype to functioning web pages connected to real Strapi content.

### Key Technical Work

* Implemented Next.js dynamic routes for stories and events (`/stories/[id]`, `/events/[id]`).
* Added client-side **Story Submission form** with image upload + text blocks.
* Implemented **Strapi upload integration** and documentId lookups for persistent story URLs.
* Added backend route `/api/stories/submit` with moderation workflow (pending → approved).
* Added profanity and inappropriate content filtering design (validation planned for next sprint).
* Built **story carousel**, auto-sliding layout logic, and image focal-point support.
* Fixed Windows (WSL) issues, particularly Strapi uploads folder and file permissions.
* Added fallback images and CMS-driven media queries.
* Refined UI transitions, gradient themes, and sponsor / logo layout.

**Team Contributions:**
- **Natan:** Led implementation of Landing Page, Stories, and Events experiences, including dynamic routing, story submission pipeline, moderation workflow design, and visual refinements across landing, hero components, carousel UX, and gradient styling. Managed CMS integration decisions and Next.js content flows.
- **Julian:** Designed and implemented the Contact Page, including social links and CMS-driven fields. Took ownership of the Partnerships Page structure, layout, and early content population. Collaborated on UI polish and branding alignment, ensuring consistency across new pages.
- **Kyle:** Directed sprint planning, scope clarity, and weekly coordination. Implemented Store and Donations placeholders and integration planning, evaluating Stripe and payment alternatives for Sprint 4. Drove outreach discussions with the client and validated requirements and content needs. Supported documentation and demo preparation.
- **All Memebers** Contributed documentation, CI review, Windows installation instructions, and sprint report writing. Worked collaboratively on polishing UI, refining CMS workflows, and reshaping the product direction based on client feedback in real time.

---

## CI / Infrastructure

* Updated GitHub Actions pipeline to workspace-level `pnpm install`.
* CI now builds both CMS + Web on every push.
* Added Docker PostgreSQL validation.
* Enhanced README instructions for Windows/WSL and macOS setup.
* Created Windows-installation documentation (Docker, pnpm, WSL, Strapi permissions).

---

## Client Feedback & Impact on Direction

The client requested focus on **content and engagement**, so we deferred user profiles and chatbot features.

Client-requested priorities:
* Partnerships page
* Services page
* About/Staff page
* Past Events gallery
* Store + Donations
* Content & photography updates
* Final branding polish

These became the new target items for Sprint 4.

---

## Unfinished Work

* Services page (awaiting content and design)
* About Us / Staff information
* Partnerships content population
* Past Events media gallery
* Donation and Store functionality (awaiting assets and payment preference confirmation)

---

## Completed Issues / User Stories

See GitHub project board during this sprint:
* Stories implementation
* Story submission with moderation
* Contact page
* CMS integration updates
* Events polish
* Homepage hero and sponsor banners
* Windows / Strapi upload issue resolution
* CI workflow update

---

## Incomplete Issues / User Stories

* Store / donation payment flow (Stripe + PayPal)
* Services and About content
* Gallery pages

---

## Code Files for Review

* `apps/web/app/stories/**`  
* `apps/web/app/events/**`  
* `apps/web/app/contact/**`  
* `apps/web/app/api/stories/submit/route.ts`  
* `apps/cms/src/api/stories`  
* `infra/docker-compose.yml`
* `.github/workflows/ci.yml`

---

## Retrospective Summary

### What Went Well
* Major visible progress for client-facing pages
* Story submission pipeline working end-to-end
* CI stability across multiple OS environments
* Solid client feedback guiding priorities
* Better UI polish and consistent branding

### What Needs Improvement
* Windows testing earlier in the sprint
* Faster client content gathering (photos, bios, etc.)
* Move toward shared dev database to avoid data drift

### Next Sprint Goals (Sprint 4)
* Begin Chatbot Implementation
* Complete Services, Partnership, and Staff pages
* Build Past Events photo gallery
* Implement Store + Donations (Stripe + PayPal)
* Moderate inappropriate story submissions
* Deployment options evaluation (cheapest vs moderate)
* Begin hosting testing and domain planning
