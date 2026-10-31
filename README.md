# ayushiranjan.in

A tiny fake Mac in the browser. Plain HTML/CSS/JS with no build step.

## Edit your content
Everything personal is in **`js/data.js`**: name, socials, notes, message threads, ChatGPT answers, X posts, LinkedIn, photos and music. Replace anything in `[square brackets]`.

- Profile photo: `assets/avatar.jpg` (square). If it's missing, initials show instead.
- Photos: put images in `assets/photos/` and set `src` in `PHOTOS`.
- Note header image: set `image` on a note.
- Music: add `src: "assets/music/x.mp3"` to a song for real playback. Without it, playback is simulated.

## Run locally
```
python3 -m http.server 5173
```
Then open http://localhost:5173

## Deploy
Upload the folder to any static host (Vercel, Netlify, Cloudflare Pages or GitHub Pages) and point `ayushiranjan.in` at it. Routes are hash-based (`/#/notes/about-me`), so no rewrite rules are needed.
