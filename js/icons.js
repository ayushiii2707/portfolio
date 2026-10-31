/* App icons: the real macOS app icons live in assets/icons; small file icons are inline SVG. */
(function () {
  // app icons shown in the dock, finder and spotlight
  window.ICONS = {
    finder: `<img class="app-ico" src="assets/icons/finder.png" alt="" draggable="false">`,
    notes: `<img class="app-ico" src="assets/icons/notes.png" alt="" draggable="false">`,
    chatgpt: `<img class="app-ico" src="assets/icons/chatgpt.png" alt="" draggable="false">`,
    messages: `<img class="app-ico" src="assets/icons/messages.png" alt="" draggable="false">`,
    photos: `<img class="app-ico" src="assets/icons/photos.png" alt="" draggable="false">`,
    photobooth: `<img class="app-ico" src="assets/icons/photobooth.png" alt="" draggable="false">`,
    music: `<img class="app-ico" src="assets/icons/music.png" alt="" draggable="false">`,
    terminal: `<img class="app-ico" src="assets/icons/terminal.png" alt="" draggable="false">`,
    settings: `<img class="app-ico" src="assets/icons/settings.png" alt="" draggable="false">`,
    trash: `<img class="app-ico" src="assets/icons/trash.png" alt="" draggable="false">`,
    textedit: `<img class="app-ico" src="assets/icons/textedit.png" alt="" draggable="false">`,
    weather: `<img class="app-ico" src="assets/icons/weather.png" alt="" draggable="false">`,
    folder: `<img class="app-ico" src="assets/icons/folder.png" alt="" draggable="false">`,
    x: `<img class="app-ico" src="assets/icons/x.png" alt="" draggable="false">`,
    linkedin: `<img class="app-ico" src="assets/icons/linkedin.png" alt="" draggable="false">`,
    txt:
      `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M22 6 H62 L82 26 V94 H22Z" fill="#fff" stroke="#cfcfcf"/><path d="M62 6 V26 H82" fill="#e9e9e9" stroke="#cfcfcf"/><text x="52" y="72" font-family="Helvetica, Arial" font-weight="700" font-size="16" text-anchor="middle" fill="#8a8a8a">TXT</text></svg>`,
    note:
      `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M22 6 H62 L82 26 V94 H22Z" fill="#fffbe6" stroke="#e8d68a"/><path d="M62 6 V26 H82" fill="#f6e7a6" stroke="#e8d68a"/>${[44, 56, 68, 80].map((y) => `<line x1="30" y1="${y}" x2="74" y2="${y}" stroke="#e2cf7a" stroke-width="3"/>`).join("")}</svg>`,
    apple:
      `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 7.2c-1-.9-2.3-1.2-3.6-.9C5.6 7 4.3 9.8 4.8 13.1c.5 3.4 2.6 7.4 5 7.4.8 0 1.3-.4 2.2-.4s1.4.4 2.2.4c2.4 0 4.5-4 5-7.4.5-3.3-.8-6.1-3.6-6.8-1.3-.3-2.6 0-3.6.9z"/><path fill="currentColor" d="M12.4 6.4c.2-1.9 1.4-3.3 3.3-3.7-.1 1.9-1.4 3.4-3.3 3.7z"/></svg>`,
  };
})();
