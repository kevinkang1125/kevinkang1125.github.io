# kevinkang1125.github.io

Homepage for **Qi Kang (Kevin)** Live at **https://kevinkang1125.github.io**

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
profile    name, photo, title, university, CV path, icon links
about      the "About Me" paragraphs
interests  left column of the intro's lower half
education  right column — degree + university only
news       reverse-chronological updates
research   publications AND projects, merged into one list
skills     tag groups
```

The intro is a single two-column card: portrait, name, title and icon links on
the left; About Me, a Download CV button, then Research Interests | Education on
the right. There is no separate Education section — it lives in that card, and
carries degree + university only.

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


