## Personalized Content Dashboard (React + Vite)

An interactive dashboard that aggregates personalized news, movie recommendations, and mock social posts with search, drag-and-drop reordering, favorites, dark mode, and infinite scrolling.

### Stack
- React (Vite)
- Redux Toolkit
- Axios
- Framer Motion, React DnD
- Vitest + Testing Library, Cypress

### Getting Started
1. Clone and install
```bash
git clone <your-repo-url>
cd personalized-dashboard
npm i
```
2. Configure environment vars
```bash
cp .env.example .env
# add your keys
VITE_NEWS_API_KEY=...
VITE_TMDB_API_KEY=...
```
3. Run dev server
```bash
npm run dev
```

### Scripts
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview build
- `npm run test` - run unit/integration tests (Vitest)
- `npm run cypress` - run E2E tests (Cypress)

### Features
- Personalized feed via preferences (categories)
- Infinite scroll and debounced search
- Drag-and-drop reordering (feed and favorites)
- Favorites with persistence (localStorage)
- Dark mode via CSS variables
- Responsive layout with sidebar and header

### Security
Do not commit `.env`. API keys are read from `import.meta.env.*` and used only in browser calls. For production, proxy through a backend.