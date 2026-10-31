(() => {
  "use strict";
  const S = window.SITE;

  /* ================= helpers ================= */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("ar:" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("ar:" + k, JSON.stringify(v)); } catch {} },
  };
  const isMobile = () => matchMedia("(max-width: 760px)").matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const initials = (n) => n.replace(/\(.*?\)/g, "").split(/\s+/).filter((w) => /^[a-z]/i.test(w)).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const toSec = (t) => { const [m, s] = t.split(":").map(Number); return m * 60 + s; };
  const fmtSec = (n) => `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, "0")}`;
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const fmtTime = (d) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const longDate = (iso) => { const d = new Date(iso); return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${fmtTime(d)}`; };
  const shortDate = (iso) => { const d = new Date(iso); return `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(2)}`; };
  const plain = (md) => md.replace(/!\[[^\]]*\]\([^)]+\)/g, "").replace(/^---$/gm, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[#*]/g, "").replace(/\s+/g, " ").trim();

  let uid = 0;
  const icon = (name) => { const n = ++uid; return ICONS[name].replace(/id="([^"]+)"/g, (_, a) => `id="${a}-${n}"`).replace(/url\(#([^)]+)\)/g, (_, a) => `url(#${a}-${n})`); };

  const avatar = (size, opts = {}) => {
    const src = opts.src === undefined ? S.avatar : opts.src;
    const name = opts.name || S.name;
    const g = opts.g || ["#8e8e93", "#5e5e63"];
    return `<div class="avatar" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.38)}px;background:linear-gradient(135deg,${g[0]},${g[1]});position:relative">
      <span>${esc(initials(name))}</span>${src ? `<img src="${esc(src)}" alt="" onerror="this.remove()" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">` : ""}</div>`;
  };

  function md(src) {
    const inline = (s) => esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) =>
        u.startsWith("note:") ? `<a data-note="${u.slice(5)}">${t}</a>` : `<a href="${u}" target="_blank" rel="noopener">${t}</a>`);
    const out = []; let list = null, para = [];
    const flush = () => {
      if (para.length) { out.push(`<p>${para.map(inline).join("<br>")}</p>`); para = []; }
      if (list) { out.push(`<ul>${list.map((l) => `<li>${inline(l)}</li>`).join("")}</ul>`); list = null; }
    };
    for (const line of src.split("\n")) {
      const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (img) { flush(); out.push(`<figure class="note-fig"><img src="${esc(img[2])}" alt="${esc(img[1])}" loading="lazy" onerror="this.parentNode.remove()"></figure>`); }
      else if (/^---$/.test(line.trim())) { flush(); out.push("<hr>"); }
      else if (/^###\s/.test(line)) { flush(); out.push(`<h3>${inline(line.slice(4))}</h3>`); }
      else if (/^##\s/.test(line)) { flush(); out.push(`<h2>${inline(line.slice(3))}</h2>`); }
      else if (/^[-•]\s/.test(line)) { if (para.length) flush(); (list ||= []).push(line.slice(2)); }
      else if (!line.trim()) flush();
      else { if (list) flush(); para.push(line); }
    }
    flush();
    return out.join("");
  }

  /* ================= small UI icons ================= */
  const sv = (d, o = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${o}>${d}</svg>`;
  const fl = (d) => `<svg viewBox="0 0 24 24" fill="currentColor">${d}</svg>`;
  const UI = {
    search: sv('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    compose: sv('<path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/>'),
    trash: sv('<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>'),
    back: sv('<path d="m15 18-6-6 6-6"/>'),
    fwd: sv('<path d="m9 18 6-6-6-6"/>'),
    down: sv('<path d="m6 9 6 6 6-6"/>'),
    play: fl('<path d="M7 4.5v15l13-7.5z"/>'),
    pause: fl('<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>'),
    next: fl('<path d="M3 6v12l8.5-6zM12 6v12l8.5-6z"/>'),
    prev: fl('<path d="M21 6v12l-8.5-6zM12 6v12L3.5 12z"/>'),
    shuffle: sv('<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>'),
    vol: sv('<path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>'),
    wifi: sv('<path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/>'),
    bt: sv('<path d="m7 7 10 10-5 5V2l5 5L7 17"/>'),
    cc: sv('<rect x="3" y="5" width="18" height="5" rx="2.5"/><rect x="3" y="14" width="18" height="5" rx="2.5"/><circle cx="8" cy="7.5" r="1.3" fill="currentColor"/><circle cx="16" cy="16.5" r="1.3" fill="currentColor"/>'),
    mirror: sv('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="m8 20 4-4 4 4z" fill="currentColor"/>'),
    cloud: fl('<path d="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/>'),
    airdrop: sv('<circle cx="12" cy="12" r="2"/><path d="M8 16a6 6 0 1 1 8 0M5 19a10 10 0 1 1 14 0"/>'),
    sun: sv('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: sv('<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>'),
    heart: sv('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>'),
    heartF: fl('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>'),
    reply: sv('<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/>'),
    repost: sv('<path d="m17 1 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>'),
    chart: sv('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    link: sv('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'),
    cal: sv('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
    ext: sv('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>'),
    camera: sv('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>'),
    grid: sv('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'),
    list: sv('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),
    columns: sv('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/>'),
    gallery: sv('<rect x="3" y="3" width="18" height="12" rx="2"/><path d="M3 19h4M10 19h4M17 19h4"/>'),
    sidebar: sv('<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/>'),
    plus: sv('<path d="M12 5v14M5 12h14"/>'),
    mic: sv('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 19v3"/>'),
    up: sv('<path d="M12 19V5M5 12l7-7 7 7"/>', 'stroke-width="2.4"'),
    wave: sv('<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>'),
    image: sv('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>'),
    appsI: sv('<circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/>'),
    research: sv('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/>'),
    gear: sv('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'),
    help: sv('<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>'),
    sparkle: sv('<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>'),
    home: fl('<path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z"/>'),
    compass: sv('<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>'),
    album: sv('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>'),
    note: sv('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'),
    verified: fl('<path d="M22.5 12.5c0-1.6-.9-3-2.2-3.6.5-1.5.2-3.2-.9-4.3s-2.8-1.4-4.3-.9C14.5 2.4 13.2 1.5 11.5 1.5s-3 .9-3.6 2.2c-1.5-.5-3.2-.2-4.3.9S2.2 7.4 2.7 8.9C1.4 9.5.5 10.9.5 12.5s.9 3 2.2 3.6c-.5 1.5-.2 3.2.9 4.3s2.8 1.4 4.3.9c.6 1.3 2 2.2 3.6 2.2s3-.9 3.6-2.2c1.5.5 3.2.2 4.3-.9s1.4-2.8.9-4.3c1.3-.6 2.2-2 2.2-3.6zm-12.4 4.7L6.4 13.5l1.4-1.4 2.3 2.3 5.8-6.3 1.5 1.3z"/>'),
    dots: fl('<circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>'),
    clock: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    desktop: sv('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>'),
    doc: sv('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>'),
    download: sv('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>'),
    folder: sv('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'),
    house: sv('<path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
    icloud: sv('<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 0 1 0 9z"/>'),
    share: sv('<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>'),
    tag: sv('<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1"/>'),
    apps: sv('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    smile: sv('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>'),
    check: sv('<path d="M20 6 9 17l-5-5"/>', 'stroke-width="2.6"'),
  };
  const TRAFFIC = `<div class="traffic"><span class="t-close" title="Close"></span><span class="t-min" title="Minimize"></span><span class="t-max" title="Zoom"></span></div>`;

  /* ================= preferences ================= */
  const WALLPAPERS = [
    { id: "skyfall", name: "Skyfall", css: "url(assets/wallpaper.jpg) center/cover, #1c2a4a" },
    { id: "sierra", name: "Sierra", css: "url(assets/wallpaper-sierra.svg) center/cover, #6b4a5a" },
    { id: "sonoma", name: "Sonoma", css: "linear-gradient(170deg, #0e3d4f 0%, #217d74 38%, #9fc7a0 70%, #f0c890 100%)" },
    { id: "ventura", name: "Ventura", css: "radial-gradient(120% 90% at 30% 110%, #ff7a3d 0%, #d6276a 35%, #5a1a8a 65%, #12123a 100%)" },
    { id: "monterey", name: "Monterey", css: "radial-gradient(90% 80% at 80% 20%, #6e8cff 0%, transparent 60%), radial-gradient(100% 90% at 10% 90%, #ff5ea8 0%, transparent 55%), linear-gradient(135deg, #1a1446, #3a1f7a)" },
    { id: "night", name: "Midnight", css: "linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)" },
    { id: "peach", name: "Peach", css: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 45%, #a18cd1 100%)" },
    { id: "graphite", name: "Graphite", css: "linear-gradient(135deg, #232526, #414345)" },
  ];
  const ACCENTS = ["#0a84ff", "#bf5af2", "#ff375f", "#ff9f0a", "#ffd60a", "#30d158", "#8e8e93"];
  const prefs = Object.assign({ theme: "dark", accent: ACCENTS[0], wallpaper: "skyfall", wifi: true, bt: true, brightness: 1, volume: 70 }, store.get("prefs", {}));
  if (prefs.wpv !== 2) { prefs.wallpaper = "skyfall"; prefs.wpv = 2; } // move existing visitors onto the new default once
  const savePrefs = () => store.set("prefs", prefs);
  function applyPrefs() {
    const root = document.documentElement;
    const theme = prefs.theme === "auto" ? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark") : prefs.theme;
    root.dataset.theme = theme;
    root.style.setProperty("--accent", prefs.accent);
    root.style.setProperty("--brightness", prefs.brightness);
    const wp = WALLPAPERS.find((w) => w.id === prefs.wallpaper) || WALLPAPERS[0];
    $("#wallpaper").style.background = wp.css;
    renderMenubarRight();
  }

  /* ================= app registry ================= */
  const APPS = {
    finder: { name: "Finder", w: 880, h: 520 },
    notes: { name: "Notes", w: 1020, h: 660 },
    chatgpt: { name: "ChatGPT", w: 980, h: 640, cls: "gpt" },
    x: { name: "X", w: 640, h: 720, cls: "xapp" },
    linkedin: { name: "LinkedIn", w: 820, h: 720, cls: "li" },
    messages: { name: "Messages", w: 900, h: 600 },
    photos: { name: "Photos", w: 900, h: 600 },
    photobooth: { name: "Photo Booth", w: 780, h: 640, cls: "pb" },
    music: { name: "Music", w: 1040, h: 660, cls: "mu" },
    terminal: { name: "Terminal", w: 680, h: 420, cls: "term" },
    settings: { name: "System Settings", w: 820, h: 580 },
    weather: { name: "Weather", w: 880, h: 580, cls: "wx" },
    textedit: { name: "TextEdit", w: 560, h: 480, cls: "te" },
    about: { name: "About This Mac", w: 300, h: 430, cls: "about", fixed: true },
  };
  const DOCK = ["finder", "notes", "chatgpt", "x", "linkedin", "messages", "photos", "photobooth", "music", "terminal", "settings", "|", "trash"];
  const DOCK_NAMES = { trash: "Bin" };

  /* ================= window manager ================= */
  const wins = {};
  let z = 10, focused = null, opened = 0;

  function routeFor(id, sub) { return "#/" + id + (sub ? "/" + sub : ""); }
  function setRoute(w, sub) {
    w.sub = sub;
    if (focused === w.id) history.replaceState(null, "", routeFor(w.id, sub));
  }

  function openApp(id, arg) {
    const app = APPS[id];
    if (!app) return;
    let w = wins[id];
    if (!w) {
      w = createWindow(id, arg);
    } else {
      if (w.el.hidden) restoreWin(w);
      if (arg !== undefined && app.open) app.open(w, arg);
    }
    focusWin(id);
    updateDock();
    return w;
  }

  function createWindow(id, arg) {
    const app = APPS[id];
    const el = h(`<div class="window" data-app="${id}"><div class="win-body ${app.cls || ""}"></div>${app.fixed ? "" : '<div class="resize-e"></div><div class="resize-s"></div><div class="resize"></div>'}</div>`);
    const vw = innerWidth, vh = innerHeight;
    const W = Math.min(app.w, vw - 40), H = Math.min(app.h, vh - 26 - 96);
    const off = (opened++ % 6) * 26 - 50;
    el.style.width = W + "px";
    el.style.height = H + "px";
    el.style.left = Math.max(10, Math.round((vw - W) / 2 + off)) + "px";
    el.style.top = Math.max(32, Math.round(30 + (vh - 26 - 96 - H) / 3 + off * 0.6 + 30)) + "px";
    $("#windows").append(el);
    const w = { id, el, body: $(".win-body", el), sub: undefined, state: {} };
    wins[id] = w;
    bindWindow(w);
    app.render(w, arg);
    bounce(id);
    return w;
  }

  function focusWin(id) {
    const w = wins[id];
    if (!w) return;
    focused = id;
    w.el.style.zIndex = ++z;
    for (const o of Object.values(wins)) o.el.classList.toggle("inactive", o !== w);
    $("#mb-app").textContent = APPS[id].name;
    history.replaceState(null, "", routeFor(id, w.sub));
  }

  function topWin() {
    return Object.values(wins).filter((w) => !w.el.hidden).sort((a, b) => b.el.style.zIndex - a.el.style.zIndex)[0];
  }
  function afterLeave() {
    const t = topWin();
    if (t) focusWin(t.id);
    else { focused = null; $("#mb-app").textContent = "Finder"; history.replaceState(null, "", "#/"); }
    updateDock();
  }

  function closeWin(id) {
    const w = wins[id];
    if (!w) return;
    APPS[id].close?.(w);
    w.el.classList.add("closing");
    delete wins[id];
    setTimeout(() => w.el.remove(), 160);
    afterLeave();
  }

  function minimizeWin(id) {
    const w = wins[id];
    const dockEl = $(`.dock-item[data-id="${id}"]`);
    if (dockEl) {
      const r = w.el.getBoundingClientRect(), d = dockEl.getBoundingClientRect();
      w.el.style.transformOrigin = `${d.left + d.width / 2 - r.left}px ${d.top - r.top}px`;
    }
    w.el.classList.add("minimizing");
    setTimeout(() => { w.el.hidden = true; w.el.classList.remove("minimizing"); afterLeave(); }, 340);
  }
  function restoreWin(w) {
    w.el.hidden = false;
    w.el.style.animation = "none"; void w.el.offsetWidth; w.el.style.animation = "";
  }

  function maximizeWin(id) {
    const w = wins[id];
    if (APPS[id].fixed || isMobile()) return;
    const el = w.el;
    el.classList.add("animating");
    if (w.prev) {
      Object.assign(el.style, w.prev); w.prev = null; el.classList.remove("maximized");
    } else {
      w.prev = { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height };
      Object.assign(el.style, { left: "0px", top: "26px", width: innerWidth + "px", height: innerHeight - 26 - 86 + "px" });
      el.classList.add("maximized");
    }
    setTimeout(() => el.classList.remove("animating"), 300);
  }

  function bindWindow(w) {
    const el = w.el;
    el.addEventListener("pointerdown", (e) => {
      if (focused !== w.id) focusWin(w.id);
      const t = e.target;
      if (t.closest(".traffic")) return;
      const rs = t.closest(".resize, .resize-e, .resize-s");
      if (rs) return startResize(e, w, rs.className);
      const drag = t.closest("[data-drag]");
      if (!drag || isMobile() || t.closest("button, input, textarea, a, select, [contenteditable], [data-nodrag]")) return;
      startDrag(e, w);
    });
    el.addEventListener("click", (e) => {
      const t = e.target;
      if (t.closest(".t-close")) closeWin(w.id);
      else if (t.closest(".t-min")) minimizeWin(w.id);
      else if (t.closest(".t-max")) maximizeWin(w.id);
    });
    el.addEventListener("dblclick", (e) => {
      if (e.target.closest("[data-drag]") && !e.target.closest("button, input, a, .traffic")) maximizeWin(w.id);
    });
  }

  function startDrag(e, w) {
    const el = w.el, sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop;
    if (w.prev) { w.prev = null; el.classList.remove("maximized"); }
    const move = (ev) => {
      el.style.left = ox + ev.clientX - sx + "px";
      el.style.top = Math.max(26, Math.min(innerHeight - 40, oy + ev.clientY - sy)) + "px";
    };
    const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); document.body.style.cursor = ""; };
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    e.preventDefault();
  }
  function startResize(e, w, cls) {
    const el = w.el, sx = e.clientX, sy = e.clientY, ow = el.offsetWidth, oh = el.offsetHeight;
    const doW = !cls.includes("resize-s"), doH = !cls.includes("resize-e");
    const move = (ev) => {
      if (doW) el.style.width = Math.max(340, ow + ev.clientX - sx) + "px";
      if (doH) el.style.height = Math.max(240, oh + ev.clientY - sy) + "px";
    };
    const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); };
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    e.preventDefault();
  }

  /* ================= dock ================= */
  let badge = 26;
  function renderDock() {
    const dock = $("#dock");
    dock.innerHTML = DOCK.map((id) => id === "|" ? '<div class="dock-sep"></div>' :
      `<div class="dock-item" data-id="${id}" role="button" aria-label="${id}"><div class="img">${icon(id)}</div><div class="dot"></div><div class="tip">${DOCK_NAMES[id] || APPS[id].name}</div>${id === "messages" ? `<div class="badge">${badge}</div>` : ""}</div>`).join("");
    dock.addEventListener("click", (e) => {
      const it = e.target.closest(".dock-item");
      if (!it) return;
      const id = it.dataset.id;
      if (id === "trash") return openApp("finder", "bin");
      if (wins[id] && focused === id && !wins[id].el.hidden) return minimizeWin(id);
      openApp(id);
    });
    const items = $$(".dock-item", dock);
    dock.addEventListener("mousemove", (e) => {
      if (isMobile()) return;
      for (const it of items) {
        const r = it.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        const s = d < 150 ? (Math.cos((d / 150) * Math.PI) + 1) / 2 : 0;
        const size = 52 + 30 * s;
        it.style.width = it.style.height = size + "px";
      }
    });
    dock.addEventListener("mouseleave", () => items.forEach((it) => (it.style.width = it.style.height = "")));
  }
  function updateDock() {
    for (const it of $$(".dock-item")) it.classList.toggle("running", !!wins[it.dataset.id]);
    const b = $('.dock-item[data-id="messages"] .badge');
    if (b) { b.textContent = badge; b.hidden = !badge; }
  }
  function bounce(id) {
    const it = $(`.dock-item[data-id="${id}"]`);
    if (!it) return;
    it.classList.remove("bounce"); void it.offsetWidth; it.classList.add("bounce");
    setTimeout(() => it.classList.remove("bounce"), 1100);
  }

  /* ================= menubar & menus ================= */
  function renderMenubar() {
    $("#menubar").innerHTML = `
      <div class="side">
        <div class="mb-item mb-apple" data-menu="apple" aria-label="Apple menu">${ICONS.apple}</div>
        <div class="mb-item mb-app" id="mb-app" data-menu="app">Finder</div>
        <div class="side mb-menus">
          ${["File", "Edit", "View", "Window", "Help"].map((m) => `<div class="mb-item" data-menu="${m}">${m}</div>`).join("")}
        </div>
      </div>
      <div class="side" id="mb-right"></div>`;
    const bar = $("#menubar");
    bar.addEventListener("click", (e) => {
      if (e.target.closest("[data-weather]")) { closeMenus(); return openApp("weather"); }
      const it = e.target.closest("[data-menu]");
      if (!it) return;
      e.stopPropagation();
      if (it.classList.contains("open")) return closeMenus();
      showMenu(it);
    });
    bar.addEventListener("mouseover", (e) => {
      const it = e.target.closest("[data-menu]");
      if (it && $(".mb-item.open") && !it.classList.contains("open")) showMenu(it);
    });
    tickClock();
    setInterval(tickClock, 1000);
  }

  let battery = { level: 0.87, charging: false };
  const FIRST = S.first[0].toUpperCase() + S.first.slice(1);
  const BAR = {
    network: FIRST + " Home",
    networks: ["JioFiber_5G", "Airtel-Home", "Campus-WiFi", "Starbucks WiFi"],
    outputs: ["MacBook Air Speakers", FIRST + "’s AirPods Pro"],
    devices: [FIRST + "’s AirPods Pro", "Magic Keyboard", "Magic Mouse"],
  };
  const barState = { output: BAR.outputs[0], device: BAR.devices[0], network: BAR.network, others: false };
  const batteryIcon = (pct) => `<svg viewBox="0 0 30 14" class="mb-batt" aria-hidden="true"><rect x="1" y="2.2" width="23" height="9.6" rx="2.6" fill="none" stroke="currentColor" stroke-width="1" opacity=".45"/><rect x="2.5" y="3.7" width="${(18 * Math.max(0.06, Math.min(1, pct / 100))).toFixed(1)}" height="6.6" rx="1.4" fill="currentColor"/><path d="M26.4 5.2v3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>${battery.charging ? '<path d="M15.4 3.2l-3.4 4.3h2.3l-1 3.3 3.6-4.5h-2.4l.9-3.1z" fill="#fff" stroke="currentColor" stroke-width=".5" stroke-linejoin="round"/>' : ""}</svg>`;
  function renderMenubarRight() {
    const r = $("#mb-right");
    if (!r) return;
    const pct = Math.round(battery.level * 100);
    r.innerHTML = `
      <div class="mb-item mb-icon mb-hide-sm" data-weather role="button" aria-label="Weather">${UI.cloud}<span>${esc(S.weather)}</span></div>
      <div class="mb-item mb-icon mb-hide-sm" data-menu="sound" aria-label="Sound">${UI.vol}</div>
      <div class="mb-item mb-icon mb-hide-sm" data-menu="mirror" aria-label="Screen Mirroring">${UI.mirror}</div>
      <div class="mb-item mb-icon ${prefs.wifi ? "" : "off"}" data-menu="wifi" aria-label="Wi-Fi">${UI.wifi}</div>
      <div class="mb-item mb-icon mb-hide-sm ${prefs.bt ? "" : "off"}" data-menu="bt" aria-label="Bluetooth">${UI.bt}</div>
      <div class="mb-item mb-icon" data-menu="battery" aria-label="Battery"><span class="mb-hide-sm">${pct}%</span>${batteryIcon(pct)}</div>
      <div class="mb-item mb-icon" data-menu="cc" aria-label="Control Center">${UI.cc}</div>
      <div class="mb-item" id="mb-clock" data-menu="clock"></div>`;
    tickClock();
  }
  function tickClock() {
    const c = $("#mb-clock");
    if (!c) return;
    const d = new Date();
    const wd = d.toLocaleDateString("en-US", { weekday: "short" });
    const mo = d.toLocaleDateString("en-US", { month: "short" });
    c.textContent = `${wd} ${d.getDate()} ${mo} ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" })}`;
  }

  function closeMenus() {
    $$(".menu").forEach((m) => m.remove());
    $$(".mb-item.open").forEach((m) => m.classList.remove("open"));
  }
  function popup(x, y, items) {
    const m = h(`<div class="menu"></div>`);
    for (const it of items) {
      if (it === "-") { m.append(h('<div class="menu-sep"></div>')); continue; }
      const row = h(`<div class="menu-item ${it.disabled ? "disabled" : ""}"><span>${esc(it.label)}</span>${it.kbd ? `<span class="kbd">${esc(it.kbd)}</span>` : ""}</div>`);
      if (!it.disabled && it.action) row.addEventListener("click", (e) => { e.stopPropagation(); closeMenus(); it.action(); });
      m.append(row);
    }
    $("#overlays").append(m);
    m.style.left = Math.min(x, innerWidth - m.offsetWidth - 6) + "px";
    m.style.top = Math.min(y, innerHeight - m.offsetHeight - 6) + "px";
    return m;
  }
  function showMenu(anchor) {
    closeMenus();
    anchor.classList.add("open");
    const r = anchor.getBoundingClientRect();
    const key = anchor.dataset.menu;
    if (["sound", "mirror", "wifi", "bt", "battery", "cc", "clock"].includes(key)) return barPanel(anchor, key);
    const app = focused ? APPS[focused].name : "Finder";
    const winItems = Object.values(wins).map((w) => ({ label: (focused === w.id ? "✓ " : "   ") + APPS[w.id].name, action: () => openApp(w.id) }));
    const menus = {
      apple: [
        { label: "About This Mac", action: () => openApp("about") }, "-",
        { label: "System Settings…", action: () => openApp("settings") }, "-",
        { label: "Sleep", action: sleepScreen },
        { label: "Restart…", action: restart },
        { label: "Shut Down…", action: shutDown }, "-",
        { label: "Lock Screen", kbd: "⌃⌘Q", action: lockScreen },
        { label: `Log Out ${S.name}…`, kbd: "⇧⌘Q", action: lockScreen },
      ],
      app: [
        { label: `About ${app}`, action: () => openApp("about") }, "-",
        { label: "Settings…", kbd: "⌘,", action: () => openApp("settings") }, "-",
        { label: `Hide ${app}`, kbd: "⌘H", disabled: !focused, action: () => minimizeWin(focused) },
        { label: `Quit ${app}`, kbd: "⌘Q", disabled: !focused, action: () => closeWin(focused) },
      ],
      File: [
        { label: "New Note", kbd: "⌘N", action: () => { openApp("notes"); NotesApp.newNote(wins.notes); } },
        { label: "New Finder Window", action: () => openApp("finder", "recents") },
        { label: "Open read-me.txt", kbd: "⌘O", action: () => openApp("textedit") }, "-",
        { label: "Close Window", kbd: "⌘W", disabled: !focused, action: () => closeWin(focused) },
      ],
      Edit: [{ label: "Undo", kbd: "⌘Z", disabled: true }, { label: "Redo", kbd: "⇧⌘Z", disabled: true }, "-",
        { label: "Cut", kbd: "⌘X", disabled: true }, { label: "Copy", kbd: "⌘C", disabled: true }, { label: "Paste", kbd: "⌘V", disabled: true }, "-",
        { label: "Emoji & Symbols", kbd: "🌐E", disabled: true }],
      View: [
        { label: document.fullscreenElement ? "Exit Full Screen" : "Enter Full Screen", kbd: "⌃⌘F", action: toggleFullscreen },
        { label: prefs.theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode", action: () => { prefs.theme = prefs.theme === "dark" ? "light" : "dark"; savePrefs(); applyPrefs(); } },
        { label: "Show Spotlight", kbd: "⌘Space", action: openSpotlight },
      ],
      Window: [
        { label: "Minimize", kbd: "⌘M", disabled: !focused, action: () => minimizeWin(focused) },
        { label: "Zoom", disabled: !focused, action: () => maximizeWin(focused) }, "-",
        ...(winItems.length ? winItems : [{ label: "No Windows", disabled: true }]),
      ],
      Help: [
        { label: "read-me.txt", action: () => openApp("textedit") },
        { label: "Terminal: type 'help'", action: () => openApp("terminal") },
        { label: "Contact " + S.first, action: () => openApp("notes", "hit-me-up") },
      ],
    };
    popup(r.left, 28, menus[key] || []);
  }

  // the small panels that drop from the right side of the menu bar
  function barPanel(anchor, key) {
    const m = h(`<div class="menu mb-panel"></div>`);
    const row = (label, act, on) => `<div class="menu-item" data-act="${act}"><span>${esc(label)}</span>${on ? "<span>✓</span>" : ""}</div>`;
    const slider = (s, min, max, step, val, label) => `<input class="slider" type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-s="${s}" aria-label="${label}">`;
    const pct = Math.round(battery.level * 100);
    const draw = () => {
      m.innerHTML = {
        sound: () => `<div class="mb-head">Sound</div>
          <div class="mb-slide">${UI.vol}${slider("volume", 0, 100, 1, prefs.volume, "Volume")}</div><div class="menu-sep"></div>
          <div class="mb-sub">Output</div>${BAR.outputs.map((o, i) => row(o, "out:" + i, barState.output === o)).join("")}`,
        mirror: () => `<div class="mb-head">Screen Mirroring</div><div class="mb-muted">No devices found nearby.</div><div class="menu-sep"></div>${row("Display Settings…", "go:displays")}`,
        wifi: () => `<div class="mb-head">Wi-Fi</div>${row(BAR.network, "net:home", prefs.wifi && barState.network === BAR.network)}<div class="menu-sep"></div>
          <div class="menu-item" data-act="others"><span>Other Networks</span><span class="mb-dim">${barState.others ? "▴" : "▾"}</span></div>
          ${barState.others ? BAR.networks.map((n, i) => `<div class="menu-item indent" data-act="net:${i}"><span>${esc(n)}</span>${prefs.wifi && barState.network === n ? "<span>✓</span>" : ""}</div>`).join("") : ""}
          <div class="menu-sep"></div>${row("Wi-Fi Settings…", "go:wifi")}`,
        bt: () => `<div class="mb-head">Bluetooth</div>${BAR.devices.map((d, i) => row(d, "dev:" + i, prefs.bt && barState.device === d)).join("")}<div class="menu-sep"></div>${row("Bluetooth Settings…", "go:bluetooth")}`,
        battery: () => `<div class="mb-head">Battery ${pct}%</div><div class="mb-muted">Power Source: ${battery.charging ? "Power Adapter" : "Battery"}</div><div class="menu-sep"></div><div class="mb-muted">No Apps Using Significant Energy</div>`,
        cc: () => `<div class="mb-tiles">
            <button class="mb-tile ${prefs.wifi ? "on" : ""}" data-act="t:wifi">${UI.wifi}<span>Wi-Fi · ${prefs.wifi ? "on" : "off"}</span></button>
            <button class="mb-tile ${prefs.bt ? "on" : ""}" data-act="t:bt">${UI.bt}<span>Bluetooth · ${prefs.bt ? "on" : "off"}</span></button></div>
          <div class="mb-sliders"><div class="mb-sub">Display</div>${slider("brightness", 0.35, 1, 0.01, prefs.brightness, "Brightness")}
          <div class="mb-sub">Sound</div>${slider("volume", 0, 100, 1, prefs.volume, "Volume")}</div>`,
        clock: () => `<div class="mb-date">${new Date().toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div><div class="menu-sep"></div>
          ${row("Weather · open forecast", "go:weather")}${row(`Messages · ${badge} unread`, "go:messages")}`,
      }[key]();
    };
    draw();
    m.addEventListener("click", (e) => {
      e.stopPropagation();
      const a = e.target.closest("[data-act]")?.dataset.act;
      if (!a) return;
      const [k, v] = a.split(":");
      if (k === "go") { closeMenus(); return v === "weather" || v === "messages" ? openApp(v) : openApp("settings", v); }
      if (k === "out") barState.output = BAR.outputs[v];
      if (k === "dev") { barState.device = BAR.devices[v]; prefs.bt = true; }
      if (k === "net") { barState.network = v === "home" ? BAR.network : BAR.networks[v]; prefs.wifi = true; }
      if (k === "others") barState.others = !barState.others;
      if (k === "t") prefs[v] = !prefs[v];
      savePrefs(); applyPrefs(); draw();
      $(`#mb-right [data-menu="${key}"]`)?.classList.add("open");
    });
    m.addEventListener("input", (e) => {
      const s = e.target.dataset.s;
      if (!s) return;
      prefs[s] = Number(e.target.value);
      if (s === "brightness") document.documentElement.style.setProperty("--brightness", prefs.brightness);
      if (s === "volume") Music.setVolume(prefs.volume);
      savePrefs();
    });
    $("#overlays").append(m);
    const r = anchor.getBoundingClientRect();
    m.style.left = Math.max(6, Math.min(r.right - m.offsetWidth, innerWidth - m.offsetWidth - 6)) + "px";
    m.style.top = "28px";
  }


  document.addEventListener("click", (e) => { if (!e.target.closest(".menu")) closeMenus(); });
  document.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".window, #dock, #menubar")) return;
    e.preventDefault();
    closeMenus();
    popup(e.clientX, e.clientY, [
      { label: "New Note", action: () => { openApp("notes"); NotesApp.newNote(wins.notes); } },
      { label: "Open Terminal", action: () => openApp("terminal") }, "-",
      { label: "Get Info", action: () => openApp("about") },
      { label: "Change Wallpaper…", action: () => openApp("settings", "wallpaper") },
      { label: prefs.theme === "dark" ? "Use Light Mode" : "Use Dark Mode", action: () => { prefs.theme = prefs.theme === "dark" ? "light" : "dark"; savePrefs(); applyPrefs(); } },
    ]);
  });

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }

  /* ================= desktop icons ================= */
  function renderDesktop() {
    const d = $("#desktop-icons");
    d.innerHTML = `<div class="desk-icon" data-open="textedit" aria-label="read-me.txt"><div class="img">${icon("txt")}</div><span>read-me.txt</span></div>`;
    d.addEventListener("click", (e) => {
      const ic = e.target.closest(".desk-icon");
      $$(".desk-icon").forEach((x) => x.classList.toggle("selected", x === ic));
      if (ic && isMobile()) openApp(ic.dataset.open);
    });
    d.addEventListener("dblclick", (e) => { const ic = e.target.closest(".desk-icon"); if (ic) openApp(ic.dataset.open); });
    $("#wallpaper").addEventListener("click", () => $$(".desk-icon").forEach((x) => x.classList.remove("selected")));
  }

  /* ================= overlays: spotlight / power ================= */
  function openSpotlight() {
    if ($(".spotlight")) return $(".spotlight input").focus();
    closeMenus();
    const sp = h(`<div class="spotlight"><div class="in">${UI.search}<input placeholder="Spotlight Search" spellcheck="false"></div><div class="res" hidden></div></div>`);
    $("#overlays").append(sp);
    const input = $("input", sp), res = $(".res", sp);
    let items = [], sel = 0;
    const entries = () => [
      ...Object.entries(APPS).filter(([id]) => !["about"].includes(id)).map(([id, a]) => ({ label: a.name, kind: "Application", ico: icon(id), go: () => openApp(id) })),
      ...NotesApp.all().map((n) => ({ label: n.title, kind: "Note", ico: n.emoji, text: plain(n.body), go: () => openApp("notes", n.id) })),
      ...WALLPAPERS.map((w) => ({ label: "Wallpaper: " + w.name, kind: "Settings", ico: "🖼️", go: () => { prefs.wallpaper = w.id; savePrefs(); applyPrefs(); } })),
      { label: "Toggle Dark Mode", kind: "Settings", ico: "🌗", go: () => { prefs.theme = prefs.theme === "dark" ? "light" : "dark"; savePrefs(); applyPrefs(); } },
    ];
    const draw = () => {
      const q = input.value.trim().toLowerCase();
      items = q ? entries().filter((e) => e.label.toLowerCase().includes(q) || (e.text || "").toLowerCase().includes(q)).slice(0, 9) : [];
      sel = Math.min(sel, Math.max(0, items.length - 1));
      res.hidden = !q;
      res.innerHTML = items.length ? items.map((it, i) => `<div class="r ${i === sel ? "active" : ""}" data-i="${i}"><div class="img">${it.ico}</div>${esc(it.label)}<small>${it.kind}</small></div>`).join("")
        : `<div class="r" style="color:var(--text-2)">No results</div>`;
    };
    const close = () => sp.remove();
    const go = (i) => { const it = items[i]; if (it) { close(); it.go(); } };
    input.addEventListener("input", () => { sel = 0; draw(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { sel = Math.min(items.length - 1, sel + 1); draw(); e.preventDefault(); }
      else if (e.key === "ArrowUp") { sel = Math.max(0, sel - 1); draw(); e.preventDefault(); }
      else if (e.key === "Enter") go(sel);
      else if (e.key === "Escape") close();
    });
    res.addEventListener("click", (e) => { const r = e.target.closest("[data-i]"); if (r) go(+r.dataset.i); });
    setTimeout(() => document.addEventListener("pointerdown", function off(e) { if (!sp.contains(e.target)) { close(); document.removeEventListener("pointerdown", off); } }), 0);
    input.focus();
  }
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.code === "Space" || e.key === "k")) { e.preventDefault(); openSpotlight(); }
    if (e.key === "Escape") closeMenus();
  });

  function fullscreen(cls, html) {
    const o = h(`<div class="fullscreen ${cls}">${html}</div>`);
    $("#overlays").append(o);
    return o;
  }
  function boot(then) {
    const o = fullscreen("boot", `${ICONS.apple}<div class="bar"><i></i></div>`);
    requestAnimationFrame(() => requestAnimationFrame(() => ($(".bar i", o).style.width = "100%")));
    setTimeout(() => { o.style.transition = "opacity .5s"; o.style.opacity = 0; setTimeout(() => o.remove(), 500); then?.(); }, 2500);
  }
  function restart() { Object.keys(wins).forEach(closeWin); boot(() => openApp("notes", "about-me")); }
  function shutDown() {
    Object.keys(wins).forEach(closeWin);
    const o = fullscreen("off", "click anywhere to turn on");
    o.addEventListener("click", () => { o.remove(); boot(() => openApp("notes", "about-me")); });
  }
  function sleepScreen() {
    const o = fullscreen("sleep", "");
    const wake = () => { o.remove(); lockScreen(); };
    setTimeout(() => { o.addEventListener("click", wake); addEventListener("keydown", wake, { once: true }); }, 400);
  }
  function lockScreen() {
    const wp = WALLPAPERS.find((w) => w.id === prefs.wallpaper) || WALLPAPERS[0];
    const o = fullscreen("lock", `<div class="time"><span></span><b></b></div><div class="who">${avatar(64)}<b>${esc(S.name)}</b><input type="password" placeholder="Enter Password" aria-label="Password"><small>any password works — press return</small></div>`);
    o.style.background = wp.css;
    const tick = () => { const d = new Date(); $(".time b", o).textContent = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/, ""); $(".time span", o).textContent = d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" }); };
    tick(); const iv = setInterval(tick, 1000);
    const inp = $("input", o);
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { clearInterval(iv); o.style.transition = "opacity .4s"; o.style.opacity = 0; setTimeout(() => o.remove(), 400); } });
    setTimeout(() => inp.focus(), 50);
  }

  /* =====================================================================
     APPS
     ===================================================================== */

  /* ---------------- Notes ---------------- */
  const SECTIONS = ["Pinned", "Today", "Previous 7 Days", "Previous 30 Days", "Older"];
  const NotesApp = APPS.notes;
  let userNotes = store.get("notes", []);
  NotesApp.all = () => [...userNotes, ...NOTES];
  NotesApp.render = (w, arg) => {
    w.body.innerHTML = `
      <aside class="notes-side">
        <div class="top" data-drag>${TRAFFIC}<button class="icon-btn" data-act="new" aria-label="New note" title="New note">${UI.compose}</button></div>
        <label class="search">${UI.search}<input placeholder="Search" aria-label="Search notes"></label>
        <div class="notes-list scroll"></div>
      </aside>
      <section class="notes-main">
        <div class="bar" data-drag><button class="icon-btn" data-act="del" aria-label="Delete note" title="Delete note" hidden>${UI.trash}</button></div>
        <article class="note-view scroll selectable"></article>
      </section>`;
    w.state.q = "";
    $(".search input", w.body).addEventListener("input", (e) => { w.state.q = e.target.value.toLowerCase(); NotesApp.list(w); });
    w.body.addEventListener("click", (e) => {
      const row = e.target.closest(".note-row");
      if (row) return NotesApp.open(w, row.dataset.id);
      const link = e.target.closest("a[data-note]");
      if (link) { e.preventDefault(); return NotesApp.open(w, link.dataset.note); }
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "new") NotesApp.newNote(w);
      if (act === "del") NotesApp.del(w);
    });
    NotesApp.open(w, arg || "about-me");
  };
  NotesApp.list = (w) => {
    const q = w.state.q;
    const notes = NotesApp.all().filter((n) => !q || (n.title + " " + n.body).toLowerCase().includes(q));
    const list = $(".notes-list", w.body);
    list.innerHTML = SECTIONS.map((sec) => {
      const ns = notes.filter((n) => (n.section || "Older") === sec);
      if (!ns.length) return "";
      return `<div class="notes-group">${sec}</div>` + ns.map((n) => `
        <div class="note-row ${n.id === w.state.cur ? "active" : ""}" data-id="${n.id}" role="button">
          <div class="t">${n.emoji ? n.emoji + " " : ""}${esc(n.title || "New Note")}</div>
          <div class="p"><b>${shortDate(n.date)}</b>${esc(plain(n.body).slice(0, 90)) || "No additional text"}</div>
        </div>`).join("");
    }).join("") || `<div class="empty">No Results</div>`;
  };
  NotesApp.open = (w, id) => {
    const n = NotesApp.all().find((x) => x.id === id) || NotesApp.all().find((x) => x.id === "about-me") || NotesApp.all()[0];
    w.state.cur = n.id;
    NotesApp.list(w);
    const view = $(".note-view", w.body);
    $('[data-act="del"]', w.body).hidden = !n.user;
    if (n.user) {
      view.innerHTML = `<div class="note-date">${longDate(n.date)}</div>
        <h1 class="note-title" contenteditable="plaintext-only" spellcheck="false" data-ph="Title">${esc(n.title)}</h1>
        <div class="note-body"><textarea placeholder="Start typing…" spellcheck="false">${esc(n.body)}</textarea></div>`;
      const save = () => { n.title = $(".note-title", view).textContent.trim(); n.body = $("textarea", view).value; n.date = new Date().toISOString(); store.set("notes", userNotes); NotesApp.list(w); };
      $(".note-title", view).addEventListener("input", save);
      $("textarea", view).addEventListener("input", save);
    } else {
      view.innerHTML = `<div class="note-date">${longDate(n.date)}</div>
        <h1 class="note-title"><span>${n.emoji}</span>${esc(n.title)}</h1>
        ${n.image ? `<img class="note-img" src="${esc(n.image)}" alt="${esc(n.imageCaption || "")}" onerror="this.remove()">` : ""}
        <div class="note-body">${md(n.body)}</div>`;
    }
    view.scrollTop = 0;
    setRoute(w, n.id);
  };
  NotesApp.newNote = (w) => {
    const n = { id: "u" + Date.now().toString(36), user: true, emoji: "", title: "New Note", section: "Today", date: new Date().toISOString(), body: "" };
    userNotes.unshift(n);
    store.set("notes", userNotes);
    NotesApp.open(w, n.id);
    const t = $(".note-title", w.body);
    t.focus();
    document.getSelection().selectAllChildren(t);
  };
  NotesApp.del = (w) => {
    userNotes = userNotes.filter((n) => n.id !== w.state.cur);
    store.set("notes", userNotes);
    NotesApp.open(w, "about-me");
  };

  /* ---------------- Messages ---------------- */
  const chats = CHATS.map((c) => ({ ...c, messages: [...c.messages], ri: 0 }));
  APPS.messages.render = (w, arg) => {
    w.body.innerHTML = `
      <aside class="msg-side">
        <div class="top" data-drag>${TRAFFIC}<button class="icon-btn" data-act="compose" aria-label="New message">${UI.compose}</button></div>
        <label class="search">${UI.search}<input placeholder="Search" aria-label="Search conversations"></label>
        <div class="scroll" style="flex:1">
          <div class="pins"></div>
          <div class="convos"></div>
        </div>
      </aside>
      <section class="msg-main">
        <div class="msg-head" data-drag></div>
        <div class="thread scroll selectable"></div>
        <form class="composer"><div class="field"><input placeholder="Type a message..." aria-label="Message"></div><button class="icon-btn" type="button" aria-label="Emoji">${UI.smile}</button></form>
      </section>`;
    w.state.q = "";
    $(".search input", w.body).addEventListener("input", (e) => { w.state.q = e.target.value.toLowerCase(); msgList(w); });
    w.body.addEventListener("click", (e) => {
      const c = e.target.closest("[data-chat]");
      if (c) return msgOpen(w, c.dataset.chat);
      if (e.target.closest('[data-act="compose"]')) $(".composer input", w.body).focus();
      if (e.target.closest('[aria-label="Emoji"]')) { const i = $(".composer input", w.body); i.value += "🙂"; i.focus(); }
    });
    $(".composer", w.body).addEventListener("submit", (e) => { e.preventDefault(); msgSend(w); });
    badge = 0; updateDock();
    msgOpen(w, arg || chats[0].id);
  };
  APPS.messages.open = (w, arg) => msgOpen(w, arg);
  function msgList(w) {
    const q = w.state.q;
    const match = (c) => !q || c.name.toLowerCase().includes(q) || c.messages.some((m) => m.text.toLowerCase().includes(q));
    const last = (c) => c.messages[c.messages.length - 1]?.text || "";
    $(".pins", w.body).innerHTML = chats.filter((c) => c.pinned && match(c)).map((c) => `
      <div class="pin ${c.id === w.state.cur ? "active" : ""}" data-chat="${c.id}" role="button">
        ${c.typing && c.unread ? `<div class="bubble">${esc(c.typing)}</div>` : ""}
        ${avatar(54, { src: c.avatar || "", name: c.name, g: c.color })}
        <div class="nm">${c.unread ? '<span class="unread-dot"></span>' : ""}${esc(c.name)}</div>
      </div>`).join("");
    $(".convos", w.body).innerHTML = chats.filter((c) => !c.pinned && match(c)).map((c) => `
      <div class="convo ${c.id === w.state.cur ? "active" : ""}" data-chat="${c.id}" role="button">
        <div class="ud">${c.unread ? '<span class="unread-dot" style="display:block"></span>' : ""}</div>
        ${avatar(40, { src: c.avatar || "", name: c.name, g: c.color })}
        <div class="info"><div class="row1"><span>${esc(c.name)}</span><span class="tm">${esc(c.time)}</span></div><div class="p">${esc(last(c))}</div></div>
      </div>`).join("");
  }
  function msgOpen(w, id) {
    const c = chats.find((x) => x.id === id) || chats[0];
    w.state.cur = c.id;
    c.unread = false;
    msgList(w);
    $(".msg-head", w.body).innerHTML = `To: <b>${esc(c.name)}</b>`;
    msgThread(w);
    setRoute(w, undefined);
  }
  function msgThread(w, typing) {
    const c = chats.find((x) => x.id === w.state.cur);
    const t = $(".thread", w.body);
    t.innerHTML = c.messages.map((m) => `<div class="b ${m.from}">${esc(m.text)}</div>`).join("") +
      (c.messages.at(-1)?.from === "me" && !typing ? '<div class="delivered">Delivered</div>' : "") +
      (typing ? '<div class="b them typing"><i></i><i></i><i></i></div>' : "");
    t.scrollTop = t.scrollHeight;
  }
  async function msgSend(w) {
    const input = $(".composer input", w.body);
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    const c = chats.find((x) => x.id === w.state.cur);
    c.messages.push({ from: "me", text });
    c.time = fmtTime(new Date());
    msgThread(w); msgList(w);
    await sleep(700);
    if (w.state.cur === c.id && wins.messages) msgThread(w, true);
    await sleep(1200 + Math.random() * 800);
    c.messages.push({ from: "them", text: c.replies[c.ri++ % c.replies.length] });
    if (!wins.messages) return;
    if (w.state.cur === c.id) msgThread(w); else c.unread = true;
    msgList(w);
  }

  /* ---------------- ChatGPT ---------------- */
  const gpt = { chats: [], cur: null };
  APPS.chatgpt.render = (w) => {
    w.body.innerHTML = `
      <aside class="gpt-side">
        <div class="top" data-drag>${TRAFFIC}<button class="icon-btn" data-act="collapse" aria-label="Collapse sidebar">${UI.sidebar}</button></div>
        <div class="gpt-nav" data-act="new" role="button">${UI.compose}New chat</div>
        <div class="gpt-nav" data-act="search" role="button">${UI.search}Search chats</div>
        <div class="gpt-nav" role="button">${UI.image}Images</div>
        <div class="gpt-nav" role="button">${UI.appsI}Apps</div>
        <div class="gpt-nav" role="button">${UI.research}Deep research</div>
        <div class="gpt-section">Chats</div>
        <div class="gpt-chats scroll"></div>
        <div class="gpt-nav" role="button">${UI.sparkle}See plans and pricing</div>
        <div class="gpt-nav" role="button" data-act="settings">${UI.gear}Settings</div>
        <div class="gpt-nav" role="button" data-act="help">${UI.help}Help</div>
        <div class="gpt-user">${avatar(30)}<div>${esc(S.name)}<small>Free</small></div></div>
      </aside>
      <section class="gpt-main">
        <div class="gpt-head" data-drag><div style="display:flex;align-items:center;gap:6px"><button class="icon-btn" data-act="expand" aria-label="Open sidebar" hidden>${UI.sidebar}</button><div class="gpt-model">ChatGPT <span>Auto</span> ${UI.down.replace("<svg", '<svg width="14" height="14"')}</div></div>${avatar(30)}</div>
        <div class="gpt-stage" style="flex:1;display:flex;flex-direction:column;min-height:0"></div>
      </section>`;
    w.body.addEventListener("click", (e) => {
      const a = e.target.closest("[data-act]")?.dataset.act;
      const side = $(".gpt-side", w.body);
      if (a === "new") { gpt.cur = null; gpt.last = null; gptDraw(w); }
      if (a === "collapse") { side.classList.add("collapsed"); $('[data-act="expand"]', w.body).hidden = false; }
      if (a === "expand") { side.classList.remove("collapsed"); $('[data-act="expand"]', w.body).hidden = true; }
      if (a === "settings") openApp("settings");
      if (a === "help") openApp("textedit");
      if (a === "search") $(".gpt-input input", w.body)?.focus();
      const chip = e.target.closest(".chip");
      if (chip) gptAsk(w, chip.textContent);
      const ch = e.target.closest("[data-gchat]");
      if (ch) { gpt.cur = +ch.dataset.gchat; gptDraw(w); }
    });
    gptDraw(w);
  };
  const gptInput = () => `<form class="gpt-input"><button type="button" class="icon-btn" aria-label="Attach">${UI.plus}</button><input placeholder="Ask anything" aria-label="Ask anything"><button type="button" class="icon-btn" aria-label="Dictate">${UI.mic}</button><button class="gpt-send" aria-label="Send">${UI.up}</button></form>`;
  function gptDraw(w) {
    $(".gpt-chats", w.body).innerHTML = gpt.chats.length
      ? gpt.chats.map((c, i) => `<div class="gpt-nav ${i === gpt.cur ? "active" : ""}" data-gchat="${i}" role="button" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block">${esc(c.title)}</div>`).join("")
      : `<div style="padding:4px 10px;color:#8f8f8f;font-size:13px">No chats yet</div>`;
    const stage = $(".gpt-stage", w.body);
    const chat = gpt.chats[gpt.cur];
    if (!chat) {
      stage.innerHTML = `<div class="gpt-center"><h1>Where should we begin?</h1>${gptInput()}<div class="chips">${ASK.suggestions.map((s) => `<button class="chip">${esc(s)}</button>`).join("")}</div></div>
        <div class="gpt-bottom"><small>${esc(ASK.intro)}</small></div>`;
    } else {
      stage.innerHTML = `<div class="gpt-thread scroll selectable"><div class="inner">${chat.msgs.map((m) => m.q ? `<div class="gpt-q">${esc(m.q)}</div>` : `<div class="gpt-a">${gptLinks(m.a)}</div>`).join("")}</div></div>
        <div class="gpt-bottom">${gptInput()}<small>chatgpt can make mistakes. this one only knows about ${esc(S.first)}.</small></div>`;
      const th = $(".gpt-thread", stage); th.scrollTop = th.scrollHeight;
    }
    const form = $(".gpt-input", stage);
    form.addEventListener("submit", (e) => { e.preventDefault(); const v = $("input", form).value.trim(); if (v) gptAsk(w, v); });
    $("input", form).focus({ preventScroll: true });
  }
  const gptLinks = (t) => esc(t).replace(/https?:\/\/[^\s<]+[^\s<.,!?)]/g, (u) => `<a href="${u}" target="_blank" rel="noopener">${u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a>`);
  // scores every q&a against the question: shared words with its phrasings (dice) + strong keywords
  const GPT_STOP = new Set("a an the is are am was were be been do does did to of in on at for with about and or but so if it its this that these those what whats which how why when where i me my mine you your yours u ur she her hers ayushi ranjan can could would should will shall have has had please tell give any some much many very really just like know want there here they them their we us our than then from by as into also too ever".split(" "));
  const GPT_SYN = { r: "are", fav: "favourite", fave: "favourite", favorite: "favourite", favourites: "favourite", hobbies: "hobby", colour: "color", twitter: "x", mail: "email", gmail: "email", jobs: "job", hackathon: "hackathon", hackthon: "hackathon", hackathons: "hackathon", cgpa: "cgpa", pointer: "cgpa", gpa: "cgpa", sgpa: "cgpa" };
  const gptNorm = (w) => { w = GPT_SYN[w] || w; if (w.length > 4 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1); return GPT_SYN[w] || w; };
  const gptTokens = (s) => s.toLowerCase().replace(/[’']/g, "'").replace(/'s\b|'re\b|'ve\b|'d\b|'ll\b|'m\b/g, "").replace(/n't\b/g, "").split(/[^a-z0-9+]+/).filter(Boolean).map(gptNorm).filter((w) => !GPT_STOP.has(w));
  const gptIndex = () => gpt.index ||= ASK.qa.map((e) => ({ e, phrases: [e.q, ...e.alts].map((p) => ({ raw: " " + gptTokens(p).join(" ") + " ", set: new Set(gptTokens(p)) })), keys: new Set(e.keys.map((k) => gptNorm(k.toLowerCase()))) }));
  // follow-ups like "tell me more" use the previous answer's `more`, if it has one
  const GPT_FOLLOW = new Set(["more", "elaborate", "continue", "deeper", "detail", "go", "on", "explain", "it", "that", "else", "anything", "please", "pls", "plz", "ok", "okay", "yes", "yeah", "sure"]);
  function gptAnswer(q) {
    const e = gptPick(q);
    gpt.last = e && typeof e === "object" ? e : gpt.last;
    return typeof e === "string" ? e : e.a;
  }
  function gptPick(q) {
    const T = gptTokens(q), joined = " " + T.join(" ") + " ";
    const follow = T.length && T.every((t) => GPT_FOLLOW.has(t)) && T.some((t) => ["more", "elaborate", "continue", "deeper", "detail", "explain", "else"].includes(t));
    if (follow) return gpt.last?.more ? { a: gpt.last.more } : ASK.qa.find((e) => e.q === "tell me more");
    const raw = q.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z' ]/g, "").replace(/\s+/g, " ").trim();
    const exact = ASK.qa.find((e) => [e.q, ...e.alts].some((p) => p.replace(/[^a-z' ]/g, "").trim() === raw));
    if (exact) return exact;
    if (!T.length) return ASK.qa.find((e) => e.q === "what can i ask you?");
    let best = null, top = 0;
    for (const x of gptIndex()) {
      if (x.e.small && T.length > 4) continue;
      let ph = 0;
      for (const p of x.phrases) {
        const hit = T.filter((t) => p.set.has(t)).length;
        let d = p.set.size ? (2 * hit) / (T.length + p.set.size) : 0;
        if (p.set.size > 1 && joined.includes(p.raw)) d += 0.75;
        ph = Math.max(ph, d);
      }
      const score = ph * 2 + T.filter((t) => x.keys.has(t)).length * 0.6;
      if (score > top) { top = score; best = x; }
    }
    const unknown = T.filter((t) => ASK.unknown.keys.includes(t));
    if (unknown.length && !(best && unknown.some((t) => best.keys.has(t) || best.phrases.some((p) => p.set.has(t))))) return ASK.unknown.a;
    return best && top >= 0.9 ? best.e : ASK.fallback;
  }
  async function gptAsk(w, q) {
    if (gpt.busy) return;
    gpt.busy = true;
    if (gpt.cur == null) { gpt.chats.unshift({ title: q, msgs: [] }); gpt.cur = 0; }
    const chat = gpt.chats[gpt.cur];
    chat.msgs.push({ q });
    gptDraw(w);
    const inner = $(".gpt-thread .inner", w.body);
    const a = h('<div class="gpt-a"><span class="cursor"></span></div>');
    inner.append(a);
    await sleep(600);
    const full = gptAnswer(q).toLowerCase(), words = full.split(/(\s+)/);
    let out = "";
    for (const wd of words) {
      if (!wins.chatgpt) break;
      out += wd;
      a.innerHTML = gptLinks(out) + '<span class="cursor"></span>';
      const th = $(".gpt-thread", w.body); if (th) th.scrollTop = th.scrollHeight;
      await sleep(18 + Math.random() * 30);
    }
    chat.msgs.push({ a: full });
    gpt.busy = false;
    if (wins.chatgpt) gptDraw(w);
  }

  /* ---------------- X ---------------- */
  const likes = store.get("likes", {});
  APPS.x.render = (w) => {
    const P = XPROFILE;
    w.body.innerHTML = `
      <div class="x-head" data-drag>${TRAFFIC}<div><div class="nm">${esc(S.first[0].toUpperCase() + S.first.slice(1))} <span class="verified">${UI.verified}</span></div><small>${P.posts.length + 402} posts</small></div></div>
      <div class="x-scroll scroll"><div class="x-inner">
        <div class="x-banner" style="${S.banner ? `background-image:url('${esc(S.banner)}')` : ""}"></div>
        <div class="x-prof">
          ${avatar(134).replace('class="avatar"', 'class="avatar x-av"')}
          <div class="x-actions"><a class="x-btn" href="${esc(S.socials.x.url)}" target="_blank" rel="noopener">Open on X ${UI.ext.replace("<svg", '<svg width="14" height="14"')}</a><button class="x-btn solid" data-act="follow">Follow</button></div>
          <div class="x-name">${esc(S.first[0].toUpperCase() + S.first.slice(1))} <span class="verified">${UI.verified}</span></div>
          <div class="x-handle">@${esc(S.socials.x.handle)}</div>
          <div class="x-bio selectable">${esc(P.bio)}</div>
          <div class="x-meta"><span style="display:flex;gap:4px;align-items:center">${UI.link.replace("<svg", '<svg width="16" height="16"')}<a href="https://${esc(S.domain)}" target="_blank" rel="noopener">${esc(S.domain)}</a></span><span style="display:flex;gap:4px;align-items:center">${UI.cal.replace("<svg", '<svg width="16" height="16"')}${esc(P.joined)}</span></div>
          <div class="x-follow"><span><b>${P.following}</b> Following</span><span><b data-followers>${P.followers}</b> Followers</span></div>
        </div>
        <div class="x-tabs"><div class="x-tab active" data-tab="posts" role="button">Posts</div><div class="x-tab" data-tab="replies" role="button">Replies</div><div class="x-tab" data-tab="media" role="button">Media</div></div>
        <div class="x-feed"></div>
      </div></div>`;
    const feed = $(".x-feed", w.body);
    const drawFeed = (tab) => {
      if (tab === "posts") {
        feed.innerHTML = P.posts.map((p, i) => {
          const liked = likes[i];
          return `<div class="post">
            ${avatar(40)}
            <div style="flex:1;min-width:0">
              ${p.pinned ? `<div class="pinned">📌 Pinned</div>` : ""}
              <div class="hd"><b>${esc(S.first[0].toUpperCase() + S.first.slice(1))}</b><span class="verified">${UI.verified}</span><span>@${esc(S.socials.x.handle)} · ${esc(p.date)}</span></div>
              <div class="tx selectable">${esc(p.text)}</div>
              <div class="acts">
                <button aria-label="Reply">${UI.reply}${p.replies}</button>
                <button aria-label="Repost">${UI.repost}${p.reposts}</button>
                <button aria-label="Like" data-like="${i}" class="${liked ? "liked" : ""}">${liked ? UI.heartF : UI.heart}${p.likes + (liked ? 1 : 0)}</button>
                <button aria-label="View post analytics on X">${UI.chart}${esc(p.views)}</button>
              </div>
            </div></div>`;
        }).join("");
      } else if (tab === "replies") {
        feed.innerHTML = `<div class="empty" style="padding:50px 20px;color:#71767b">@${esc(S.socials.x.handle)} hasn't replied to anything worth showing yet.</div>`;
      } else {
        feed.innerHTML = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">${PHOTOS.map((p) => `<div style="aspect-ratio:1;background:${p.src ? `url('${esc(p.src)}') center/cover,` : ""}linear-gradient(135deg,${p.g[0]},${p.g[1]})"></div>`).join("")}</div>`;
      }
    };
    drawFeed("posts");
    w.body.addEventListener("click", (e) => {
      const tab = e.target.closest("[data-tab]");
      if (tab) { $$(".x-tab", w.body).forEach((t) => t.classList.toggle("active", t === tab)); drawFeed(tab.dataset.tab); }
      const like = e.target.closest("[data-like]");
      if (like) { const i = like.dataset.like; likes[i] = !likes[i]; store.set("likes", likes); drawFeed("posts"); }
      const f = e.target.closest('[data-act="follow"]');
      if (f) {
        const on = f.classList.toggle("following");
        f.classList.toggle("solid", !on);
        f.textContent = on ? "Following" : "Follow";
        $("[data-followers]", w.body).textContent = P.followers + (on ? 1 : 0);
      }
    });
  };

  /* ---------------- LinkedIn ---------------- */
  APPS.linkedin.render = (w) => {
    const L = LINKEDIN;
    w.body.innerHTML = `
      <div class="li-head" data-drag><div style="display:flex;align-items:center">${TRAFFIC}<div class="li-logo"><i><svg viewBox="0 0 24 24" width="15" height="15" fill="#fff"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452z"/></svg></i>LinkedIn</div></div><a href="${esc(S.socials.linkedin.url)}" target="_blank" rel="noopener">View profile ↗</a></div>
      <div class="li-scroll scroll selectable"><div class="li-inner">
        <div class="li-card">
          <div class="li-banner" style="${S.banner ? `background-image:url('${esc(S.banner)}')` : ""}"></div>
          <div class="li-top">
            ${avatar(150).replace('class="avatar"', 'class="avatar li-av"')}
            <div class="li-orgs"><div><i>🏢</i>${esc(L.current.company)}</div><div><i>🎓</i>${esc(L.current.school)}</div></div>
            <div class="li-name">${esc(S.name)} <small>She/Her</small></div>
            <div class="li-headline">${esc(L.headline)}</div>
            <div class="li-loc">${esc(S.location)} · <a href="mailto:${esc(S.email)}">Contact info</a></div>
            <div class="li-loc" style="margin-top:6px"><span class="li-link">${esc(L.connections)}</span> · <span class="li-link">${esc(L.followers)}</span></div>
            <div class="li-btns">
              <a class="li-btn solid" href="${esc(S.socials.linkedin.url)}" target="_blank" rel="noopener">Open on LinkedIn</a>
              <a class="li-btn" href="mailto:${esc(S.email)}">Message</a>
              <button class="li-btn grey" data-act="more">More</button>
            </div>
          </div>
        </div>
        <div class="li-card li-sec"><h3>About</h3><p>${esc(L.about)}</p></div>
        <div class="li-card li-sec"><h3>Experience</h3>${L.experience.map((x) => `<div class="li-exp"><i>💼</i><div><b>${esc(x.role)}</b><div>${esc(x.company)}<br>${esc(x.dates)}<br>${esc(x.place)}</div><div style="color:inherit;margin-top:6px">${esc(x.desc)}</div></div></div>`).join("")}</div>
        <div class="li-card li-sec"><h3>Education</h3>${L.education.map((x) => `<div class="li-exp"><i>🎓</i><div><b>${esc(x.school)}</b><div>${esc(x.degree)}<br>${esc(x.dates)}</div></div></div>`).join("")}</div>
        <div class="li-card li-sec"><h3>Skills</h3><div class="li-skills">${L.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>
      </div></div>`;
    $('[data-act="more"]', w.body).addEventListener("click", (e) => {
      e.stopPropagation();
      const r = e.target.getBoundingClientRect();
      popup(r.left, r.bottom + 4, [
        { label: "Read the notes version", action: () => openApp("notes", "experience") },
        { label: "Send a message", action: () => openApp("notes", "hit-me-up") },
        { label: "Copy profile link", action: () => navigator.clipboard?.writeText(S.socials.linkedin.url) },
      ]);
    });
  };

  /* ---------------- Photos ---------------- */
  const favs = store.get("favs", {});
  const photoBg = (p) => `${p.src ? `url('${esc(p.src)}') center/cover no-repeat, ` : ""}linear-gradient(135deg, ${p.g[0]}, ${p.g[1]})`;
  APPS.photos.render = (w) => {
    const years = [...new Set(PHOTOS.map((p) => p.date.slice(0, 4)))];
    w.body.innerHTML = `
      <aside class="ph-side" data-drag>${TRAFFIC}
        <div class="side-label">Photos</div>
        <div class="side-item active" data-view="library" role="button"><span class="ico">🖼️</span>Library</div>
        <div class="side-item" data-view="favorites" role="button"><span class="ico">♥︎</span>Favourites</div>
        <div class="side-label">Albums</div>
        ${years.map((y) => `<div class="side-item" data-view="${y}" role="button"><span class="ico">📁</span>${y}</div>`).join("")}
      </aside>
      <section class="ph-main"><div class="ph-head" data-drag></div><div class="ph-grid scroll"></div></section>`;
    w.state.view = "library";
    const draw = () => {
      const v = w.state.view;
      w.state.list = PHOTOS.map((p, i) => ({ ...p, i })).filter((p) => v === "library" || (v === "favorites" ? favs[p.i] : p.date.startsWith(v)));
      $(".ph-head", w.body).innerHTML = `<b>${v === "library" ? "Library" : v === "favorites" ? "Favourites" : v}</b><small>${w.state.list.length} photos</small>`;
      $(".ph-grid", w.body).innerHTML = w.state.list.map((p, k) => `<div class="ph-cell" data-k="${k}" style="background:${photoBg(p)}" role="button" aria-label="${esc(p.caption)}">${favs[p.i] ? '<span class="fav">♥︎</span>' : ""}</div>`).join("")
        || `<div class="empty" style="grid-column:1/-1;padding:60px">No photos here yet.</div>`;
    };
    w.state.draw = draw;
    draw();
    w.body.addEventListener("click", (e) => {
      const it = e.target.closest("[data-view]");
      if (it) { w.state.view = it.dataset.view; $$("[data-view]", w.body).forEach((x) => x.classList.toggle("active", x === it)); draw(); }
      const cell = e.target.closest(".ph-cell");
      if (cell) photoLightbox(w, +cell.dataset.k);
    });
  };
  function photoLightbox(w, k) {
    $(".lightbox", w.body)?.remove();
    const list = w.state.list;
    const p = list[k];
    if (!p) return;
    const lb = h(`<div class="lightbox">
      <div class="lb-head" data-drag><button class="icon-btn" data-lb="close" aria-label="Back">${UI.back}</button>
        <div class="title"><b>${esc(p.caption)}</b><small>${new Date(p.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} · ${k + 1} of ${list.length}</small></div>
        <button class="icon-btn" data-lb="prev" aria-label="Previous">${UI.back}</button><button class="icon-btn" data-lb="next" aria-label="Next">${UI.fwd}</button>
        <button class="icon-btn" data-lb="fav" aria-label="Favourite" style="${favs[p.i] ? "color:#ff375f" : ""}">${favs[p.i] ? UI.heartF : UI.heart}</button></div>
      <div class="lb-img" style="background:${photoBg(p).replace("center/cover", "center/contain")}"></div></div>`);
    w.body.append(lb);
    lb.addEventListener("click", (e) => {
      const a = e.target.closest("[data-lb]")?.dataset.lb;
      if (a === "close") { lb.remove(); w.state.draw(); }
      if (a === "prev") photoLightbox(w, (k - 1 + list.length) % list.length);
      if (a === "next") photoLightbox(w, (k + 1) % list.length);
      if (a === "fav") { favs[p.i] = !favs[p.i]; store.set("favs", favs); photoLightbox(w, k); }
    });
    w.state.key = (e) => {
      if (e.key === "ArrowLeft") $('[data-lb="prev"]', lb)?.click();
      if (e.key === "ArrowRight") $('[data-lb="next"]', lb)?.click();
      if (e.key === "Escape") $('[data-lb="close"]', lb)?.click();
    };
  }
  document.addEventListener("keydown", (e) => {
    if (focused === "photos" && $(".lightbox", wins.photos?.body)) wins.photos.state.key?.(e);
  });

  /* ---------------- Photo Booth ---------------- */
  // laid out like the real app: live view, snapshot strip, then modes · shutter · Effects
  const PB_DEFS = `<svg class="pb-defs" aria-hidden="true"><defs>
    <filter id="pb-comic"><feComponentTransfer><feFuncR type="discrete" tableValues="0 .25 .5 .75 1"/><feFuncG type="discrete" tableValues="0 .25 .5 .75 1"/><feFuncB type="discrete" tableValues="0 .25 .5 .75 1"/></feComponentTransfer><feColorMatrix type="saturate" values="1.7"/></filter>
    <filter id="pb-pencil"><feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/><feGaussianBlur stdDeviation=".4"/><feConvolveMatrix order="3" preserveAlpha="true" kernelMatrix="0 -1 0 -1 4 -1 0 -1 0"/><feComponentTransfer><feFuncR type="table" tableValues="1 0"/><feFuncG type="table" tableValues="1 0"/><feFuncB type="table" tableValues="1 0"/></feComponentTransfer></filter>
    <filter id="pb-thermal"><feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="0 0 .3 1 1 1"/><feFuncG type="table" tableValues="0 .2 .7 .9 .6 1"/><feFuncB type="table" tableValues=".35 .7 .4 0 0 .7"/></feComponentTransfer><feColorMatrix type="saturate" values="1.35"/></filter>
  </defs></svg>`;
  const NORMAL = ["Normal", "none"];
  const EFFECTS = [
    ["Sepia", "sepia(.85) contrast(1.05) saturate(1.15) brightness(1.03)"], ["Black & White", "grayscale(1) contrast(1.15) brightness(1.05)"],
    ["Glow", "brightness(1.12) contrast(.92) saturate(1.45)"], ["Comic Book", "url(#pb-comic)"], ["Colored Pencil", "url(#pb-pencil)"],
    ["X-Ray", "invert(1) grayscale(1) contrast(1.2) brightness(1.05)"], ["Thermal Camera", "url(#pb-thermal)"], ["Invert", "invert(1)"],
    ["Retro", "sepia(.4) hue-rotate(-18deg) saturate(1.5) contrast(1.05) brightness(1.02)"], ["Noir", "grayscale(1) contrast(1.5) brightness(.95)"],
    ["Vaporwave", "hue-rotate(230deg) saturate(1.7) contrast(1.1)"], ["Cool", "sepia(.5) hue-rotate(150deg) saturate(1.4) brightness(1.02)"],
    ["Warm", "sepia(.5) hue-rotate(-25deg) saturate(1.5) brightness(1.03)"], ["Dream", "blur(1.2px) brightness(1.12) saturate(1.5) contrast(.95)"],
  ];
  // pages of nine with Normal in the centre, like the real effects grid
  const PB_PAGES = Array.from({ length: Math.ceil(EFFECTS.length / 8) }, (_, p) => { const pg = EFFECTS.slice(p * 8, p * 8 + 8); pg.splice(4, 0, NORMAL); return pg; });
  const PBI = {
    off: sv('<path d="m2 2 20 20"/><path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16"/><path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5"/><path d="M14.121 15.121A3 3 0 1 1 9.88 10.88"/>'),
    retry: sv('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'),
    burst: sv('<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>'),
    photo: sv('<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>'),
    video: sv('<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/>'),
    save: sv('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>'),
    close: sv('<path d="M18 6 6 18M6 6l12 12"/>'),
  };
  APPS.photobooth.render = (w) => {
    const st = w.state;
    Object.assign(st, { mode: "photo", fx: NORMAL, page: 0, shots: [], ready: false });
    w.body.innerHTML = `${PB_DEFS}
      <div class="pb-title" data-drag>${TRAFFIC}<span>Photo Booth</span></div>
      <div class="pb-stage">
        <video class="pb-live" autoplay playsinline muted hidden></video>
        <div class="pb-msg"></div>
        <div class="pb-grid" hidden></div>
        <div class="pb-view" hidden></div>
        <div class="pb-count" hidden></div>
        <div class="pb-rec" hidden><i></i><span>0:00</span></div>
        <div class="pb-flash"></div>
      </div>
      <div class="pb-tray"><div class="pb-empty">Your snapshots will show up here.</div></div>
      <div class="pb-bar">
        <div class="pb-modes">
          <button data-mode="burst" title="4-up burst" aria-label="4-up burst">${PBI.burst}</button>
          <button data-mode="photo" class="on" title="Photo" aria-label="Photo">${PBI.photo}</button>
          <button data-mode="video" title="Video" aria-label="Video">${PBI.video}</button>
        </div>
        <button class="pb-shutter" aria-label="Take photo" disabled>${UI.camera}</button>
        <button class="pb-fxbtn" disabled>Effects</button>
      </div>`;
    w.body.addEventListener("click", (e) => {
      const t = e.target;
      if (t.closest("[data-cam]")) return pbStart(w);
      const m = t.closest("[data-mode]");
      if (m && !st.rec && !st.busy) {
        st.mode = m.dataset.mode;
        $$("[data-mode]", w.body).forEach((b) => b.classList.toggle("on", b === m));
        $(".pb-shutter", w.body).innerHTML = st.mode === "video" ? '<i class="rec"></i>' : UI.camera;
        $(".pb-shutter", w.body).setAttribute("aria-label", st.mode === "video" ? "Record video" : "Take photo");
      }
      if (t.closest(".pb-shutter")) pbShutter(w);
      if (t.closest(".pb-fxbtn")) pbEffects(w, $(".pb-grid", w.body).hidden);
      const cell = t.closest("[data-fx]");
      if (cell) { const [p, i] = cell.dataset.fx.split(":").map(Number); st.fx = PB_PAGES[p][i]; $(".pb-live", w.body).style.filter = st.fx[1]; pbEffects(w, false); }
      const pg = t.closest("[data-pg]");
      if (pg) { st.page = (st.page + +pg.dataset.pg + PB_PAGES.length) % PB_PAGES.length; pbEffects(w, true); }
      const dot = t.closest("[data-dot]");
      if (dot) { st.page = +dot.dataset.dot; pbEffects(w, true); }
      const shot = t.closest("[data-shot]");
      if (shot) pbView(w, +shot.dataset.shot);
      if (t.closest("[data-vclose]")) $(".pb-view", w.body).hidden = true;
      const del = t.closest("[data-vdel]");
      if (del) { st.shots.splice(+del.dataset.vdel, 1); $(".pb-view", w.body).hidden = true; pbTray(w); }
    });
    pbStart(w);
  };
  // asks the browser for the camera; on failure says why and offers Try again
  async function pbStart(w) {
    const msg = $(".pb-msg", w.body);
    if (!msg) return;
    msg.hidden = false;
    msg.innerHTML = `<div class="pb-spin"></div><p>Starting camera…</p><small>Your browser will ask for camera access — click Allow.</small>`;
    try {
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) throw Object.assign(new Error(), { name: "Insecure" });
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" }, audio: false });
      if (!wins.photobooth) return stream.getTracks().forEach((t) => t.stop());
      w.state.stream = stream;
      const v = $(".pb-live", w.body);
      v.srcObject = stream; v.hidden = false; v.style.filter = w.state.fx[1];
      v.play().catch(() => {});
      msg.hidden = true;
      w.state.ready = true;
      $(".pb-shutter", w.body).disabled = $(".pb-fxbtn", w.body).disabled = false;
    } catch (err) {
      const [title, why] = {
        NotAllowedError: ["Camera access blocked", "Photo Booth needs your webcam. Allow camera access in your browser’s site settings, then try again."],
        NotFoundError: ["No camera found", "Plug in a webcam, then try again."],
        NotReadableError: ["Camera is busy", "Another app is using your camera. Close it, then try again."],
        Insecure: ["Camera unavailable", "The camera only works when the site is opened over https."],
      }[err?.name] || ["Camera unavailable", "Something went wrong starting the camera. Try again."];
      msg.innerHTML = `${PBI.off}<p>${title}</p><small>${why}</small><button class="pb-retry" data-cam>${PBI.retry} Try again</button>`;
    }
  }
  APPS.photobooth.close = (w) => {
    w.state.recorder?.state === "recording" && w.state.recorder.stop();
    cancelAnimationFrame(w.state.raf);
    w.state.stream?.getTracks().forEach((t) => t.stop());
  };
  function pbEffects(w, open) {
    const grid = $(".pb-grid", w.body), st = w.state;
    $(".pb-fxbtn", w.body).classList.toggle("on", open);
    if (!open) { grid.hidden = true; grid.innerHTML = ""; return; }
    grid.hidden = false;
    grid.innerHTML = `<div class="cells">${PB_PAGES[st.page].map(([n, f], i) => `<button class="cell ${st.fx[0] === n ? "on" : ""}" data-fx="${st.page}:${i}"><video autoplay playsinline muted style="filter:${f}"></video><span>${n}</span></button>`).join("")}</div>
      <div class="pager"><button data-pg="-1" aria-label="Previous effects">${UI.back}</button>${PB_PAGES.map((_, i) => `<span data-dot="${i}" class="${i === st.page ? "on" : ""}"></span>`).join("")}<button data-pg="1" aria-label="More effects">${UI.fwd}</button></div>`;
    $$("video", grid).forEach((v) => { v.srcObject = st.stream; v.play().catch(() => {}); });
  }
  // draws the live frame (mirrored, with the effect) onto a canvas
  function pbFrame(w, cv, x = 0, y = 0, cw = cv.width, ch = cv.height) {
    const v = $(".pb-live", w.body), ctx = cv.getContext("2d");
    ctx.save();
    if ("filter" in ctx) ctx.filter = w.state.fx[1];
    ctx.translate(x + cw, y); ctx.scale(-1, 1);
    ctx.drawImage(v, 0, 0, cw, ch);
    ctx.restore();
  }
  function pbFlash(w) { const f = $(".pb-flash", w.body); f.classList.remove("go"); void f.offsetWidth; f.classList.add("go"); }
  async function pbCountdown(w) {
    const c = $(".pb-count", w.body);
    for (const n of [3, 2, 1]) { c.textContent = n; c.hidden = false; await sleep(800); }
    c.hidden = true;
  }
  async function pbShutter(w) {
    const st = w.state, v = $(".pb-live", w.body);
    if (!st.ready || st.busy) return;
    if (st.mode === "video") return st.rec ? pbStopRec(w) : pbStartRec(w);
    st.busy = true;
    pbEffects(w, false);
    await pbCountdown(w);
    const vw = v.videoWidth || 1280, vh = v.videoHeight || 720;
    const cv = document.createElement("canvas");
    if (st.mode === "burst") {
      cv.width = vw; cv.height = vh;
      for (let i = 0; i < 4; i++) { pbFrame(w, cv, (i % 2) * vw / 2, Math.floor(i / 2) * vh / 2, vw / 2, vh / 2); pbFlash(w); await sleep(450); }
    } else { cv.width = vw; cv.height = vh; pbFrame(w, cv); pbFlash(w); }
    st.shots.unshift({ kind: "photo", url: cv.toDataURL("image/jpeg", 0.92) });
    pbTray(w);
    st.busy = false;
  }
  async function pbStartRec(w) {
    const st = w.state, v = $(".pb-live", w.body);
    if (!window.MediaRecorder) return;
    pbEffects(w, false);
    await pbCountdown(w);
    const cv = document.createElement("canvas");
    cv.width = v.videoWidth || 1280; cv.height = v.videoHeight || 720;
    const draw = () => { pbFrame(w, cv); st.raf = requestAnimationFrame(draw); };
    draw();
    const chunks = [];
    st.recorder = new MediaRecorder(cv.captureStream(30));
    st.recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    st.recorder.onstop = () => {
      cancelAnimationFrame(st.raf);
      const blob = new Blob(chunks, { type: st.recorder.mimeType || "video/webm" });
      st.shots.unshift({ kind: "video", url: URL.createObjectURL(blob), ext: (blob.type.includes("mp4") ? "mp4" : "webm") });
      pbTray(w);
    };
    st.recorder.start();
    st.rec = Date.now();
    const rec = $(".pb-rec", w.body); rec.hidden = false;
    $(".pb-shutter", w.body).classList.add("recording");
    st.recTimer = setInterval(() => { const s = Math.floor((Date.now() - st.rec) / 1000); $("span", rec).textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }, 250);
  }
  function pbStopRec(w) {
    const st = w.state;
    clearInterval(st.recTimer); st.rec = null;
    st.recorder.stop();
    $(".pb-rec", w.body).hidden = true; $(".pb-rec span", w.body).textContent = "0:00";
    $(".pb-shutter", w.body).classList.remove("recording");
  }
  function pbTray(w) {
    const st = w.state;
    $(".pb-tray", w.body).innerHTML = st.shots.length
      ? st.shots.map((s, i) => `<button class="pb-thumb" data-shot="${i}">${s.kind === "video" ? `<video src="${s.url}" muted></video><i>${PBI.video}</i>` : `<img src="${s.url}" alt="Snapshot ${i + 1}">`}</button>`).join("")
      : '<div class="pb-empty">Your snapshots will show up here.</div>';
  }
  function pbView(w, i) {
    const s = w.state.shots[i], view = $(".pb-view", w.body);
    view.hidden = false;
    view.innerHTML = `${s.kind === "video" ? `<video src="${s.url}" controls autoplay playsinline></video>` : `<img src="${s.url}" alt="Snapshot">`}
      <div class="acts"><a class="pb-pill" href="${s.url}" download="photo-booth-${Date.now()}.${s.kind === "video" ? s.ext : "jpg"}">${PBI.save} Save</a><button class="pb-pill" data-vdel="${i}">${UI.trash} Delete</button><button class="pb-pill" data-vclose>${PBI.close} Back to camera</button></div>`;
  }

  /* ---------------- Weather ---------------- */
  // a static forecast; local times are live for each city's time zone
  const WX_ICON = { Haze: "🌫️", "Partly Cloudy": "⛅", Clear: "🌙", Sunny: "☀️", Rain: "🌧️", Cloudy: "☁️" };
  const WX_BG = { Haze: ["#a08c63", "#6e6047"], "Partly Cloudy": ["#6f8fb8", "#4b6a93"], Clear: ["#4a78c9", "#2c4f94"], Sunny: ["#4f9be8", "#2f72cc"], Rain: ["#5d6b80", "#3c4758"], Cloudy: ["#7d8794", "#59626e"] };
  const WX = [
    { city: "Mumbai", tz: "Asia/Kolkata", t: 31, cond: "Haze", hi: 33, lo: 26, note: "Humid and hazy through the evening. Sea breeze picking up after sunset." },
    { city: "Bengaluru", tz: "Asia/Kolkata", t: 24, cond: "Partly Cloudy", hi: 28, lo: 20, note: "Pleasant with patchy clouds. Light breeze from the west." },
    { city: "New Delhi", tz: "Asia/Kolkata", t: 29, cond: "Haze", hi: 32, lo: 18, note: "Hazy skies and poor visibility through the night." },
    { city: "San Francisco", tz: "America/Los_Angeles", t: 14, cond: "Clear", hi: 19, lo: 11, note: "Clear and cool. Fog may roll in early tomorrow." },
    { city: "London", tz: "Europe/London", t: 12, cond: "Cloudy", hi: 14, lo: 8, note: "Overcast with a chance of drizzle later." },
    { city: "New York", tz: "America/New_York", t: 16, cond: "Sunny", hi: 18, lo: 9, note: "Crisp and sunny. Winds gusting to 15 km/h." },
  ];
  const wxTime = (tz, opts = { hour: "numeric", minute: "2-digit" }) => new Date().toLocaleTimeString("en-US", { timeZone: tz, ...opts });
  APPS.weather.render = (w) => {
    w.state.i = 0;
    w.body.innerHTML = `
      <aside class="wx-side">
        <div class="wx-top" data-drag>${TRAFFIC}</div>
        <div class="search wx-search">${UI.search}<input placeholder="Search for a city or airport" aria-label="Search cities"></div>
        <div class="wx-list scroll"></div>
      </aside>
      <section class="wx-main scroll" data-drag></section>`;
    const list = $(".wx-list", w.body), main = $(".wx-main", w.body), q = $(".wx-search input", w.body);
    const bg = (c) => `linear-gradient(160deg, ${WX_BG[c.cond][0]}, ${WX_BG[c.cond][1]})`;
    const drawList = () => {
      const f = q.value.trim().toLowerCase();
      list.innerHTML = WX.map((c, i) => ({ c, i })).filter(({ c }) => c.city.toLowerCase().includes(f)).map(({ c, i }) => `
        <button class="wx-card ${i === w.state.i ? "on" : ""}" data-city="${i}" style="background:${bg(c)}">
          <div><b>${c.city}</b><small>${wxTime(c.tz)}</small><small class="c">${c.cond}</small></div>
          <div class="r"><span>${c.t}°</span><small>H:${c.hi}° L:${c.lo}°</small></div>
        </button>`).join("") || '<div class="wx-none">No results</div>';
    };
    const drawMain = () => {
      const c = WX[w.state.i];
      const hour = Number(wxTime(c.tz, { hour: "numeric", hour12: false })) % 24;
      const hours = Array.from({ length: 10 }, (_, k) => {
        const hh = (hour + k) % 24, warm = Math.cos(((hh - 15) / 24) * 2 * Math.PI);
        return { label: k ? `${hh % 12 || 12}${hh < 12 ? "AM" : "PM"}` : "Now", t: k ? Math.round((c.hi + c.lo) / 2 + warm * (c.hi - c.lo) / 2) : c.t };
      });
      const days = ["Today", ...Array.from({ length: 5 }, (_, k) => new Date(Date.now() + (k + 1) * 864e5).toLocaleDateString("en-US", { weekday: "short", timeZone: c.tz }))];
      const span = [c.lo - 3, c.hi + 3];
      main.style.background = bg(c);
      main.innerHTML = `
        <div class="wx-hero"><div class="city">${c.city}</div><div class="temp">${c.t}°</div><div class="cond">${WX_ICON[c.cond]} ${c.cond}</div><div class="hl">H:${c.hi}° L:${c.lo}°</div></div>
        <div class="wx-box">${c.note}</div>
        <div class="wx-box"><div class="wx-cap">🕘 HOURLY FORECAST</div><div class="wx-hours">${hours.map((x) => `<div><small>${x.label}</small><span>${WX_ICON[c.cond]}</span><b>${x.t}°</b></div>`).join("")}</div></div>
        <div class="wx-box"><div class="wx-cap">📅 6-DAY FORECAST</div>${days.map((d, k) => {
          const lo = c.lo + ((k * 3) % 3) - 1, hi = c.hi - ((k * 2) % 3) + 1;
          const l = ((lo - span[0]) / (span[1] - span[0])) * 100, r = ((hi - span[0]) / (span[1] - span[0])) * 100;
          return `<div class="wx-day"><span>${d}</span><i>${WX_ICON[c.cond]}</i><small>${lo}°</small><div class="bar"><div style="left:${l}%;right:${100 - r}%"></div></div><b>${hi}°</b></div>`;
        }).join("")}</div>`;
    };
    list.addEventListener("click", (e) => { const b = e.target.closest("[data-city]"); if (b) { w.state.i = +b.dataset.city; drawList(); drawMain(); } });
    q.addEventListener("input", drawList);
    drawList(); drawMain();
    w.state.tick = setInterval(drawList, 30000);
  };
  APPS.weather.close = (w) => clearInterval(w.state.tick);

  /* ---------------- Music ---------------- */
  const Music = {
    queue: [], idx: -1, playing: false, t: 0, timer: null, audio: null,
    current() { return MUSIC.songs[this.queue[this.idx]]; },
    play(queue, idx) {
      this.queue = queue; this.idx = idx; this.t = 0;
      this.start();
    },
    start() {
      const s = this.current();
      if (!s) return;
      this.stopAudio();
      if (s.src) {
        this.audio = new Audio(s.src);
        this.audio.volume = prefs.volume / 100;
        this.audio.currentTime = this.t;
        this.audio.play().catch(() => {});
        this.audio.onended = () => this.next();
      }
      this.playing = true;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.t = this.audio ? this.audio.currentTime : this.t + 1;
        if (!this.audio && this.t >= toSec(s.time)) return this.next();
        this.ui();
      }, 1000);
      this.ui();
    },
    pause() { this.playing = false; clearInterval(this.timer); this.audio?.pause(); this.ui(); },
    toggle() {
      if (this.idx < 0) return this.play(MUSIC.songs.map((_, i) => i), 0);
      this.playing ? this.pause() : this.start();
    },
    next() { if (!this.queue.length) return; this.idx = (this.idx + 1) % this.queue.length; this.t = 0; this.start(); },
    prev() { if (!this.queue.length) return; if (this.t > 3) this.t = 0; else this.idx = (this.idx - 1 + this.queue.length) % this.queue.length; this.t = 0; this.start(); },
    seek(f) { const s = this.current(); if (!s) return; this.t = f * toSec(s.time); if (this.audio) this.audio.currentTime = this.t; this.ui(); },
    setVolume(v) { if (this.audio) this.audio.volume = v / 100; },
    stopAudio() { if (this.audio) { this.audio.pause(); this.audio = null; } },
    stop() { this.pause(); this.stopAudio(); this.idx = -1; this.queue = []; },
    ui() { if (wins.music) musicPlayer(wins.music); },
  };
  const songArt = (i) => MUSIC.playlists.find((p) => p.songs.includes(i)) || MUSIC.playlists[0];
  APPS.music.render = (w) => {
    w.body.innerHTML = `
      <div class="mu-wrap">
        <aside class="mu-side scroll" data-drag>${TRAFFIC}
          <div style="height:18px"></div>
          <div class="side-item active" data-mv="home" role="button"><span class="ico">${UI.home.replace("<svg", '<svg width="14" height="14"')}</span>Home</div>
          <div class="side-item" data-mv="browse" role="button"><span class="ico">${UI.compass.replace("<svg", '<svg width="14" height="14"')}</span>Browse</div>
          <div class="side-label">Library</div>
          <div class="side-item" data-mv="artists" role="button"><span class="ico">${UI.mic.replace("<svg", '<svg width="14" height="14"')}</span>Artists</div>
          <div class="side-item" data-mv="albums" role="button"><span class="ico">${UI.album.replace("<svg", '<svg width="14" height="14"')}</span>Albums</div>
          <div class="side-item" data-mv="songs" role="button"><span class="ico">${UI.list.replace("<svg", '<svg width="14" height="14"')}</span>Songs</div>
          <div class="side-label">Playlists</div>
          ${MUSIC.playlists.map((p) => `<div class="side-item" data-mv="pl:${p.id}" role="button"><span class="ico">${p.emoji}</span>${esc(p.name)}</div>`).join("")}
        </aside>
        <section class="mu-main">
          <div class="mu-top" data-drag><label class="search">${UI.search}<input placeholder="Search" aria-label="Search music"></label></div>
          <div class="mu-content scroll"></div>
        </section>
      </div>
      <div class="player"></div>`;
    w.state.view = "home";
    $(".mu-top input", w.body).addEventListener("input", (e) => { w.state.q = e.target.value.toLowerCase(); musicView(w); });
    w.body.addEventListener("click", (e) => {
      const mv = e.target.closest("[data-mv]");
      if (mv) { w.state.view = mv.dataset.mv; musicView(w); }
      const row = e.target.closest("[data-song]");
      if (row) Music.play(JSON.parse(row.closest("[data-queue]").dataset.queue), +row.dataset.pos);
      const pa = e.target.closest("[data-playall]");
      if (pa) { const pl = MUSIC.playlists.find((p) => p.id === pa.dataset.playall); const q = [...pl.songs]; if (pa.dataset.shuffle) q.sort(() => Math.random() - 0.5); Music.play(q, 0); }
      const c = e.target.closest("[data-ctl]")?.dataset.ctl;
      if (c) Music[c]();
      const pr = e.target.closest(".progress");
      if (pr) { const r = pr.getBoundingClientRect(); Music.seek((e.clientX - r.left) / r.width); }
    });
    w.body.addEventListener("input", (e) => { if (e.target.dataset.vol !== undefined) { prefs.volume = +e.target.value; Music.setVolume(prefs.volume); savePrefs(); } });
    musicView(w);
    musicPlayer(w);
  };
  APPS.music.close = () => Music.stop();
  function songTable(idxs) {
    const cur = Music.idx >= 0 ? Music.queue[Music.idx] : -1;
    return `<table class="songs" data-queue="${JSON.stringify(idxs)}"><tbody>${idxs.map((i, pos) => {
      const s = MUSIC.songs[i], a = songArt(i);
      return `<tr data-song="${i}" data-pos="${pos}" class="${i === cur ? "playing" : ""}" role="button"><td><div class="art-s" style="background:linear-gradient(135deg,${a.g[0]},${a.g[1]})">${i === cur && Music.playing ? "🔊" : a.emoji}</div></td><td>${esc(s.title)}</td><td class="sub">${esc(s.artist)}</td><td class="sub">${esc(s.album)}</td><td>${s.time}</td></tr>`;
    }).join("")}</tbody></table>`;
  }
  function musicView(w) {
    const v = w.state.view, c = $(".mu-content", w.body), q = w.state.q || "";
    $$("[data-mv]", w.body).forEach((x) => x.classList.toggle("active", x.dataset.mv === v));
    const all = MUSIC.songs.map((_, i) => i).filter((i) => !q || Object.values(MUSIC.songs[i]).join(" ").toLowerCase().includes(q));
    const grid = (pls) => `<div class="pl-grid">${pls.map((p) => `<div class="pl-card" data-mv="pl:${p.id}" role="button"><div class="art" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})"><span>${p.emoji}</span><div class="play" data-playall="${p.id}">${UI.play}</div></div><b>${esc(p.name)}</b><small>${p.songs.length} songs</small></div>`).join("")}</div>`;
    if (q) { c.innerHTML = `<h2>Results for “${esc(q)}”</h2>${all.length ? songTable(all) : '<div class="empty">No results</div>'}`; return; }
    if (v === "home") c.innerHTML = `<h2>Playlists</h2>${grid(MUSIC.playlists)}<h2>Songs</h2>${songTable(all)}`;
    else if (v === "browse") c.innerHTML = `<h2>Made for ${esc(S.first)}</h2>${grid([...MUSIC.playlists].reverse())}<h2>On repeat</h2>${songTable(all.slice(0, 6))}`;
    else if (v === "songs") c.innerHTML = `<h2>Songs</h2>${songTable(all)}`;
    else if (v === "artists" || v === "albums") {
      const key = v === "artists" ? "artist" : "album";
      const groups = {};
      all.forEach((i) => (groups[MUSIC.songs[i][key]] ||= []).push(i));
      c.innerHTML = `<h2>${v === "artists" ? "Artists" : "Albums"}</h2>` + Object.entries(groups).map(([name, idxs]) => `<h3 style="font-size:15px;margin:18px 0 8px">${esc(name)}</h3>${songTable(idxs)}`).join("");
    } else if (v.startsWith("pl:")) {
      const p = MUSIC.playlists.find((x) => x.id === v.slice(3));
      const mins = Math.round(p.songs.reduce((n, i) => n + toSec(MUSIC.songs[i].time), 0) / 60);
      c.innerHTML = `<div class="pl-hero"><div class="art" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})">${p.emoji}</div><div><h1>${esc(p.name)}</h1><div style="color:#fa2d48;font-size:18px">${esc(S.name)}</div><small style="color:var(--text-2)">${p.songs.length} songs, ${mins} minutes</small>
        <div class="btns"><button class="red-btn" data-playall="${p.id}">${UI.play} Play</button><button class="red-btn" data-playall="${p.id}" data-shuffle="1">${UI.shuffle} Shuffle</button></div></div></div>${songTable(p.songs)}`;
    }
  }
  function musicPlayer(w) {
    const s = Music.current();
    const a = s ? songArt(Music.queue[Music.idx]) : null;
    const pct = s ? Math.min(100, (Music.t / toSec(s.time)) * 100) : 0;
    $(".player", w.body).innerHTML = `
      <div class="ctrls"><button data-ctl="shuffleQ" aria-label="Shuffle" style="opacity:.5">${UI.shuffle}</button><button data-ctl="prev" aria-label="Previous">${UI.prev}</button><button class="pp" data-ctl="toggle" aria-label="${Music.playing ? "Pause" : "Play"}">${Music.playing ? UI.pause : UI.play}</button><button data-ctl="next" aria-label="Next">${UI.next}</button></div>
      <div class="now">${s ? `<div class="art-s" style="background:linear-gradient(135deg,${a.g[0]},${a.g[1]})">${a.emoji}</div>` : `<div class="art-s" style="background:var(--input)">${UI.note.replace("<svg", '<svg width="18" height="18"')}</div>`}
        <div class="meta">${s ? `<b>${esc(s.title)}</b><span>${esc(s.artist)} — ${esc(s.album)}</span><div class="progress"><i style="width:${pct}%"></i></div>` : `<span style="padding:12px 0">Not Playing</span>`}</div>
        ${s ? `<small style="color:var(--text-2);font-size:11px;width:34px">${fmtSec(Music.t)}</small>` : ""}</div>
      <div class="vol">${UI.vol}<input type="range" min="0" max="100" value="${prefs.volume}" data-vol aria-label="Volume"></div>`;
    if (w.state.view && $(".songs", w.body)) {
      const cur = Music.idx >= 0 ? Music.queue[Music.idx] : -1;
      $$(".songs tr", w.body).forEach((tr) => {
        const i = +tr.dataset.song; tr.classList.toggle("playing", i === cur);
        const art = $(".art-s", tr); art.textContent = i === cur && Music.playing ? "🔊" : songArt(i).emoji;
      });
    }
  }
  Music.shuffleQ = () => { if (Music.queue.length) { const cur = Music.queue[Music.idx]; Music.queue.sort(() => Math.random() - 0.5); Music.idx = Music.queue.indexOf(cur); } };

  /* ---------------- Terminal ---------------- */
  const FILES = () => ({
    "read-me.txt": S.readme,
    ...Object.fromEntries(NOTES.map((n) => [n.id + ".md", `${n.emoji} ${n.title}\n\n${n.body.replace(/^!\[([^\]]*)\]\(([^)]+)\)$/gm, "[image: $2]").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "").replace(/^## /gm, "")}`])),
  });
  APPS.terminal.render = (w) => {
    w.body.innerHTML = `<div class="term-head" data-drag>${TRAFFIC}<div class="t">${esc(S.username)} — -zsh — 80×24</div></div><div class="term-body scroll selectable"><div class="out"></div><div class="term-in"><span class="pr">${esc(S.username)}@${esc(S.machine)} ~ %</span><input spellcheck="false" autocomplete="off" aria-label="Terminal input"></div></div>`;
    const body = $(".term-body", w.body), input = $(".term-in input", w.body);
    w.state.hist = []; w.state.hi = 0;
    const lastLogin = new Date(Date.now() - 3600e3 * 5).toString().slice(0, 24);
    termPrint(w, `Last login: ${lastLogin} on ttys000\nType 'help' for available commands`);
    body.addEventListener("click", (e) => { if (!getSelection().toString()) input.focus(); const lk = e.target.closest("[data-open]"); if (lk) termRun(w, "open " + lk.dataset.open); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { const v = input.value; input.value = ""; termRun(w, v); }
      else if (e.key === "ArrowUp") { if (w.state.hi > 0) input.value = w.state.hist[--w.state.hi]; e.preventDefault(); }
      else if (e.key === "ArrowDown") { w.state.hi = Math.min(w.state.hist.length, w.state.hi + 1); input.value = w.state.hist[w.state.hi] || ""; e.preventDefault(); }
      else if (e.key === "Tab") {
        e.preventDefault();
        const parts = input.value.split(" "), last = parts.pop();
        const pool = parts.length ? [...Object.keys(FILES()), ...Object.keys(APPS), ...NOTES.map((n) => n.id)] : CMDS;
        const m = pool.filter((x) => x.startsWith(last));
        if (m.length === 1) input.value = [...parts, m[0]].join(" ");
        else if (m.length > 1) termPrint(w, m.join("  "));
      } else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); $(".out", w.body).innerHTML = ""; }
    });
    setTimeout(() => input.focus(), 50);
  };
  const CMDS = ["help", "whoami", "about", "ls", "cat", "open", "cd", "pwd", "socials", "contact", "date", "echo", "clear", "history", "neofetch", "theme", "wallpaper", "play", "pause", "sudo", "exit"];
  function termPrint(w, text, cls = "") {
    const out = $(".out", w.body);
    out.append(h(`<div class="ln ${cls}">${cls === "raw" ? text : esc(text)}</div>`));
    const b = $(".term-body", w.body); b.scrollTop = b.scrollHeight;
  }
  function termRun(w, raw) {
    const line = raw.trim();
    termPrint(w, `<span class="pr">${esc(S.username)}@${esc(S.machine)} ~ %</span> ${esc(raw)}`, "raw");
    if (!line) return;
    w.state.hist.push(line); w.state.hi = w.state.hist.length;
    const [cmd, ...args] = line.split(/\s+/);
    const arg = args.join(" ");
    const P = (t, c) => termPrint(w, t, c);
    switch (cmd) {
      case "help":
        P(`available commands:
  whoami / about     who is ${S.first}?
  ls                 list files
  cat <file>         read a file (try: cat about-me.md)
  open <app|note>    open an app or note (try: open music)
  socials            where to find ${S.first}
  contact            how to reach ${S.first}
  neofetch           system info
  theme light|dark   switch appearance
  wallpaper <name>   ${WALLPAPERS.map((x) => x.id).join(", ")}
  play / pause       control music
  date, echo, pwd, history, clear, exit`);
        break;
      case "whoami": case "about":
        P(plain(NOTES[0].body).slice(0, 420) + "…");
        termPrint(w, `→ <span class="lk" data-open="about-me">open about-me</span> for the full note`, "raw");
        break;
      case "ls": case "dir": {
        const f = Object.keys(FILES());
        termPrint(w, `<span class="dir">Applications/</span>  <span class="dir">Pictures/</span>  ` + f.map((x) => `<span class="lk" data-open="${x.replace(/\.(md|txt)$/, "")}">${esc(x)}</span>`).join("  "), "raw");
        break;
      }
      case "cat": {
        const f = FILES(), name = arg.endsWith(".md") || arg.endsWith(".txt") ? arg : f[arg + ".md"] ? arg + ".md" : arg;
        if (!arg) P("usage: cat <file>", "err");
        else if (f[name]) P(f[name]);
        else P(`cat: ${arg}: No such file or directory`, "err");
        break;
      }
      case "open": {
        const t = arg.toLowerCase().replace(/\.(md|txt)$/, "").replace(/\s+/g, "");
        const alias = { iterm: "terminal", twitter: "x", gpt: "chatgpt", "read-me": "textedit", readme: "textedit", trash: "finder", bin: "finder", camera: "photobooth" };
        const id = alias[t] || t;
        if (APPS[id]) { openApp(id, t === "trash" || t === "bin" ? "bin" : undefined); P(`opening ${APPS[id].name}…`); }
        else if (NOTES.find((n) => n.id === t)) { openApp("notes", t); P(`opening note ${t}…`); }
        else if (/^https?:\/\//.test(arg)) { window.open(arg, "_blank", "noopener"); }
        else P(`open: ${arg || "?"}: not found. try: ${Object.keys(APPS).filter((a) => a !== "about").join(", ")}`, "err");
        break;
      }
      case "cd": P(arg && !["~", "/", "..", "."].includes(arg) ? `cd: permission denied: ${arg} (nice try)` : "", arg ? "err" : ""); break;
      case "pwd": P(`/Users/${S.username}`); break;
      case "socials":
        termPrint(w, Object.entries(S.socials).map(([k, v]) => `${k.padEnd(9)} <a class="lk" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.url)}</a>`).join("\n"), "raw");
        break;
      case "contact": termPrint(w, `email    <a class="lk" href="mailto:${esc(S.email)}">${esc(S.email)}</a>\nor run: open hit-me-up`, "raw"); break;
      case "date": P(new Date().toString()); break;
      case "echo": P(arg); break;
      case "history": P(w.state.hist.map((x, i) => `${String(i + 1).padStart(4)}  ${x}`).join("\n")); break;
      case "clear": $(".out", w.body).innerHTML = ""; break;
      case "neofetch":
        termPrint(w, `<span class="hl">       .:'          </span><b>${esc(S.username)}@${esc(S.machine)}</b>
<span class="hl">    __ :'__        </span>---------------------------
<span class="hl"> .'\`  \`-'  \`\`.     </span><span class="dir">OS</span>: ${esc(S.first)}OS 26 Tahoe
<span class="hl">:          .-'     </span><span class="dir">Host</span>: ${esc(S.domain)}
<span class="hl">:         :        </span><span class="dir">Uptime</span>: ${Math.floor(performance.now() / 60000)} mins
<span class="hl"> :         \`-;     </span><span class="dir">Shell</span>: zsh 5.9
<span class="hl">  \`.__.-.__.'      </span><span class="dir">Theme</span>: ${prefs.theme}
                   <span class="dir">Memory</span>: mostly chai and side projects
                   <span class="dir">Location</span>: ${esc(S.location)}`, "raw");
        break;
      case "theme":
        if (["light", "dark", "auto"].includes(arg)) { prefs.theme = arg; savePrefs(); applyPrefs(); P(`appearance set to ${arg}`); }
        else P("usage: theme light|dark|auto", "err");
        break;
      case "wallpaper": {
        const wp = WALLPAPERS.find((x) => x.id === arg.toLowerCase());
        if (wp) { prefs.wallpaper = wp.id; savePrefs(); applyPrefs(); P(`wallpaper set to ${wp.name}`); }
        else P(`usage: wallpaper ${WALLPAPERS.map((x) => x.id).join("|")}`, "err");
        break;
      }
      case "play": if (!wins.music) openApp("music"); if (!Music.playing) Music.toggle(); P("♪ playing"); break;
      case "pause": Music.pause(); P("paused"); break;
      case "sudo": P(`${S.username} is not in the sudoers file. This incident will be reported. 👀`, "err"); break;
      case "rm": P("let's not.", "err"); break;
      case "exit": closeWin("terminal"); break;
      case "vim": case "nano": case "emacs": P(`${cmd}: you'll never get out. try 'open notes' instead.`, "err"); break;
      default: P(`zsh: command not found: ${cmd}`, "err");
    }
  }

  /* ---------------- Settings ---------------- */
  const ST_ITEMS = [
    ["wifi", "Wi-Fi", "#0a84ff", "📶"], ["bluetooth", "Bluetooth", "#0a84ff", "ᛒ"], ["network", "Network", "#0a84ff", "🌐"], null,
    ["general", "General", "#8e8e93", "⚙️"], ["appearance", "Appearance", "#1c1c1e", "◐"], ["wallpaper", "Wallpaper", "#32ade6", "🖼️"],
    ["displays", "Displays", "#0a84ff", "☀️"], ["battery", "Battery", "#30d158", "🔋"],
  ];
  APPS.settings.render = (w, arg) => {
    w.body.innerHTML = `
      <aside class="st-side" data-drag>${TRAFFIC}
        <label class="search">${UI.search}<input placeholder="Search" aria-label="Search settings"></label>
        <div class="scroll" style="flex:1">
          <div class="st-prof st-item" data-pg="profile" role="button">${avatar(36)}<div><b>${esc(S.name)}</b><small>${esc(S.first)}OS Account</small></div></div>
          <div class="st-gap"></div>
          <div class="st-list"></div>
        </div>
      </aside>
      <section class="st-main"><div class="st-head" data-drag></div><div class="st-content scroll"></div></section>`;
    const drawList = (q = "") => {
      $(".st-list", w.body).innerHTML = ST_ITEMS.filter((x) => !x || x[1].toLowerCase().includes(q))
        .map((x) => x ? `<div class="st-item" data-pg="${x[0]}" role="button"><i style="background:${x[2]}">${x[3]}</i>${x[1]}</div>` : '<div class="st-gap"></div>').join("");
      $$("[data-pg]", w.body).forEach((e) => e.classList.toggle("active", e.dataset.pg === w.state.pg?.split("/")[0]));
    };
    w.state.drawList = drawList;
    $(".search input", w.body).addEventListener("input", (e) => drawList(e.target.value.toLowerCase()));
    w.body.addEventListener("click", (e) => {
      const pg = e.target.closest("[data-pg]");
      if (pg) return stPage(w, pg.dataset.pg);
      const sw = e.target.closest("[data-sw]");
      if (sw) { prefs[sw.dataset.sw] = !prefs[sw.dataset.sw]; savePrefs(); applyPrefs(); stPage(w, w.state.pg); }
      const th = e.target.closest("[data-th]");
      if (th) { prefs.theme = th.dataset.th; savePrefs(); applyPrefs(); stPage(w, w.state.pg); }
      const ac = e.target.closest("[data-accent]");
      if (ac) { prefs.accent = ac.dataset.accent; savePrefs(); applyPrefs(); stPage(w, w.state.pg); }
      const wp = e.target.closest("[data-wp]");
      if (wp) { prefs.wallpaper = wp.dataset.wp; savePrefs(); applyPrefs(); stPage(w, w.state.pg); }
      const go = e.target.closest("[data-go]");
      if (go) { const [app, sub] = go.dataset.go.split(":"); openApp(app, sub); }
    });
    w.body.addEventListener("input", (e) => {
      if (e.target.dataset.bright !== undefined) { prefs.brightness = +e.target.value; savePrefs(); applyPrefs(); }
    });
    drawList();
    stPage(w, arg || "general");
  };
  APPS.settings.open = (w, arg) => stPage(w, arg);
  function stPage(w, pg) {
    w.state.pg = pg;
    w.state.drawList($(".st-side .search input", w.body).value.toLowerCase());
    const [main, sub] = pg.split("/");
    const head = $(".st-head", w.body), c = $(".st-content", w.body);
    const titles = Object.fromEntries(ST_ITEMS.filter(Boolean).map((x) => [x[0], x[1]]));
    const back = sub ? `<button class="icon-btn" data-pg="${main}" aria-label="Back">${UI.back}</button>` : `<span class="icon-btn" style="opacity:.35">${UI.back}</span>`;
    head.innerHTML = `${back}<span class="icon-btn" style="opacity:.35">${UI.fwd}</span>${sub ? { about: "About", update: "Software Update", storage: "Storage" }[sub] : titles[main] || S.name}`;
    const row = (label, val = "", extra = "") => `<div class="st-row ${extra}"><div class="grow">${label}</div>${val}</div>`;
    const sw = (k) => `<div class="switch ${prefs[k] ? "on" : ""}" data-sw="${k}" role="switch" aria-checked="${!!prefs[k]}"></div>`;
    const chev = `<span class="chev">${UI.fwd.replace("<svg", '<svg width="14" height="14"')}</span>`;
    let html = "";
    if (main === "profile") {
      html = `<div class="st-hero">${avatar(84)}<h2>${esc(S.name)}</h2><small>${esc(S.email)}</small></div>
        <div class="st-group">
          <div class="st-row link" data-go="notes:about-me" role="button"><i style="background:#8e8e93">👤</i><div class="grow">Personal Information</div>${chev}</div>
          <div class="st-row link" data-go="notes:experience" role="button"><i style="background:#8e8e93">💼</i><div class="grow">Experience</div>${chev}</div>
          <div class="st-row link" data-go="notes:hit-me-up" role="button"><i style="background:#30d158">💬</i><div class="grow">Contact</div>${chev}</div>
        </div>
        <div class="st-group">${Object.entries(S.socials).map(([k, v]) => `<a class="st-row link" href="${esc(v.url)}" target="_blank" rel="noopener" style="text-decoration:none"><div class="grow">${k === "x" ? "X" : k[0].toUpperCase() + k.slice(1)}<small>@${esc(v.handle)}</small></div>${chev}</a>`).join("")}</div>`;
    } else if (main === "wifi") {
      html = `<div class="st-group">${row(`<b>Wi-Fi</b>`, sw("wifi"))}</div>` + (prefs.wifi ? `
        <div class="st-group">${row(`${esc(S.first)}'s hotspot<small>Connected</small>`, `<span class="val">🔒 📶</span>`)}</div>
        <div class="side-label" style="padding-left:2px">Other Networks</div>
        <div class="st-group">${["college-wifi (never works)", "Pretty Fly for a Wi-Fi", "FBI Surveillance Van", "chai-tapri-free"].map((n) => row(esc(n), `<span class="val">🔒 📶</span>`)).join("")}</div>` : "");
    } else if (main === "bluetooth") {
      html = `<div class="st-group">${row(`<b>Bluetooth</b><small>This Mac is discoverable as “${esc(S.machine)}”.</small>`, sw("bt"))}</div>` + (prefs.bt ? `
        <div class="side-label" style="padding-left:2px">My Devices</div>
        <div class="st-group">${row("AirPods<small>one of them is missing</small>", `<span class="val">Connected</span>`)}${row("Magic Mouse", `<span class="val">Not Connected</span>`)}${row("Mechanical Keyboard (loud)", `<span class="val">Connected</span>`)}</div>` : "");
    } else if (main === "network") {
      html = `<div class="st-group">${row("Wi-Fi", `<span class="val">${prefs.wifi ? "Connected" : "Off"}</span>`)}${row("Firewall", `<span class="val">Inactive</span>`)}${row("Network with people", `<span class="val">Always on</span>`, "link")}</div>`;
    } else if (main === "general" && !sub) {
      html = `<div class="st-hero"><div style="font-size:54px">⚙️</div><h2>General</h2><small>Manage your overall setup and preferences for this Mac.</small></div>
        <div class="st-group">
          <div class="st-row link" data-pg="general/about" role="button"><i style="background:#8e8e93">💻</i><div class="grow">About</div>${chev}</div>
          <div class="st-row link" data-pg="general/update" role="button"><i style="background:#8e8e93">⚙️</i><div class="grow">Software Update</div>${chev}</div>
          <div class="st-row link" data-pg="general/storage" role="button"><i style="background:#8e8e93">💽</i><div class="grow">Storage</div>${chev}</div>
        </div>`;
    } else if (sub === "about") {
      html = `<div class="st-hero"><div style="font-size:64px">💻</div><h2>MacBook Air</h2><small>${esc(S.first)}'s, 2026</small></div>
        <div class="st-group">${row("Name", `<span class="val">${esc(S.name)}</span>`)}${row("Chip", `<span class="val">Curiosity M∞</span>`)}${row("Memory", `<span class="val">8 GB of chai</span>`)}${row("Serial number", `<span class="val">AR-${new Date().getFullYear()}-0001</span>`)}${row("macOS", `<span class="val">${esc(S.first)}OS 26 Tahoe</span>`)}</div>`;
    } else if (sub === "update") {
      html = `<div class="st-group">${row(`<b>${esc(S.first)}OS 26.1</b><small>Your Mac is up to date. Still learning something new every day.</small>`, `<span style="color:#30d158">${UI.check.replace("<svg", '<svg width="20" height="20"')}</span>`)}${row("Automatic updates", `<span class="val">Daily</span>`)}</div>`;
    } else if (sub === "storage") {
      const parts = [["Projects", 34, "#0a84ff"], ["Hackathons", 18, "#ff9f0a"], ["Memes", 12, "#ff375f"], ["Music", 9, "#bf5af2"], ["System Data", 8, "#8e8e93"]];
      html = `<div class="st-group"><div class="st-row" style="display:block"><b>Macintosh HD</b><small>${100 - parts.reduce((n, p) => n + p[1], 0)} GB of 100 GB available</small>
        <div class="storage-bar">${parts.map((p) => `<div style="width:${p[1]}%;background:${p[2]}"></div>`).join("")}</div>
        <div class="legend">${parts.map((p) => `<span style="--c:${p[2]}">${p[0]}</span>`).join("")}</div></div></div>`;
    } else if (main === "appearance") {
      html = `<div class="st-group"><div class="st-row" style="display:block"><b>Appearance</b><div class="appear">
          ${[["light", "Light", "linear-gradient(135deg,#f5f5f7 50%,#d9d9de 50%)"], ["dark", "Dark", "linear-gradient(135deg,#3a3a3c 50%,#1c1c1e 50%)"], ["auto", "Auto", "linear-gradient(90deg,#f5f5f7 50%,#1c1c1e 50%)"]]
            .map(([k, n, bg]) => `<button data-th="${k}" class="${prefs.theme === k ? "active" : ""}"><div class="sw" style="background:${bg}"></div>${n}</button>`).join("")}
        </div></div>
        <div class="st-row"><div class="grow">Accent colour</div><div class="accents">${ACCENTS.map((a) => `<span data-accent="${a}" class="${prefs.accent === a ? "active" : ""}" style="background:${a}" role="button"></span>`).join("")}</div></div></div>`;
    } else if (main === "wallpaper") {
      html = `<div class="st-group"><div class="wp-grid">${WALLPAPERS.map((x) => `<button data-wp="${x.id}" class="${prefs.wallpaper === x.id ? "active" : ""}" style="background:${x.css}" title="${x.name}" aria-label="${x.name}"></button>`).join("")}</div></div>`;
    } else if (main === "displays") {
      html = `<div class="st-hero"><div style="font-size:54px">🖥️</div><h2>Built-in Display</h2><small>13.6-inch (2560 × 1664)</small></div>
        <div class="st-group">${row("Brightness", `<input type="range" min="0.35" max="1" step="0.01" value="${prefs.brightness}" data-bright style="width:200px">`)}${row("True Tone", `<div class="switch on"></div>`)}</div>`;
    } else if (main === "battery") {
      html = `<div class="st-group">${row("Battery level", `<span class="val">${Math.round(battery.level * 100)}%</span>`)}${row("Social battery", `<span class="val">depends who's asking</span>`)}${row("Recharges with", `<span class="val">naps, music, long walks</span>`)}</div>`;
    }
    c.innerHTML = html;
    setRoute(w, pg === "general" ? undefined : pg);
  }

  /* ---------------- Finder ---------------- */
  const appFile = (id) => ({ name: APPS[id].name, kind: "Application", ico: () => icon(id), open: () => openApp(id) });
  const noteFile = (n) => ({ name: n.id + ".md", kind: "Markdown document", ico: () => icon("note"), open: () => openApp("notes", n.id) });
  const readmeFile = { name: "read-me.txt", kind: "Plain Text", ico: () => icon("txt"), open: () => openApp("textedit") };
  const photoFile = (p, i) => ({ name: `IMG_${String(1000 + i)}.jpg`, kind: "JPEG image", thumb: photoBg(p), open: () => { openApp("photos"); const w = wins.photos; w.state.view = "library"; w.state.draw(); photoLightbox(w, i); } });
  const FOLDERS = {
    recents: { name: "Recents", ico: UI.clock, items: () => [readmeFile, ...NOTES.slice(0, 4).map(noteFile)] },
    applications: { name: "Applications", ico: UI.apps, items: () => Object.keys(APPS).filter((a) => !["about", "finder"].includes(a)).map(appFile) },
    desktop: { name: "Desktop", ico: UI.desktop, items: () => [readmeFile] },
    documents: { name: "Documents", ico: UI.doc, items: () => NOTES.map(noteFile) },
    downloads: { name: "Downloads", ico: UI.download, items: () => [] },
    pictures: { name: "Pictures", ico: UI.image, items: () => PHOTOS.map(photoFile) },
    portfolio: { name: "Portfolio", tag: "#ff453a", items: () => NOTES.filter((n) => ["experience", "hackathons", "community"].includes(n.id)).map(noteFile) },
    important: { name: "Important", tag: "#ff9f0a", items: () => NOTES.filter((n) => ["about-me", "hit-me-up"].includes(n.id)).map(noteFile) },
    ideas: { name: "Ideas", tag: "#bf5af2", items: () => NOTES.filter((n) => ["writing", "how-i-think"].includes(n.id)).map(noteFile) },
    icloud: { name: "iCloud Drive", ico: UI.icloud, items: () => [readmeFile, ...NOTES.map(noteFile)] },
    home: { name: S.username, ico: UI.house, items: () => ["applications", "desktop", "documents", "downloads", "pictures"].map((f) => ({ name: FOLDERS[f].name, kind: "Folder", ico: () => icon("folder"), open: "folder:" + f })) },
    airdrop: { name: "AirDrop", ico: UI.airdrop, items: () => [], empty: "AirDrop lets you share instantly with people nearby." },
    bin: { name: "Bin", ico: UI.trash, items: () => [] },
  };
  APPS.finder.render = (w, arg) => {
    const side = (key) => { const f = FOLDERS[key]; return `<div class="side-item" data-folder="${key}" role="button"><span class="ico">${f.tag ? `<span class="tag" style="background:${f.tag}"></span>` : f.ico.replace("<svg", '<svg width="15" height="15"')}</span>${esc(f.name)}</div>`; };
    w.body.innerHTML = `
      <aside class="fd-side scroll" data-drag>${TRAFFIC}<div style="height:8px"></div>
        ${side("recents")}<div class="side-item" role="button" style="opacity:.6"><span class="ico">${UI.share.replace("<svg", '<svg width="15" height="15"')}</span>Shared</div>
        <div class="side-label">Favourites</div>${["applications", "desktop", "documents", "downloads", "pictures"].map(side).join("")}
        <div class="side-label">Tags</div>${["portfolio", "important", "ideas"].map(side).join("")}
        <div class="side-label">Locations</div>${["icloud", "home", "airdrop", "bin"].map(side).join("")}
      </aside>
      <section class="fd-main">
        <div class="fd-bar" data-drag>
          <button class="icon-btn" data-nav="-1" aria-label="Back">${UI.back}</button><button class="icon-btn" data-nav="1" aria-label="Forward">${UI.fwd}</button>
          <div class="title"></div>
          <div class="seg"><button data-mode="icon" aria-label="Icon view">${UI.grid}</button><button data-mode="list" aria-label="List view">${UI.list}</button><button data-mode="icon" aria-label="Column view">${UI.columns}</button><button data-mode="icon" aria-label="Gallery view">${UI.gallery}</button></div>
          <label class="search" style="width:150px;height:28px">${UI.search}<input placeholder="Search" aria-label="Search"></label>
        </div>
        <div class="fd-content scroll"></div>
        <div class="fd-status"></div>
      </section>`;
    w.state.hist = []; w.state.hp = -1; w.state.mode = "icon"; w.state.q = "";
    $(".fd-bar input", w.body).addEventListener("input", (e) => { w.state.q = e.target.value.toLowerCase(); fdDraw(w); });
    w.body.addEventListener("click", (e) => {
      const f = e.target.closest("[data-folder]");
      if (f) return fdGo(w, f.dataset.folder);
      const nav = e.target.closest("[data-nav]");
      if (nav) { const np = w.state.hp + +nav.dataset.nav; if (w.state.hist[np]) { w.state.hp = np; fdDraw(w); } return; }
      const m = e.target.closest("[data-mode]");
      if (m) { w.state.mode = m.dataset.mode; return fdDraw(w); }
      const it = e.target.closest("[data-item]");
      $$("[data-item]", w.body).forEach((x) => x.classList.toggle("selected", x === it));
      if (it && isMobile()) fdOpen(w, +it.dataset.item);
    });
    w.body.addEventListener("dblclick", (e) => { const it = e.target.closest("[data-item]"); if (it) fdOpen(w, +it.dataset.item); });
    fdGo(w, arg || "recents");
  };
  APPS.finder.open = (w, arg) => fdGo(w, arg);
  function fdGo(w, key) {
    if (!FOLDERS[key]) key = "recents";
    w.state.hist = w.state.hist.slice(0, w.state.hp + 1);
    w.state.hist.push(key); w.state.hp++;
    fdDraw(w);
  }
  function fdOpen(w, i) {
    const it = w.state.items[i];
    if (typeof it.open === "string") fdGo(w, it.open.slice(7)); else it.open();
  }
  function fdDraw(w) {
    const key = w.state.hist[w.state.hp], F = FOLDERS[key];
    $$("[data-folder]", w.body).forEach((x) => x.classList.toggle("active", x.dataset.folder === key));
    $$("[data-mode]", w.body).forEach((x, i) => x.classList.toggle("active", (w.state.mode === "list" ? 1 : 0) === i));
    $(".fd-bar .title", w.body).textContent = F.name;
    $('[data-nav="-1"]', w.body).style.opacity = w.state.hp > 0 ? 1 : 0.35;
    $('[data-nav="1"]', w.body).style.opacity = w.state.hp < w.state.hist.length - 1 ? 1 : 0.35;
    const items = (w.state.items = F.items().filter((x) => !w.state.q || x.name.toLowerCase().includes(w.state.q)));
    const ico = (x) => x.thumb ? `<div class="thumb" style="background:${x.thumb}"></div>` : x.ico();
    const c = $(".fd-content", w.body);
    if (!items.length) c.innerHTML = `<div class="empty">${F.empty || (w.state.q ? "No results" : "This folder is empty.")}</div>`;
    else if (w.state.mode === "list") c.innerHTML = `<table class="fd-list"><thead><tr><th>Name</th><th>Kind</th></tr></thead><tbody>${items.map((x, i) => `<tr data-item="${i}"><td><div class="nm"><div class="img">${ico(x)}</div>${esc(x.name)}</div></td><td>${esc(x.kind)}</td></tr>`).join("")}</tbody></table>`;
    else c.innerHTML = `<div class="fd-grid">${items.map((x, i) => `<div class="fd-file" data-item="${i}" role="button"><div class="img">${ico(x)}</div><span>${esc(x.name)}</span></div>`).join("")}</div>`;
    $(".fd-status", w.body).textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
    setRoute(w, key);
  }

  /* ---------------- TextEdit / About ---------------- */
  APPS.textedit.render = (w) => {
    w.body.innerHTML = `<div class="te-head" data-drag>${TRAFFIC}<div class="t">read-me.txt</div></div><textarea spellcheck="false" aria-label="read-me.txt">${esc(S.readme)}</textarea>`;
  };
  APPS.about.render = (w) => {
    w.body.innerHTML = `<div class="te-head" data-drag>${TRAFFIC}</div>
      ${avatar(110).replace('class="avatar"', 'class="avatar logo"')}
      <h2>MacBook Air</h2><div class="sub">${esc(S.first)}'s, 2026</div>
      <dl><dt>Chip</dt><dd>Curiosity M∞</dd><dt>Memory</dt><dd>8 GB of chai</dd><dt>Startup disk</dt><dd>side projects</dd><dt>Serial number</dt><dd>AR-${new Date().getFullYear()}-0001</dd><dt>macOS</dt><dd>${esc(S.first)}OS 26 Tahoe</dd></dl>
      <button class="btn" data-more>More Info…</button>`;
    $("[data-more]", w.body).addEventListener("click", () => openApp("settings", "general/about"));
  };

  /* ================= routing & boot ================= */
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    let [id, ...rest] = parts;
    const sub = rest.join("/") || undefined;
    const alias = { iterm: "terminal", trash: "finder", bin: "finder" };
    if (alias[id]) { if (id !== "iterm") return openApp("finder", "bin"); id = alias[id]; }
    if (!id || !APPS[id]) return openApp("notes", "about-me");
    if (id !== "notes" && !wins.notes) openApp("notes", "about-me");
    openApp(id, sub);
  }
  addEventListener("hashchange", route);
  addEventListener("resize", () => { for (const w of Object.values(wins)) if (w.prev) { w.el.style.width = innerWidth + "px"; w.el.style.height = innerHeight - 112 + "px"; } });

  renderMenubar();
  applyPrefs();
  renderDock();
  renderDesktop();
  navigator.getBattery?.().then((b) => {
    const upd = () => { battery = { level: b.level, charging: b.charging }; renderMenubarRight(); };
    upd(); b.addEventListener("levelchange", upd); b.addEventListener("chargingchange", upd);
  }).catch(() => {});
  route();
})();
