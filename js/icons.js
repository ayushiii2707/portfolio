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
      `<svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>`,
  };
})();
