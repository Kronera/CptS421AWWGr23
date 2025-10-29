# A Woman’s Worth Web Platform  
**CptS421 Group 23 — Washington State University**

---

## Project Overview
We’re building a modern, welcoming web platform for **A Woman’s Worth (AWW)** — an organization dedicated to empowering women by providing a safe space to share stories, connect with others, and discover community events.  

Our goal is to improve user experience, donation visibility, and administrative efficiency through a clean and accessible design.

---

## One-Sentence Summary
A user-friendly website for A Woman’s Worth that allows visitors to share stories, explore events, and engage with the community — while keeping management simple for AWW staff.

---

## Tech Stack
- **Frontend:** Next.js 15 (App Router, TypeScript, Tailwind CSS)  
- **Backend CMS:** Strapi 5 (Node.js / Koa)  
- **Database:** PostgreSQL (Dockerized)  
- **Package Manager:** pnpm (workspace setup)  
- **CI/CD:** GitHub Actions  

---

## Installation Guide

### Prerequisites
Make sure you have these installed:
- Node.js 20.x  
- Docker Desktop (with Docker Engine running)  
- pnpm via Corepack (ships with Node 20)  

---

### 1. Clone the Repository
```bash
git clone https://github.com/Kronera/CptS421AWWGr23.git
cd CptS421AWWGr23/code
```

### 2. Start PostgreSQL (Docker)
```bash
cd infra
docker compose up -d
# Verify container
docker ps --filter "ancestor=postgres:16"
cd ..
```

### 3. Configure Environment Variables
```bash
# CMS
cp apps/cms/.env.example apps/cms/.env

# Web
cp apps/web/.env.example apps/web/.env.local
```

### 4. Install Dependencies
```bash
pnpm install
```
This installs dependencies for all workspace apps (CMS & Web).

### 5. Run the CMS (Strapi)
```bash
cd apps/cms
pnpm build   # first time only
pnpm develop # starts http://localhost:1337/admin
```
On first run:
- Create your Strapi admin account.  
- Add a Content Type `Event` (fields: title, startDateTime, location).  
- Create one event and publish it.  
- Go to **Settings → Roles → Public** and enable `find` + `findOne` for Event.

### 6. Run the Web (Next.js)
```bash
cd ../web
pnpm dev
```
Open [http://localhost:3000/events](http://localhost:3000/events) — your published event should appear.

---

### Common Issues
| Symptom | Cause | Fix |
|----------|--------|-----|
| `ECONNREFUSED` on `/events` | CMS not running | Start `pnpm develop` in `apps/cms` |
| `403 Forbidden` | Permissions not set | Enable Public role for Event |
| Empty event list | Event not published | Go to Content Manager → Publish |
| Port 5432 in use | Local Postgres conflict | Stop local DB → `brew services stop postgresql` |

---

## Contributing
1. Fork the repo  
2. Create your feature branch  
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit and push  
   ```bash
   git commit -m "feat: add new feature"
   git push origin feature/my-feature
   ```
4. Open a Pull Request

---

## Additional Resources
- [Sprint 1 Video Demo](https://youtu.be/S8LtQ6oNvmo)

---

## License
See the [LICENSE](https://github.com/Kronera/CptS421AWWGr23/blob/main/LICENSE) file for details.