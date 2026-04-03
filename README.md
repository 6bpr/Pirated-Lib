# Pirated Lib

> A curated index of websites, apps, and services for consuming Japanese media.

<p align="center">
  🎬 Anime &nbsp;·&nbsp; 📚 Manga &nbsp;·&nbsp; 📖 Novels &nbsp;·&nbsp; 🔞 Hentai &nbsp;·&nbsp; 🛠️ Tools
</p>

<p align="center">
  Browse · Compare · Discover
</p>

---

## ✨ Features

- **🗂️ Library-based browsing** — Organized into Anime, Manga, Novels, Hentai, and Tools
- **📦 Curated collections** — Every entry is done by hand, not scraped
- **🔍 Full-text search** — Search across sites, collections, tags, and descriptions
- **📊 Status tracking** — Know if a site is Online, Partial, or Down
- **🏷️ Rich tagging** — Filter by Free, No Ads, FOSS, Legal, and more
- **🌐 Multi-language** — Covers English and foreign-language sites
- **📱 Responsive** — Works on desktop and mobile
- **🌙 Dark theme** — Easy on the eyes

---

## 🚀 Quick Start

This is a **static site** — no build step, no dependencies, no server required.

Clone the repo:
```bash
git clone https://github.com/YOUR_USERNAME/pirated-lib.git
cd pirated-lib
```

Open in browser:
```bash
xdg-open index.html
```

Or deploy to **GitHub Pages**, **Netlify**, **Vercel**, or any static host — just drop the files and go.

---

## 📁 Project Structure

```
├── index.html          ← Home page
├── libraries.html      ← All libraries overview
├── collections.html    ← All collections grid
├── collection.html     ← Collection detail view
├── lists.html          ← User lists (coming soon)
├── style.css           ← All styles (dark theme, responsive)
├── app.js              ← Router, sidebar, page renderers
├── data.js             ← Library & collection data
└── images/             ← Icons and assets
```

---

## 📝 Adding Content

All data lives in `data.js`. The structure is straightforward:

```js
const LIBS = [
  {
    id: 'anime',
    ico: '<img src="images/icon.png" style="width: 24px; height: 24px;">',
    name: 'Anime',
    desc: 'A style of Japanese film and television animation.',
    colls: ['en-stream', 'licensed'],
  },
];

const COLLS = {
  'en-stream': {
    name: 'English Streaming Sites',
    ico: '<img src="images/anime/icon.png" style="width: 24px; height: 24px;">',
    lib: 'Anime',
    desc: 'Free and pirate anime streaming sites.',
    sites: [
      {
        n: 'Site Name',
        u: 'https://example.com',
        note: 'Optional caveat',
        d: 'Short description.',
        s: 'g',           // g=online, y=partial, r=down
        t: ['Free', 'No Ads'],
      },
    ],
  },
};
```

---

## 🎨 Design Philosophy

Minimal. Functional. Dark. No frameworks, no build tools, no bloat.

Built with vanilla HTML, CSS, and JavaScript. Loads fast, works everywhere, respects your bandwidth and your attention.

---

## 🤝 Contributing

Got a site to add? Found a dead link? Want to improve the UI?

1. Fork the repo
2. Make your changes
3. Open a PR

All contributions are welcome — especially new entries, status updates, and corrections.

---

## 📄 License

MIT

---

<p align="center">
  Made with 💜 and zero frameworks
</p>
