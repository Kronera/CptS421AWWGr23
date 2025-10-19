# CptS421 AWW Gr23

# A Womans Worth

## We aim to create a felxible and inviting website to allow for women to share their stories and meet others, while also improving donations and user experience.

### Demo our site here: https://spiderssuck.github.io/demo/

### One Sentence description of the project

We plan on building a new webpage for A Womans Worth organization that is inviting and easy for users while also being easy to understand by the administrative staff at AWW.

### Additional information about the project

AWW's vision for the website is to allow for users to share their stories with blogs on their webpage while also being able to look for events that are hosted by AWW

## Installation

### Prerequisites

### Prereqs
- Node 20.x
- Docker Desktop (engine running)
- pnpm via Corepack (ships with Node 20)

### 1) Clone
git clone <REPO_URL>
cd <REPO_NAME>

### 2) Start Postgres (Docker)
cd code/infra
docker compose up -d
# verify
docker ps --filter "ancestor=postgres:16"
cd ../..

### 3) Configure envs
# CMS
cp code/apps/cms/.env.example code/apps/cms/.env
# Web
cp code/apps/web/.env.example code/apps/web/.env.local

### 4) Install deps (each app)
cd code/apps/cms && pnpm i
cd ../web && pnpm i
cd ../..   # back to repo root

### 5) Run the CMS (terminal A)
cd code/apps/cms
pnpm run build   # first time only
pnpm run develop # http://localhost:1337/admin (create admin on first run)

### 6) Create minimal content (once)
In the CMS admin:
- Content-Type Builder → create `Event` (title, startDateTime, location)
- Content Manager → add one Event and **Publish**
- Settings → Roles → **Public** → enable `find` and `findOne` on Event → Save

### 7) Run the web (terminal B)
cd code/apps/web
pnpm dev
# Open http://localhost:3000/events and you should see your published Event.

### Common pitfalls
- `ECONNREFUSED` on /events → CMS not running; start `pnpm run develop` in apps/cms.
- 403 on /events → Public role permissions not set.
- Empty list → Event not Published.
- Port 5432 in use → stop local Postgres: `brew services stop postgresql` then `docker compose up -d`.


## Contributing

TODO: Leave the steps below if you want others to contribute to your project.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Additional Documentation

TODO: Provide links to additional documentation that may exist in the repo, e.g.,
  * [Sprint one Video](https://youtu.be/S8LtQ6oNvmo)
  * User links

## License
[License is located in the LICENSE file in main.](https://github.com/Kronera/CptS421AWWGr23/blob/4532b9d524ae301612e79c540446a4b5bb4fee3d/LICENSE)
