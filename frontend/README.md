# Portfolio

A small React + Vite site: an entry "gate" screen with a mountain backdrop,
which crossfades to a different backdrop and the main site when you click
"Enter portfolio".

## Project structure

```
src/
  data/
    profile.js       <- EDIT THIS FILE for all your real content
  components/
    Backdrop.jsx      the two background scenes + crossfade
    Doodles.jsx        the small line-art illustrations (cat, bird, flowers, fern)
    Gate.jsx           the entry screen
    Chat.jsx            the "ask about me" widget (currently a demo, see below)
    Experience.jsx     renders profile.experience
    Projects.jsx        renders profile.projects
    Skills.jsx           renders profile.skills, with a scroll-in animation
  App.jsx             ties everything together
  index.css            all styles, in one file, organized by section
```

You should only ever need to edit `src/data/profile.js` to change what the
site says. The component files control how things look, not what they say.

## Running it locally

You need [Node.js](https://nodejs.org) installed (version 18 or later).

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

## Before you deploy

1. Open `src/data/profile.js` and replace every `TODO` with real, accurate
   information - see the comments in that file for guidance on what "real"
   means for each field (especially: don't mark a project "live" until its
   link actually works).
2. Put your resume PDF in `public/resume.pdf` (replacing the placeholder
   text file there).
3. Run `npm run build`. This creates a `dist/` folder with the finished site.

## Deploying for free

Any of these work well for a Vite app, and all have a free tier:

- **Vercel** - connect your GitHub repo, it detects Vite automatically.
- **Netlify** - same idea; build command `npm run build`, output folder `dist`.
- **Cloudflare Pages** - same idea.
- **GitHub Pages** - needs one extra setting (`base` in `vite.config.js`) if
  your repo isn't named `yourusername.github.io`. Ask if you want this
  configured.

## Making the AI assistant real

Right now `Chat.jsx` answers from a fixed list in `profile.js` (see the
`sampleQA` field) with a fake typing delay - there's no real AI involved yet.

To make it real:
1. Build a small backend endpoint (FastAPI, or a Cloudflare Worker) that:
   - receives the visitor's question,
   - includes your profile data in a prompt to an LLM,
   - instructs the LLM to answer only from that data and nothing else,
   - returns the answer.
2. In `Chat.jsx`, replace the `fakeAnswer()` function and the `setTimeout`
   with a real `fetch()` call to that endpoint.

Keep your API key on the backend, never in this frontend code - anything in
the browser is visible to anyone who opens developer tools.
