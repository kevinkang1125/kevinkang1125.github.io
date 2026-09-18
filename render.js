/* ────────────────────────────────────────────────────────────────────────
   render.js — turns the DATA object in index.html into the page.
   You should never need to edit this file. Edit DATA in index.html.
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const set = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };

  /* Inline SVG icons for the link row */
  const ICONS = {
    mail:    '<path d="M2 5h16v10H2z"/><path d="m2 5 8 6 8-6"/>',
    file:    '<path d="M5 2h6l4 4v12H5z"/><path d="M11 2v4h4"/>',
    scholar: '<path d="M10 2 1 7l9 5 9-5z"/><path d="M4 9v5c0 1.7 2.7 3 6 3s6-1.3 6-3V9"/>',
    github:  '<path d="M7.5 17.5c-4 1-4-2-5.5-2.5m11 5v-3.2c0-1 .1-1.4-.5-2 2.3-.3 4.5-1.2 4.5-5a4 4 0 0 0-1.1-2.7 3.7 3.7 0 0 0-.1-2.8s-1.2-.3-3.8 1.4a9.3 9.3 0 0 0-5 0C4.4 3.7 3.2 4 3.2 4a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 2 9.5c0 3.8 2.2 4.7 4.5 5-.6.6-.6 1.2-.5 2V20"/>',
    linkedin:'<path d="M5 8v9M5 4.5v.01M10 17v-5a2.5 2.5 0 0 1 5 0v5"/><path d="M10 12v5"/>',
    orcid:   '<circle cx="10" cy="10" r="8"/><path d="M8 7v7M8 5v.01M12 14V9h1.5a2.5 2.5 0 0 1 0 5z"/>'
  };
  const icon = (name) =>
    ICONS[name]
      ? `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`
      : "";

  const isExternal = (href) => /^(https?:|mailto:)/.test(href);
  const attrs = (href) =>
    /^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";

  /* ── Profile ─────────────────────────────────────────────────────────── */
  const p = DATA.profile;
  const photo = $("hero-photo");
  photo.src = p.photo;
  photo.onerror = () => {
    /* graceful fallback: initials circle instead of a broken image */
    const d = document.createElement("div");
    d.className = "hero-photo hero-photo--fallback";
    d.textContent = p.name.split(/\s+/).map((w) => w[0]).join("");
    photo.replaceWith(d);
  };

  set("hero-name", p.nickname ? `${p.name} <span class="nick">(${p.nickname})</span>` : p.name);
  set("hero-tagline", p.tagline);
  set("hero-roles", p.roles.map((r) => `<li>${r}</li>`).join(""));
  set("hero-links", p.links.map((l) =>
    `<a class="chip" href="${l.href}"${attrs(l.href)}>${icon(l.icon)}<span>${l.label}</span></a>`
  ).join(""));

  set("bio", DATA.about.map((par) => `<p>${par}</p>`).join(""));

  /* ── News ────────────────────────────────────────────────────────────── */
  set("news-list", DATA.news.map((n) =>
    `<li><span class="news-date">${n.date}</span><span class="news-text">${n.text}</span></li>`
  ).join(""));

  /* ── Education ────────────────────────────────────────────────────────
     HugoBlox "About Me" styling: graduation-cap icon, degree as the primary
     line, institution as the lighter line beneath it.
     ─────────────────────────────────────────────────────────────────────── */
  const CAP = `<svg class="edu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
       <path d="M12 3 2 8l10 5 10-5z"/>
       <path d="M5 10.5V15c0 1.7 3.1 3 7 3s7-1.3 7-3v-4.5"/>
       <path d="M21.4 9.3v4.4"/></svg>`;

  set("education-list", DATA.education.map((e) => `
    <article class="edu-item">
      ${CAP}
      <div class="edu-body">
        <div class="edu-head">
          <h3 class="edu-degree">${e.degree}</h3>
          <span class="edu-dates">${e.dates}</span>
        </div>
        <p class="edu-school">${e.school}<span class="edu-loc">${e.location}</span></p>
        ${e.notes && e.notes.length
          ? `<ul class="edu-notes">${e.notes.map((n) => `<li>${n}</li>`).join("")}</ul>`
          : ""}
      </div>
    </article>`).join(""));

  /* ── Research: publications and projects in one list ──────────────────
     Papers render authors + venue; project-only entries skip both and lean
     on `meta`. Everything else (blurb, bullets, tags, links) is shared.
     ─────────────────────────────────────────────────────────────────────── */
  set("research-note", DATA.researchNote || "");
  set("research-list", DATA.research.map((r) => `
    <article class="card${r.highlight ? " card--featured" : ""}">
      <div class="card-thumb">
        ${r.img ? `<img src="${r.img}" alt="" loading="lazy">` : ""}
        ${r.badge ? `<span class="badge">${r.badge}</span>` : ""}
      </div>
      <div class="card-body">
        <h3 class="card-title">${r.title}</h3>
        ${r.authors ? `<p class="card-authors">${r.authors}</p>` : ""}
        ${r.venue   ? `<p class="card-venue">${r.venue}</p>`     : ""}
        ${r.meta    ? `<p class="card-meta">${r.meta}</p>`       : ""}
        ${r.blurb   ? `<p class="card-blurb">${r.blurb}</p>`     : ""}
        ${r.bullets && r.bullets.length
          ? `<ul class="card-bullets">${r.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`
          : ""}
        ${r.tags && r.tags.length
          ? `<div class="tags">${r.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`
          : ""}
        ${r.links && r.links.length
          ? `<div class="link-row link-row--sm">${r.links.map(([label, href]) =>
              `<a class="chip chip--sm" href="${href}"${attrs(href)}>${label}</a>`).join("")}</div>`
          : ""}
      </div>
    </article>`).join(""));

  /* ── Skills ──────────────────────────────────────────────────────────── */
  set("skill-list", DATA.skills.map((s) => `
    <div class="skill-group">
      <h3>${s.group}</h3>
      <div class="tags">${s.items.map((i) => `<span class="tag">${i}</span>`).join("")}</div>
    </div>`).join(""));

  /* ── Footer ──────────────────────────────────────────────────────────── */
  set("footer-note", DATA.footerNote || "");
  set("footer-links", p.links.filter((l) => isExternal(l.href)).map((l) =>
    `<a href="${l.href}"${attrs(l.href)}>${l.label}</a>`).join('<span class="dot">&middot;</span>'));
  set("updated", new Date(document.lastModified).toLocaleDateString("en-US",
    { year: "numeric", month: "long" }));

  /* ── Dark mode toggle (remembers your choice) ────────────────────────── */
  const btn = $("theme-toggle");
  const SUN = "&#9728;", MOON = "&#9789;";
  const apply = (mode) => {
    document.documentElement.dataset.theme = mode;
    btn.innerHTML = mode === "dark" ? SUN : MOON;
  };
  apply(localStorage.getItem("theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  btn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    apply(next);
  });

  /* ── Highlight the section you're currently reading in the nav ────────── */
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const targets = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  targets.forEach((t) => spy.observe(t));
})();
