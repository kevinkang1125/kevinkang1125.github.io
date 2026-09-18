# kevinkang1125.github.io

Personal academic homepage for **Qi Kang (Kevin)** — a single static page, no build step.
Live at **https://kevinkang1125.github.io**

## Files

| File | What it is |
|---|---|
| `index.html` | The page skeleton **and all of your content**, in one `DATA` object near the top |
| `render.js` | Turns `DATA` into HTML. You should never need to touch this |
| `style.css` | All styling. Colors are CSS variables in the `:root` block at the top |
| `assets/` | Your photo, CV PDF, and paper/project teaser images |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is instead of running Jekyll |

## Editing

Open `index.html`, scroll to the big `const DATA = { ... }` block. Every section of the
page is a labelled key in there:

```
profile    your name, photo, tagline, contact links
about      the intro paragraphs
news       reverse-chronological updates
education  the education list (grad-cap icon, degree over institution)
research   publications AND projects, merged into one list
skills     tag groups
```

The site is deliberately **not** a copy of the CV — no experience, awards,
funding, patent or talks sections. That material lives in the PDF. Anything
worth surfacing (the NAIRR award, the pending patent) is folded into the
bullets of the work it belongs to.

Adding work = adding one object to the `research` array:

```js
{
  title:   "Your Paper Title",
  authors: "<strong>Q. Kang</strong>, A. Coauthor",   // omit for project-only
  venue:   "<em>Some Conference</em>, 2027",          // omit for project-only
  badge:   "NeurIPS 2027",        // pill on the thumbnail
  img:     "assets/pubs/yourpaper.png",
  meta:    "Role · Group · Dates",
  blurb:   "One sentence on what it does.",
  bullets: ["What you actually did.", "And the next thing."],
  tags:    ["Keyword", "Another keyword"],
  links:   [["PDF","https://..."], ["Code","https://github.com/..."]]
}
```

Drop `authors` and `venue` for a project with no paper — the card renders fine
without them and leans on `meta` instead. Set `highlight: true` for the
accent-colored featured treatment. HTML works inside any string (`<strong>`,
`<em>`, `<a href>`).

## Preview locally

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000>. Hard-refresh (Cmd-Shift-R) after edits.

Opening `index.html` directly as a `file://` URL also works.

## Publish

```bash
git add -A
git commit -m "Update homepage"
git push
```

GitHub Pages redeploys automatically, usually within a minute.

## TODO before going live

- [x] ~~Add `assets/photo.jpg`~~ — done (cropped from `IMG_8145.JPG`, 600×600).
- [ ] Add `assets/Qi_Kang_CV.pdf` so the **CV** button works.
- [ ] Replace the placeholder Google Scholar and LinkedIn URLs in `DATA.profile.links`.
- [ ] Paste real paper URLs into the `links: []` arrays (search for `TODO` in `index.html`).
- [ ] Swap the generated placeholder teaser images in `assets/pubs/` and `assets/projects/`
      for real figures (16:10, ~600×375 or larger).
- [ ] Review the `news` entries — they were seeded from the CV and may need dates corrected.
