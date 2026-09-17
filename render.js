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

  /* ── Education (standalone timeline) ─────────────────────────────────── */
  set("education-list", DATA.education.map((e) => `
    <article class="tl-item">
      <div class="tl-marker" aria-hidden="true"></div>
      <div class="tl-body">
        <div class="tl-head">
          <h3>${e.school}</h3>
          <span class="tl-dates">${e.dates}</span>
        </div>
        <p class="tl-degree">${e.degree}</p>
        <p class="tl-where">${e.location}</p>
        ${e.notes && e.notes.length
          ? `<ul class="tl-notes">${e.notes.map((n) => `<li>${n}</li>`).join("")}</ul>`
          : ""}
      </div>
    </article>`).join(""));

  /* ── Publications ────────────────────────────────────────────────────── */
  set("pub-note", DATA.pubNote || "");
  set("publication-list", DATA.publications.map((pub) => `
    <article class="card${pub.highlight ? " card--featured" : ""}">
      <div class="card-thumb">
        ${pub.img ? `<img src="${pub.img}" alt="" loading="lazy">` : ""}
        ${pub.badge ? `<span class="badge">${pub.badge}</span>` : ""}
      </div>
      <div class="card-body">
        <h3 class="card-title">${pub.title}</h3>
        <p class="card-authors">${pub.authors}</p>
        <p class="card-venue">${pub.venue}</p>
        ${pub.blurb ? `<p class="card-blurb">${pub.blurb}</p>` : ""}
        ${pub.links && pub.links.length
          ? `<div class="link-row link-row--sm">${pub.links.map(([label, href]) =>
              `<a class="chip chip--sm" href="${href}"${attrs(href)}>${label}</a>`).join("")}</div>`
          : ""}
      </div>
    </article>`).join(""));

  /* ── Projects ────────────────────────────────────────────────────────── */
  set("project-list", DATA.projects.map((pr) => `
    <article class="card">
      <div class="card-thumb">
        ${pr.img ? `<img src="${pr.img}" alt="" loading="lazy">` : ""}
      </div>
      <div class="card-body">
        <h3 class="card-title">${pr.title}</h3>
        <p class="card-meta">
          <span class="card-role">${pr.role}</span>
          <span class="dot">&middot;</span>${pr.org}
          <span class="card-dates">${pr.dates}</span>
        </p>
        <ul class="card-bullets">${pr.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
        ${pr.tags && pr.tags.length
          ? `<div class="tags">${pr.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`
          : ""}
      </div>
    </article>`).join(""));

  /* ── Experience ──────────────────────────────────────────────────────── */
  set("experience-list", DATA.experience.map((x) => `
    <li class="row">
      <div>
        <strong>${x.role}</strong><br>
        <span class="muted">${x.org}${x.location ? ` &middot; ${x.location}` : ""}</span>
      </div>
      <span class="row-date">${x.dates}</span>
    </li>`).join(""));

  /* ── Awards / funding / patents / talks ──────────────────────────────── */
  set("funding-list", DATA.funding.map((f) => `
    <li class="row row--stack">
      <div>
        <strong>${f.title}</strong><br>
        <span class="muted">${f.role}</span>
        <p class="sub">${f.detail}</p>
      </div>
      <span class="row-date">${f.dates}</span>
    </li>`).join(""));

  set("patent-list", DATA.patents.map((pt) => `<li class="row"><div>${pt.text}</div></li>`).join(""));

  set("award-list", DATA.awards.map((a) => `
    <li class="row"><div>${a.text}</div><span class="row-date">${a.date}</span></li>`).join(""));

  set("talk-list", DATA.talks.map((t) => `
    <li class="row row--stack">
      <div>
        <em>&ldquo;${t.title}&rdquo;</em><br>
        <span class="muted">${t.venue} &middot; ${t.location}</span>
      </div>
      <span class="row-date">${t.date}</span>
    </li>`).join(""));

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
