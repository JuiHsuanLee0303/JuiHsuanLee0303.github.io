# Jui-Hsuan Lee Portfolio

Personal portfolio site for **Jui-Hsuan Lee**, focused on:

- AI Engineer / LLM / RAG Engineer positioning
- Enterprise AI integration and AI Agent workflows
- Research, experience, and interactive terminal-style presentation

Live site:
[https://juihsuanlee0303.github.io/](https://juihsuanlee0303.github.io/)

## Stack

- Vue 3
- Vite
- Vue Router
- Tailwind CSS

## Main Sections

- `Home`: positioning, featured case studies, skills, and contact links
- `Research`: conferences, publications, abstracts, and PDF links
- `Experience`: timeline-based work experience and highlights
- `Notes`: Markdown blog posts with per-post folders, embedded images, and downloadable attachments
- `Terminal`: interactive shell-style portfolio exploration

## Local Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Deployment

This project is deployed to **GitHub Pages** using the `gh-pages` branch.

Publish the latest build:

```bash
npm run deploy
```

The deploy script will:

1. Build the site into `dist`
2. Publish `dist` to the `gh-pages` branch

## Project Structure

```text
src/
  components/    Shared UI components
  content/posts/ Markdown blog posts, images, and attachments
  data/          Content and portfolio data
  lib/blog/      Markdown rendering and post loading
  router/        Route and metadata handling
  views/         Page-level Vue views
public/
  publications/  PDF files for publications
```

## Content Updates

Most portfolio content is managed in:

- `src/data/common.json`
- `src/data/home.json`
- `src/data/experience.json`
- `src/data/research.json`
- `src/data/terminal.json`

Blog posts live in per-post folders under:

- `src/content/posts/<slug>/index.md`
- `src/content/posts/<slug>/...attachments`

Example:

```text
src/content/posts/gstack-intro/
  index.md
  gstack-cover.svg
  gstack-notes.txt
```

Inside the Markdown file, use relative paths such as `![diagram](./gstack-cover.svg)` or `[download](./gstack-notes.txt)`.

For the full article workflow and publishing checklist, see:

- `docs/blog-authoring-guide.md`

## Notes

- PDF assets for publications should be placed in `public/publications`
- Research page links use public URLs such as `/publications/filename.pdf`
- After updating source code, GitHub Pages will not refresh until `npm run deploy` is executed
