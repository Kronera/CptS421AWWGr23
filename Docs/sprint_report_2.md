# Sprint 2  
**Report (October 3, 2025 – November 5, 2025)**  

## YouTube link of Sprint 2  
Video (Make this video unlisted)  
[Unlisted Sprint 2 Demo Video Link]( )  

---

## What's New (User Facing)
* Delivered a **functional prototype** of the A Woman’s Worth (AWW) website.
* Implemented the **frontend using Next.js 15 (App Router)** styled with Tailwind CSS.
* Integrated the **Strapi 5 CMS** as a headless backend for managing stories, events, and partnerships.
* Established a **PostgreSQL database (Dockerized)** for local development.
* Created the first version of the **Stories**, **Events**, **Landing Page**, **About us**, and **Ui** sections, fully synced with Strapi content.
* Added **GitHub Actions CI pipeline** to automate builds and validate project integrity.
* Improved site layout consistency, navigation flow, and content loading behavior.
* Updated the project README to include detailed setup steps.
* Collected **client feedback** to shape next sprint deliverables.

---

## Work Summary (Developer Facing)
During Sprint 2, our team transitioned from planning to implementation, focusing on setting up the **core architecture**, improving developer workflows, and delivering the first client-visible prototype.

**Key Technical Work:**
* **Monorepo Setup:** Consolidated all app code into `/code` using `pnpm workspaces` for `cms`, `web`, and `infra`.
* **Backend (CMS):** Configured Strapi 5 with PostgreSQL 16; set up content types for Stories, Events, and Sponsors; and created environment templates.
* **Frontend (Web):** Implemented StoriesCarousel, Sponsors, Contact info., and Events components connected to Strapi via REST API, achieving live CMS-driven content.
* **Docker Integration:** Created a `docker-compose.yml` under `infra/` to spin up the local PostgreSQL instance.
* **CI/CD:** Implemented a monorepo-aware GitHub Actions pipeline to build both CMS and Web apps from a single install step.
* **Cross-Platform Support:** Resolved Windows/macOS path and permission issues; validated that the project runs consistently on both via WSL2.
* **Documentation:** Extended the README with setup instructions, common issues, and quick-fix steps for new contributors.

**Team Contributions:**
- **Natan:** Led Sprint, CI/CD setup, repository restructuring, Docker integration, environment unification, focused on Strapi content models, schema management, CMS integration, worked on Next.js page layouts, reusable components, and frontend styling alignment with client branding.
- **Julian:** 
- **Kyle:** 

---

## Client Feedback & Next Steps
During the most recent client meeting, feedback centered on expanding the platform’s informational and engagement content.
The client requested:
* A **Partnerships page** to highlight collaboration opportunities and sponsors.
* A **Services page** describing AWW’s community programs and offerings.
* An **About Us page** introducing staff members with short biographies and photos.
* A **Past Events gallery** displaying images from previous community events.
* The **Store and Donations** sections to allow visitors to support the organization.
* The **AI Chatbot** function.

These additions will form the core goals of **Sprint 3**, alongside refinement of visual polish and content structure.

---

## Unfinished Work
* Store and donation page functionality.  
* Services, About Us, and Partnership pages (content and design to be finalized).  
* Photo gallery section for past events.  
* Integration of updated content and assets once provided by the client.  

---

## Completed Issues / User Stories
All sprint progress and commits are tracked under:  
* [URL of issue 1](https://github.com/Kronera/CptS421AWWGr23/issues/23)
* [URL of issue 2](https://github.com/Kronera/CptS421AWWGr23/issues/22)
* [URL of issue 3](https://github.com/Kronera/CptS421AWWGr23/issues/21)
* [URL of issue 4](https://github.com/Kronera/CptS421AWWGr23/issues/19)
* [URL of issue 5](https://github.com/Kronera/CptS421AWWGr23/issues/18)

## Incomplete Issues/User Stories
Here are links to issues we worked on but did not complete in this sprint:
* [URL of issue 1](https://github.com/Kronera/CptS421AWWGr23/issues/25) Currently in the proccess of implementing this page/feature.
* [URL of issue 2](https://github.com/Kronera/CptS421AWWGr23/issues/24) Currently in the proceess of implementing this feature.
* [URL of issue 3](https://github.com/Kronera/CptS421AWWGr23/issues/1) Once all features are added full testing will begin.
---

## Incomplete Issues / User Stories
* Initial store/donation flow (awaiting client assets).  
* Partnership page (pending design).  
* Content population for Services and About Us.  

---

## Code Files for Review
* `.github/workflows/ci.yml` — GitHub Actions build & validation pipeline.
* `code/infra/docker-compose.yml` — PostgreSQL service configuration.
* `code/apps/cms/` — Strapi content types and API setup.
* `code/apps/web/` — Next.js frontend components and pages.
* `code/README.md` — Updated installation and run instructions.

---

## Retrospective Summary

### What Went Well
* Delivered a fully functional CMS-driven prototype with Strapi + Next.js.
* Cross-platform consistency achieved with Docker and WSL2.
* CI pipeline ensures reliable, repeatable builds.
* Client provided clear, actionable feedback for next sprint.
* Solid collaboration across development areas (frontend, backend, infra).

### What Needs Improvement
* Earlier testing for Windows setup to reduce environment delays.
* More granular issue tracking for mid-sprint progress.
* Define clearer handoff points between CMS and Web teams.

### Next Sprint (Goals)
* Implement Partnerships, Services, About Us, and Past Events pages.  
* Develop Store and Donation flow once client assets are provided.  
* Apply client feedback from the Sprint 2 presentation.  
* Continue visual refinements and content alignment with branding.  
* Prepare for initial deployment testing (cheapest vs moderate hosting options).  

---
