/* ============================================================
   EVERYTHING PERSONAL LIVES IN THIS FILE.
   Edit the text below, drop images into /assets, and the whole
   desktop updates. Anything in [square brackets] is a placeholder.
   ============================================================ */

window.SITE = {
  name: "Ayushi Ranjan",
  first: "ayushi",
  username: "ayushiranjan",            // used in terminal prompt + finder
  machine: "Ayushis-MacBook-Air",
  domain: "ayushiranjan.in",
  avatar: "assets/avatar.jpg",         // square photo; falls back to initials
  banner: "",                          // optional: assets/banner.jpg for X / LinkedIn
  weather: "31°C",
  location: "Mumbai, Maharashtra, India",
  email: "ayushir2707@gmail.com",
  socials: {
    x: { handle: "ayushihihi7", url: "https://x.com/ayushihihi7" },
    linkedin: { handle: "ayushi-ranjan-4667bb299", url: "https://www.linkedin.com/in/ayushi-ranjan-4667bb299/" },
    github: { handle: "ayushiii2707", url: "https://github.com/ayushiii2707" },
  },
  readme:
`hey, you found the read-me.

this whole site is a tiny fake mac. everything is clickable:

  • notes        → who i am, what i've done, how i think
  • messages     → some very real conversations
  • chatgpt      → ask it anything about me
  • x / linkedin → the professional-ish version
  • photos       → bits of my life
  • photo booth  → say hi (camera stays on your device)
  • music        → what i'm listening to
  • terminal     → type 'help'
  • settings     → change the wallpaper, go light mode

tip: ⌘/ctrl + space opens spotlight.

— ${"ayushi"}`,
};

/* ---------------- NOTES ----------------
   section: Pinned | Today | Previous 7 Days | Previous 30 Days | Older
   body: mini-markdown → paragraphs, "## heading", "- list", **bold**,
         [text](note:id) links to other notes, [text](https://…) external links
*/
window.NOTES = [
  {
    id: "about-me", emoji: "👋", title: "about me", section: "Pinned",
    date: "2026-07-01T12:46",
    image: "assets/photos/about-me.jpg", imageCaption: "ayushi",
    body:
`hi, i'm ayushi. 21, an engineering student. you can find my career on my linkedin or x — here's a more personal way to introduce myself, in three parts: mind, body, soul.

## mind
i spend a lot of time in my head — turning over questions and problems, reading about random things, trying to connect dots between topics that don't obviously go together. i don't know everything, far from it. what i think i've picked up is the skill of learning itself: figuring things out and getting up to speed fast.

## body
trying to become a healthier version of myself. i play a decent level of badminton and basketball, and i love to swim. slowly working on being consistent with the gym and eating cleaner. i also like going on walks and just observing the smaller things around me — ants, cats, dogs, birds, people, the road.

## soul
still figuring out what spirituality means for me — what consciousness actually is, how to be at peace, how to keep a calm mind. mostly i want to be kind, and to give back some of the love i've been lucky enough to receive.

---

## where to go next
if you want more: [💼 experience](note:experience), [🤝 community](note:community), [🏆 hackathons & wins](note:hackathons), and the writing side — [✍️ writing / distribution](note:writing).

if you want to know how i actually think about all this, read [🧠 how i think](note:how-i-think). if you'd rather just talk, [💬 hit me up](note:hit-me-up).

---

elsewhere: [X @ayushihihi7](https://x.com/ayushihihi7) · [LinkedIn ayushi-ranjan-4667bb299](https://www.linkedin.com/in/ayushi-ranjan-4667bb299/) · [GitHub ayushiii2707](https://github.com/ayushiii2707) · [Gmail ayushir2707@gmail.com](mailto:ayushir2707@gmail.com).`
  },
  {
    id: "experience", emoji: "💼", title: "experience", section: "Today",
    date: "2026-07-21T10:12",
    body:
`the roles i've actually held — the companies, and the community work at college. mostly internships and student stuff, but real work.

---

## MDM Summer Intern · Reliance Retail
May 2026 → Aug 2026

- built an enterprise RAG system from scratch, so people could search 10,000+ internal documents by meaning instead of guessing the right keywords
- owned the whole document pipeline — ingesting files, cleaning and chunking them, generating embeddings, and indexing everything in FAISS
- put it behind FastAPI and PostgreSQL retrieval services so answers come back with the right context attached, and hold up at scale
- my first real look at how much work sits between "the model can answer this" and something a company can actually rely on

## Data Analyst Intern · Fynd (Reliance Company)
May 2025 → Jun 2025

- built a GenAI text-to-SQL tool — ask a question in plain english, get a working query back across 20+ relational tables
- most of the job was the unglamorous part: backend workflows, a lot of prompt engineering, and checks that catch a bad query before it runs
- got generated queries to be reliable more than 85% of the time
- came out understanding that the prompt is only half of it — validation is what makes it usable

## Technical Team Member · Datazen, SVU Council
third year of college

- built and shipped responsive web apps for the community in React, FastAPI, and PostgreSQL
- cared a lot about making them fast and nice to use, not just working
- made the websites and promo material for our events

- the full story is in [🤝 community](note:community)
- the full, boring version lives on [linkedin](https://www.linkedin.com/in/ayushi-ranjan-4667bb299/).`
  },
  {
    id: "community", emoji: "🤝", title: "community", section: "Today",
    date: "2026-06-26T18:30",
    body:
`**Datazen — the college community I helped build and run, and, in many ways, the community that helped me grow, too**. easily the thing that changed me the most, even if it looks small on paper.

![Datazen team](assets/photos/datazen-1.jpg)

---

## how i got in — the technical side
i joined Datazen in my third year, as part of the Technical Committee. This was a conscious choice. I hadn't joined in my second year because I didn't want everything I did in college to revolve around academics. I wanted to explore other things, be part of dance events, sports events, experience different aspects of college life, and I genuinely enjoyed organising events and developing an eye for what makes them better.

So, during that year, I spent time making websites and promotional material for our events, while also learning and experimenting with a few other tools. That's really where I learnt to design and, more importantly, how to actually work on something with a team.

## what we did over the tenure
- ran 6–7 events across the year, including some big hackathons
- collaborated with a few companies and labs
- secured around 3x the sponsorship of any previous tenure
- ran real sessions, workshops, and seminars — and kept asking the community what we could do better

![Datazen team at an event](assets/photos/datazen-2.jpg)

---

## why it mattered to me
i know a lot of people don't count college communities as much. but before this i was genuinely underconfident and had basically never spoken in public. so, small as it is, this role gave me a lot.

a rough list of what it actually taught me:

- speaking publicly, and not freezing on the spot
- talking to people and actually interacting with them
- breaking down and solving real problems
- growing a community from close to nothing
- taking feedback — and then actually implementing it
- outreach
- handling outreach, and finding ways to bring more in
- dealing with college administration, conflict, and teamwork

all in all, it was really, really fun and i learnt a lot. i'm pretty sure i'm a different person because of it.

the role itself, with dates, is in [💼 experience](note:experience).`
  },
  {
    id: "hackathons", emoji: "🏆", title: "hackathons & wins", section: "Previous 7 Days",
    date: "2026-06-24T21:05",
    body:
`BRG Achieve Hackathon, TIAA

![BRG Achieve Hackathon, TIAA](assets/photos/brg-achieve.jpg)

## the hackathon that changed things
towards the end of my second year, a professor handed me an opportunity to represent our college at the **BRG Achieve Hackathon**, an annual hackathon organised by TIAA, a fintech company. i was asked to put together a curated team of four.

it was my first hackathon, and honestly, i had very little idea of what to expect. things went better than i anticipated, and we somehow managed to secure **first position in the Mumbai region and second across Maharashtra**.

that experience got me hooked on hackathons, and not long after, i started getting opportunities to participate in a few more. it also gave me a better understanding of how things work beyond college projects, especially when you're trying to build something with actual production use in mind.

but the honest part is, winning was never really the end goal. it's a sweet reminder of the perseverance the entire team showed, but the real fun was in the journey — the endless discussions around ideas, building prototypes, and figuring things out together!

the core team we built

![the core team we built](assets/photos/brg-core-team.jpg)

**other hackathons:**

Women Who Aspire (All India Women’s Hackathon)  - Semi Finalist

GDG Hackathon 2026 - Top 10 Teams`
  },
  {
    id: "writing", emoji: "✍️", title: "writing / distribution", section: "Previous 30 Days",
    date: "2026-06-20T09:40",
    body:
`a thing i keep coming back to: because of AI, the bar to actually make something has dropped through the floor. you don't need to be deeply technical anymore — the tools close most of that gap, and people who couldn't build before can build real things now.

so if building isn't the hard part anymore, the thing that actually stands out is distribution — how you take what you built and get it into people's hands. that's the part i find genuinely interesting, and the part i'm still very much figuring out.

---

## what i'm into now
i work in AI growth, and honestly i just love figuring things out. right now that mostly means automations — building actual technical solutions to see how far growth itself can be automated with AI.

![one of the n8n workflows](assets/photos/n8n-workflow.jpg)
### one of the n8n workflows

## questions i keep poking at
a lot of this is really just me being curious about people and attention. some of what's on my mind:

- how things spread
- how attention spans actually work
- how virality can be engineered
- how you'd reverse-engineer something that worked
- how the brain's reward centre works
- how dopamine pushes us to do things
- how we make decisions — and so on

## what actually works for me
not much, honestly, but a few things genuinely hold up:

- mostly just try to be honest and show up consistently
- pay attention to hooks — the first few words do most of the work
- read a lot of posts that did well and try to figure out why

---

personally, i've put out somewhere around 400–500 pieces of content — video, text, posts, carousels — and run 20–25 experiments. even after all of that, i'm honestly still figuring out what works and what doesn't.

and i'm okay with that. i'm not scared of failing — i think it's inevitable, and it's genuinely how i work out what actually lands and what doesn't. that's the kind of the techie i aspire to be`
  },
  {
    id: "how-i-think", emoji: "🧠", title: "how i think", section: "Previous 30 Days",
    date: "2026-06-12T23:18",
    body:
`i have failed multiple hackathons and competitions. (since the very first year of college.)

and all i could think at that time was: “how will i make it?”

funny thing is, i still don't fully know what “making it” even means for me.

but over the last 2 years, i've learnt a few things that genuinely changed how i see growth. not internships, not CGPA, not a roadmap, not some magical course. just a few principles.

---

## 1 · dimensions
you need dimensions as a person. not just code, not just academics, not just one identity.

- build things
- talk to people
- read random stuff
- understand business
- learn psychology
- try speaking publicly
- go to events
- explore ideas outside your field

most opportunities happen at intersections, and the people who stand out are usually not one-dimensional.

## 2 · people
talk to people. seriously. your world becomes very small when all your thoughts come from your own head.

some of the biggest mindset shifts in my life came from random conversations with:

- seniors
- founders
- creators
- people way smarter than me
- even people who completely disagreed with me

have mentors. ask questions. observe how ambitious people think. borrow perspectives before you build your own.

one good conversation can genuinely compress years of confusion.

## 3 · think
actually think. we scroll so much that we've almost forgotten how to sit with a thought.

- break problems down
- research deeply
- think from first principles
- think about why people behave the way they do
- think about why some things spread and others don't
- think about your own life too

what do you actually want? what kind of person do you want to become? what does success even mean for you? not society, not LinkedIn, not Twitter. you.

## 4 · taste / exposure
taste matters more than people think. expose yourself to exceptional work and your standards change automatically.

- watch great speakers
- study products people obsess over
- read well-written things
- notice storytelling
- notice design
- notice timing
- notice how the best builders move

good taste compounds. it changes how you build, how you communicate, what you tolerate, and what you aspire towards.

and in a world where everyone has access to tools, taste becomes leverage.

---

i still feel clueless half the time. but compared to the guy who thought his life was over because of an exam, i think i've at least moved forward.

still figuring it out, every single day.

if any of this resonates, [💬 hit me up](note:hit-me-up) — i just like talking to people.`
  },
  {
    id: "hit-me-up", emoji: "💬", title: "hit me up", section: "Older",
    date: "2026-05-30T16:00",
    body:
`i genuinely like talking to people — testing ideas, hearing takes i haven't heard. if you're building something, want to talk AI or growth, or just want to trade notes, i'm up for it.

---

## good reasons to reach out
- you're building something and want to bounce ideas
- you want to give some advice
- you want to have a coffee chat
- you want to give me an offer i can't refuse
- you want to tell me an interesting fact
- you just want to talk trends in AI, ML, or random internet stuff

## where to find me
DMs open on

- X [@ayushihihi7](https://x.com/ayushihihi7)
- LinkedIn [ayushi-ranjan-4667bb299](https://www.linkedin.com/in/ayushi-ranjan-4667bb299/)
- Gmail [ayushir2707@gmail.com](mailto:ayushir2707@gmail.com)

new here? start with [👋 about me](note:about-me).`
  },
];

/* ---------------- MESSAGES ---------------- */
window.CHATS = [
  {
    id: "mom", name: "Mom", pinned: true, unread: false, time: "11:58 AM", typing: "did you eat?",
    color: ["#f093fb", "#f5576c"],
    messages: [
      { from: "them", text: "beta did you eat" },
      { from: "me", text: "yes ma" },
      { from: "them", text: "what did you eat" },
      { from: "me", text: "...coffee" },
      { from: "them", text: "that is not food 😑" },
    ],
    replies: ["eat something first.", "call me when you're free ❤️", "your website is very nice. what is it?"],
  },
  {
    id: "bestie", name: "Best Friend", pinned: true, unread: true, time: "11:41 AM", typing: "are you alive",
    color: ["#4facfe", "#00f2fe"],
    messages: [
      { from: "them", text: "you've been building that website for 9 hours" },
      { from: "me", text: "it has a working terminal now" },
      { from: "them", text: "who is asking for a terminal" },
      { from: "me", text: "recruiters. probably." },
    ],
    replies: ["lmaooo", "ok it's actually cool", "touch grass pls 🌱"],
  },
  {
    id: "recruiter", name: "Future Recruiter", pinned: true, unread: true, time: "10:24 AM", typing: "are you free?",
    color: ["#43e97b", "#38f9d7"],
    messages: [
      { from: "them", text: "hi ayushi! loved your portfolio" },
      { from: "them", text: "is that a fake mac??" },
      { from: "me", text: "it is. try the photo booth" },
      { from: "them", text: "okay you're hired" },
    ],
    replies: ["sending the offer letter now", "when can you start?", "the music app is a nice touch"],
  },
  {
    id: "group", name: "Hackathon Team 🚀", unread: true, time: "9:02 AM",
    color: ["#fa709a", "#fee140"],
    messages: [
      { from: "them", text: "demo is in 20 min and the backend is down" },
      { from: "me", text: "it's not down. it's resting." },
      { from: "them", text: "AYUSHI" },
      { from: "me", text: "fixed. it was a missing comma." },
    ],
    replies: ["we WON 🏆", "who pushed to main", "never again (see you next weekend)"],
  },
  {
    id: "senior", name: "College Senior", time: "Yesterday",
    color: ["#a18cd1", "#fbc2eb"],
    messages: [
      { from: "me", text: "any advice for placements?" },
      { from: "them", text: "build things people can click on." },
      { from: "me", text: "say less" },
    ],
    replies: ["proud of you fr", "send me the link"],
  },
  {
    id: "past-me", name: "Me (2 years ago)", time: "Yesterday",
    color: ["#667eea", "#764ba2"],
    messages: [
      { from: "them", text: "will we ever figure it out" },
      { from: "me", text: "kind of. you'll like where we are." },
    ],
    replies: ["really??", "ok i trust you"],
  },
  {
    id: "future-me", name: "Me (2 years later)", unread: true, time: "10:58 AM", typing: "don't panic",
    color: ["#f6d365", "#fda085"],
    messages: [
      { from: "them", text: "hi it's you from 2028 👋" },
      { from: "me", text: "omg. did we figure it out??" },
      { from: "them", text: "kind of. we still have 15 tabs open though" },
      { from: "me", text: "and the overthinking?" },
      { from: "them", text: "still there. we just keep moving anyway. it works." },
      { from: "me", text: "any spoilers?" },
      { from: "them", text: "talk to more people. that's the whole spoiler." },
    ],
    replies: ["also please drink water", "can't say more, timeline rules 🤐", "you're doing better than you think"],
  },
  {
    id: "hp", name: "Harry Potter Marathon ⚡", time: "Yesterday",
    color: ["#7f1d1d", "#d4a017"],
    messages: [
      { from: "them", text: "movie night. which one" },
      { from: "me", text: "all of them" },
      { from: "them", text: "ayushi it's 11pm" },
      { from: "me", text: "then we start with prisoner of azkaban and see how far we get" },
      { from: "them", text: "fine but after that it's a horror movie" },
      { from: "me", text: "and then cards. obviously." },
    ],
    replies: ["bringing snacks 🍿", "the card game is getting competitive again isn't it", "we're never sleeping"],
  },
  {
    id: "court", name: "Badminton Gang 🏸", time: "Yesterday",
    color: ["#00b09b", "#96c93d"],
    messages: [
      { from: "them", text: "court booked for 7am" },
      { from: "me", text: "7AM??" },
      { from: "them", text: "you said you're working on being consistent" },
      { from: "me", text: "i said SLOWLY working on it" },
      { from: "them", text: "loser buys chai" },
      { from: "me", text: "ok now i'm awake. see you at 6:55" },
    ],
    replies: ["basketball after?", "you still owe me chai from last week", "rematch. now."],
  },
  {
    id: "dance", name: "Dance Floor Committee 💃", time: "Monday",
    color: ["#ff6a88", "#ff99ac"],
    messages: [
      { from: "them", text: "party tonight. are you coming" },
      { from: "me", text: "is there music" },
      { from: "them", text: "yes" },
      { from: "me", text: "then i'm already there" },
      { from: "them", text: "please don't take over the aux again" },
      { from: "me", text: "no promises" },
    ],
    replies: ["you danced for 3 hours straight last time", "ok fine you're on aux", "saving you a spot on the floor"],
  },
  {
    id: "datazen", name: "Datazen Core 🧠", time: "Monday",
    color: ["#4facfe", "#6a5af9"],
    messages: [
      { from: "them", text: "sponsor said yes!!!" },
      { from: "me", text: "WAIT. that's 3x last tenure" },
      { from: "them", text: "also the projector in the seminar hall died" },
      { from: "me", text: "i'll bring my laptop. and a backup laptop. and an hdmi" },
      { from: "them", text: "also first years want another ai session" },
      { from: "me", text: "say less. booking the room" },
    ],
    replies: ["who's making the poster", "website goes live tonight?", "best tenure ever fr"],
  },
  {
    id: "rabbit", name: "Rabbit Hole Hotline 🐇", time: "Sunday",
    color: ["#8e2de2", "#4a00e0"],
    messages: [
      { from: "me", text: "ok so i started reading about RAG" },
      { from: "me", text: "and now i know why octopuses have three hearts" },
      { from: "them", text: "how" },
      { from: "me", text: "honestly no idea. there were 40 tabs involved" },
      { from: "them", text: "what time is it" },
      { from: "me", text: "3am. dopamine is a fascinating chemical" },
    ],
    replies: ["close the tabs ayushi", "ok but tell me about the octopus", "this is the 4th time this week"],
  },
  {
    id: "gpt-me", name: "My Chatbot 🤖", time: "Sunday",
    color: ["#10a37f", "#0b6e55"],
    messages: [
      { from: "them", text: "a visitor asked me your favourite food" },
      { from: "me", text: "what did you say" },
      { from: "them", text: "that you never wrote it down, so i didn't make it up" },
      { from: "me", text: "good bot 🥹" },
      { from: "them", text: "can i at least say you like dancing" },
      { from: "me", text: "that one's allowed. it's very true" },
    ],
    replies: ["someone asked your hogwarts house. i panicked.", "i told them to email you", "i'm doing my best here"],
  },
  {
    id: "notes-self", name: "Notes to Self", time: "Tuesday",
    color: ["#30cfd0", "#330867"],
    messages: [
      { from: "me", text: "drink water" },
      { from: "me", text: "ship the thing" },
      { from: "me", text: "reply to the recruiter" },
    ],
    replies: ["(this is you talking to yourself again)"],
  },
];

/* ---------------- CHATGPT ----------------
   speaks as ayushi. everything is shown in lowercase.
   each entry: q = the question, alts = other ways people ask it,
   keys = strong words that point straight at this answer, a = the answer. */
window.ASK = {
  suggestions: ["who is ayushi?", "why should i hire you?", "tell me about your hackathons", "what's your ideal day?"],
  intro: "hey! it's ayushi — well, the ai version. ask me anything: work, hackathons, harry potter, life.",
  qa: [
    /* 👋 about ayushi */
    { q: "who is ayushi ranjan?", alts: ["who are you", "tell me about yourself", "introduce yourself", "about you", "who is she", "what do you do", "what are you studying", "what is your branch", "which degree", "how old are you", "what is your age", "intro"], keys: ["who", "yourself", "introduce", "introduction", "age", "old", "branch", "degree", "major", "studying"],
      a: "Hey! I'm Ayushi, 21, an engineering student pursuing Artificial Intelligence and Data Science. I'm curious about pretty much everything, enjoy building things, love meeting interesting people and spend a questionable amount of time going down random internet rabbit holes." },
    { q: "how would you describe yourself?", alts: ["describe yourself", "describe you in three words", "what kind of person are you", "your personality", "what are you like"], keys: ["describe", "personality", "words"],
      a: "Curious, slightly introspective and usually up for a conversation! I like exploring different things, connecting ideas and understanding how people think. I'm still figuring quite a few things out, but I think that's part of the fun." },
    { q: "are you an introvert or an extrovert?", alts: ["introvert", "extrovert", "are you shy", "ambivert", "are you social"], keys: ["introvert", "extrovert", "ambivert", "shy", "social"],
      a: "Depends on the day and the people! But I'm probably more of an extrovert. I love meeting people, hearing their stories, understanding their perspectives and occasionally having conversations that go on for hours." },
    { q: "what are your interests outside technology?", alts: ["hobbies", "what do you do for fun", "free time", "interests", "sports", "do you play any sport", "favourite movie", "favourite book", "do you like harry potter", "music taste", "what do you watch", "horror movies"], keys: ["hobby", "interest", "fun", "sport", "badminton", "basketball", "movie", "film", "book", "harry", "potter", "horror", "watch", "outside"],
      a: "Badminton, basketball, swimming and dancing! I also enjoy long walks, Harry Potter and horror movies, music and observing the little things around me. I'm quite interested in psychology, spirituality and understanding human behaviour, too." },
    { q: "what's your ideal day?", alts: ["perfect day", "ideal weekend", "dream day", "how do you spend a weekend", "favourite way to spend a day"], keys: ["ideal", "perfect", "weekend", "dream", "spotify"],
      a: "A swim, a Harry Potter movie, some badminton or basketball, a long walk and a little time building something interesting with Spotify playing in the background. Throw in a good conversation that eventually turns into a card game, and I'm happy!" },
    { q: "what makes you happy?", alts: ["happiness", "what brings you joy", "do you dance", "do you like dancing", "what do you love"], keys: ["happy", "happiness", "joy", "dance", "dancing", "love"],
      a: "Dancing! Put on some good music, get a bunch of people together and let me dance my heart out. Good conversations, swimming and little everyday moments come pretty close, too." },
    { q: "what's something you cannot stop doing?", alts: ["habit", "addicted to", "can't stop", "guilty pleasure", "rabbit holes", "what do you do too much"], keys: ["habit", "stop", "addicted", "rabbit", "guilty"],
      a: "Going down rabbit holes. I'll start researching one thing and somehow end up reading about five completely unrelated subjects. Curiosity has terrible time management, apparently." },
    { q: "what do you overthink the most?", alts: ["overthinking", "what keeps you up at night", "what worries you", "are you an overthinker", "fears", "what scares you"], keys: ["overthink", "overthinking", "overthinker", "worry", "worries", "night", "scare"],
      a: "Whether I'm on the right path, what I actually want to do with my life and whether I'll eventually make something of myself. The questions occasionally keep me up at night, but I've learnt to keep moving even without having all the answers." },

    /* 🎓 education & journey */
    { q: "tell me about your engineering journey.", alts: ["college journey", "how was college", "first year of college", "how did you get into tech", "your story", "journey"], keys: ["journey", "engineering", "story", "rough", "start"],
      a: "The first two years were honestly quite rough. I struggled to find my place in tech, often felt like an imposter and wasn't always sure whether what I was learning made sense. Things changed when I started building actual things, seeing them work and realising how much I enjoyed bringing ideas to life." },
    { q: "do you still experience imposter syndrome?", alts: ["imposter syndrome", "impostor", "do you feel like you don't belong", "self doubt", "confidence"], keys: ["imposter", "impostor", "doubt", "belong", "confidence", "confident"],
      a: "Oh, absolutely! Especially when I'm in rooms with people who have much greater technical depth than me. But I've learnt not to let that stop me. I'd rather learn from them and leave the room a little better than I entered it." },
    { q: "how has your perception of failure changed?", alts: ["view on failure", "what do you think about failing", "how do you deal with failure", "failure"], keys: ["failure", "perception", "failing", "fail"],
      a: "I used to take failure quite personally and associate it with my abilities. Now I see it more as feedback. Not everything will work, and that's fine. I'd much rather experiment, fail and figure things out than never try." },
    { q: "what's your current cgpa?", alts: ["gpa", "grades", "marks", "pointer", "sgpa", "academic score", "are you a topper"], keys: ["cgpa", "gpa", "sgpa", "grade", "marks", "pointer", "topper", "academic"],
      a: "My current CGPA is 8.5!" },
    { q: "how do you approach learning something new?", alts: ["how do you learn", "learning style", "how do you pick up new skills", "tutorials", "best way to learn"], keys: ["learn", "learning", "tutorial", "approach", "pick"],
      a: "I like understanding the fundamentals first and then getting my hands dirty. I'm not a big fan of endlessly consuming tutorials without actually building anything. Give me a problem to solve, and I'll probably learn ten things along the way." },

    /* 🤝 community & leadership */
    { q: "tell me about datazen.", alts: ["what is datazen", "college community", "college club", "community", "student community", "leadership"], keys: ["datazen", "community", "club", "society", "leadership", "council"],
      a: "Datazen is the college community I helped build and run, and easily one of the most transformative experiences of my college life. I joined its Technical Committee in my third year, and it taught me things no classroom could have." },
    { q: "what was your biggest contribution to datazen?", alts: ["what did you do at datazen", "what did you do in datazen", "your role in datazen", "contribution", "proud of in datazen", "events you organised", "sponsorship"], keys: ["contribution", "contribute", "sponsorship", "sponsor", "events", "organise", "organize", "proud"],
      a: "Apart from working on the technical and organisational side of events, one thing I'm particularly proud of is helping conduct hackathons and teaching first-year students the fundamentals of AI alongside my team. We also organised around 6–7 events and secured approximately 3x the sponsorship of previous tenures." },
    { q: "what did datazen teach you?", alts: ["what did you learn from datazen", "lessons from the community", "public speaking", "how did datazen change you"], keys: ["teach", "taught", "speaking", "public", "lessons"],
      a: "Quite a lot, actually! Public speaking, outreach, teamwork, handling disagreements and working with people. I went from being someone who was genuinely underconfident about speaking publicly to someone who actively enjoys interacting with people." },
    { q: "why did you join datazen in your third year?", alts: ["why join datazen", "why third year", "why not second year", "why did you join late"], keys: ["third", "join", "joined", "late", "second"],
      a: "I wanted to explore college beyond academics first! I spent my second year enjoying sports, dance events and other college activities. Eventually, I wanted to contribute to something more substantial, and Datazen felt like the right place." },

    /* 🏆 hackathons & achievements */
    { q: "tell me about your hackathon journey.", alts: ["tell me about the hackathons", "hackathons", "achievements", "what have you won", "awards", "wins", "competitions", "tiaa", "brg achieve", "gdg hackathon", "women who aspire"], keys: ["hackathon", "hackathons", "achievement", "achievements", "won", "win", "wins", "award", "awards", "tiaa", "brg", "gdg", "aspire", "competition", "prize"],
      a: "Hackathons have been quite an adventure! My first major one was the BRG Achieve Hackathon by TIAA, where my team secured first position in the Mumbai region and second across Maharashtra. I've also been a semifinalist at Women Who Aspire and part of the Top 10 teams at GDG Hackathon 2026." },
    { q: "what was your first hackathon experience like?", alts: ["first hackathon", "how did you start hackathons", "how did you get into hackathons"], keys: ["first"],
      a: "A little intimidating, honestly! A professor gave me the opportunity to represent my college, and I had to put together a team of four. We ended up doing much better than I expected, and that's pretty much how I got hooked on hackathons." },
    { q: "what do you enjoy most about hackathons?", alts: ["why do you like hackathons", "what do you love about hackathons", "favourite part of hackathons", "favourite thing about hackathons", "why hackathons", "best part of hackathons"], keys: ["enjoy"],
      a: "The chaos of building something with a bunch of people under a deadline! Brainstorming, debating ideas, figuring out what works and watching a prototype come together. Winning is lovely, but the process is what keeps me coming back." },
    { q: "how do you handle losing competitions?", alts: ["losing", "what if you lose", "dealing with losses", "have you lost hackathons", "rejection"], keys: ["lose", "losing", "lost", "loss", "losses", "rejection", "handle"],
      a: "I try to figure out what went wrong and what I could do better next time. Losing isn't particularly fun, obviously, but I don't want one unsuccessful attempt to become a reason to stop experimenting." },

    /* 💻 technology & ai */
    { q: "what are your technical skills?", alts: ["tech stack", "skills", "what languages do you know", "programming languages", "do you know python", "tools you use", "frameworks", "databases"], keys: ["skill", "skills", "stack", "language", "languages", "python", "sql", "fastapi", "pytorch", "langchain", "docker", "tools", "framework", "frameworks", "database", "databases", "c++", "technical"],
      a: "I work with Python, C++ and SQL, and have explored FastAPI, REST APIs, JWT authentication and Tailwind CSS. On the AI/ML side, I've worked with RAG, LangChain, spaCy, Scikit-learn and PyTorch, alongside PostgreSQL, MySQL, SQLite, SQLAlchemy, Git and Docker." },
    { q: "what interests you most about ai?", alts: ["why ai", "why artificial intelligence", "what excites you about ai", "thoughts on ai"], keys: ["ai", "artificial", "intelligence", "excites"],
      a: "How accessible it's making building things! I love that ideas which previously required considerable technical resources can now be turned into working products much more easily. I'm particularly interested in AI applications, automations and making these systems genuinely useful." },
    { q: "how do you use ai tools while coding?", alts: ["do you use chatgpt", "do you use cursor", "do you use claude", "vibe coding", "ai for coding", "copilot"], keys: ["coding", "chatgpt", "cursor", "claude", "copilot", "vibe", "code"],
      a: "As collaborators, not unquestionable authorities! I use them to explore concepts, debug and speed up implementation, but I make sure I understand the code, test it and verify the output. If I can't explain what I've built, I probably haven't understood it well enough." },
    { q: "what is your favourite area of technology?", alts: ["favourite tech", "favourite field", "backend or frontend", "llms", "what do you like building"], keys: ["area", "field", "backend", "frontend", "llm", "llms", "favourite", "favorite"],
      a: "AI, particularly the intersection of LLMs, automation and practical applications. I also enjoy backend development and understanding how all the pieces of an actual product fit together." },

    /* ✍️ ai growth & distribution */
    { q: "what are you currently working on professionally?", alts: ["what are you working on", "what are you working on right now", "what are you building right now", "what do you build", "current work", "current projects", "ai growth", "automation", "n8n"], keys: ["currently", "automation", "automations", "n8n", "building"],
      a: "I'm exploring AI-driven growth and automation. I particularly enjoy building technical solutions to understand how much of the traditional growth workflow can be automated using AI." },
    { q: "why are you interested in growth?", alts: ["why growth", "why marketing", "why not just engineering"], keys: ["growth", "marketing", "interested"],
      a: "Because it combines technology with human psychology! I'm fascinated by how people discover things, what captures their attention and why certain ideas spread while others don't. It's an interesting intersection of building and understanding people." },
    { q: "why do you think distribution is becoming more important?", alts: ["distribution", "why distribution", "building vs distribution"], keys: ["distribution", "distribute"],
      a: "AI has made building things significantly easier. But building something doesn't mean anyone will discover or use it. Getting the right product in front of the right people is an entirely different challenge, and that's what I find particularly interesting." },
    { q: "tell me about your content creation experience.", alts: ["content creation", "do you make content", "how much content", "are you a creator", "posts", "videos"], keys: ["content", "creator", "creation", "posts", "videos", "carousels", "experiments"],
      a: "I've put out around 400–500 pieces of content across videos, text posts and carousels, and experimented with approximately 20–25 different approaches. Still figuring out what works, though! Apparently, there's no shortcut to understanding the internet." },
    { q: "what have you learnt from content creation?", alts: ["content lessons", "how to go viral", "virality", "hooks", "tips for content"], keys: ["hooks", "hook", "viral", "virality", "tips", "learnt", "learned"],
      a: "Hooks matter, consistency matters, and studying what works is underrated. I like looking at successful posts and trying to reverse-engineer why people paid attention to them. But honestly, experimentation teaches me more than any fixed formula." },
    { q: "what fascinates you about human psychology?", alts: ["psychology", "human behaviour", "decision making", "how do people make decisions", "dopamine", "attention spans", "why people do things"], keys: ["psychology", "behaviour", "behavior", "dopamine", "attention", "human", "brain", "decision", "decisions"],
      a: "Why people do what they do! Attention, dopamine, decision-making, reward mechanisms and how people interact with information. I find it fascinating that seemingly small things can influence how we think and behave." },

    /* 🧠 how i think */
    { q: "what are the biggest lessons you've learnt?", alts: ["life lessons", "principles", "how do you think", "advice for students", "what would you advise", "biggest learnings"], keys: ["lessons", "lesson", "principles", "principle", "advice", "advise", "learnings", "think"],
      a: "Develop different dimensions, talk to people, think deeply and develop good taste. I think being technically good is important, but understanding business, psychology, communication and the world around you makes you a much better problem-solver." },
    { q: "why do you believe in developing multiple dimensions?", alts: ["dimensions", "why be multi dimensional", "generalist", "jack of all trades"], keys: ["dimensions", "dimension", "dimensional", "generalist", "multiple"],
      a: "Because the world doesn't operate in isolated disciplines. Some of the most interesting opportunities happen when you connect technology with business, psychology, creativity and other seemingly unrelated fields." },
    { q: "why do you enjoy talking to people so much?", alts: ["why talk to people", "networking", "why do you like people", "conversations with strangers"], keys: ["people", "networking", "strangers", "talking"],
      a: "Because everyone has a different story and a different way of looking at the world. Some of my biggest perspective shifts have come from random conversations with people I would otherwise never have met." },
    { q: "what's your definition of success?", alts: ["what is success", "what does success mean to you", "making it", "goals in life", "life goals"], keys: ["success", "successful", "goals", "goal"],
      a: "Still figuring that one out! I want to build things I'm proud of, become financially independent, maintain meaningful relationships and remain someone who's kind and grounded. I don't want to be so busy chasing success that I forget to actually enjoy life." },
    { q: "what's something you believe in strongly?", alts: ["beliefs", "philosophy", "what do you believe", "motto", "life philosophy"], keys: ["believe", "belief", "beliefs", "philosophy", "motto", "strongly"],
      a: "That you don't need to have everything figured out before you start. Talk to people, explore things, make mistakes and keep learning. Clarity often comes from doing, not endlessly planning." },
    { q: "are you afraid of failure?", alts: ["scared of failing", "fear of failure", "afraid to fail"], keys: ["afraid", "scared", "fear"],
      a: "Not particularly. Disappointed? Sure. But I'd rather try something and get it wrong than spend time wondering what might have happened if I'd tried." },
    { q: "what does spirituality mean to you?", alts: ["spirituality", "are you spiritual", "consciousness", "inner peace", "meditation", "religion"], keys: ["spirituality", "spiritual", "consciousness", "peace", "meditation", "meditate", "religion", "soul"],
      a: "I'm still exploring that! I'm interested in consciousness, inner peace and understanding how to maintain a calm mind. I don't have definitive answers, but I enjoy asking the questions." },

    /* 🌟 personal inspirations */
    { q: "who is your role model in ai?", alts: ["role model", "who inspires you", "inspiration", "idol", "who do you look up to", "jasine gazi"], keys: ["role", "model", "inspires", "inspiration", "idol", "jasine", "gazi", "inspired"],
      a: "Jasine Gazi! She's one of the reasons I started finding tech genuinely cool. Seeing someone pursue the field made it feel more approachable and gave me the motivation to think, \"If she can do it, maybe I can too.\"" },
    { q: "what would you tell your younger self?", alts: ["advice to younger self", "message to your past self", "if you could go back"], keys: ["younger", "past", "back"],
      a: "You don't need to understand everything to belong. Stop comparing your beginning to someone else's progress, build things, talk to people and give yourself room to figure things out. You'll get there, one way or another." },

    /* 💼 career & opportunities */
    { q: "why should someone hire you?", alts: ["why should i hire you", "why should we hire you", "why hire you", "why should we hire her", "what makes you a good fit", "what do you bring", "why you", "sell yourself", "make your case", "pitch yourself", "convince me", "why should i work with you", "are you a good fit"], keys: ["hire", "hiring", "fit", "bring", "recruit", "convince", "pitch", "sell"],
      a: "Fair question! Honest answer: I'm a 21-year-old student, so not the safe, obvious hire. But I've built real AI systems at Reliance Retail and Fynd, I'm comfortable figuring out unfamiliar problems, and hackathons + Datazen taught me how to actually work with a team.\n\nI won't claim to know everything, but I'm willing to learn, ask questions, experiment and put in the work. So if you're looking for someone who's early in their career and willing to put their head down and get work done, I'd be a great fit — and everything I claim, you can go check." },
    { q: "what are you looking for in an internship?", alts: ["looking for a job", "what roles are you looking for", "open to opportunities", "what kind of work do you want", "internship"], keys: ["looking", "internship", "opportunity", "opportunities", "roles", "role", "job"],
      a: "An opportunity to work on actual problems, learn from people who know their craft and contribute something meaningful. I'm particularly interested in AI, automation, data and practical engineering challenges." },
    { q: "are you currently working somewhere?", alts: ["are you employed", "where do you work", "current job", "are you working anywhere", "are you working anywhere right now", "currently interning", "do you have a job"], keys: ["employed", "somewhere", "anywhere", "work"],
      a: "Not at the moment! I'm currently pursuing my engineering degree, working on strengthening my technical skills and exploring opportunities where I can learn and contribute." },
    { q: "where do you see yourself in five years?", alts: ["five years", "5 years", "future plans", "long term goals", "what's next for you"], keys: ["five", "5", "future", "years", "plans", "next"],
      a: "Hopefully building interesting things, working with brilliant people and being considerably better at what I do! I don't have a rigid roadmap, but I know I want to keep learning, become financially independent and do work that genuinely interests me." },
    { q: "what's your biggest weakness?", alts: ["weakness", "weaknesses", "flaws", "what are you bad at", "areas of improvement"], keys: ["weakness", "weaknesses", "flaw", "flaws", "bad", "improve", "improvement"],
      a: "I can get carried away exploring too many things at once. Curiosity is great until you have 15 tabs open and forget what you were originally looking for! I'm learning to prioritise better." },

    /* 💬 let's talk */
    { q: "what kind of conversations do you enjoy?", alts: ["what can we talk about", "favourite topics", "what do you like talking about"], keys: ["conversations", "conversation", "topics", "topic"],
      a: "Almost anything that makes me think! AI, technology, psychology, business, random internet trends, sports or just understanding someone's life experiences. I'm particularly fond of conversations that take an unexpected turn." },
    { q: "are you open to coffee chats?", alts: ["coffee", "can we meet", "can we chat", "meet up", "grab coffee"], keys: ["coffee", "meet", "meetup", "chat"],
      a: "Absolutely! I'm always up for meeting interesting people, exchanging ideas and hearing about what they're building. No elaborate agenda required. Good coffee and a good conversation are enough." },
    { q: "what are good reasons to reach out to you?", alts: ["why should i reach out", "reasons to contact you", "when should i message you"], keys: ["reasons", "reason"],
      a: "You're building something, want to discuss AI or growth, have an interesting opportunity, want to share advice, know an interesting fact or simply want to talk. I'm pretty easy to convince when it comes to an interesting conversation." },
    { q: "how can someone connect with you?", alts: ["contact", "how do i contact you", "email", "your email", "linkedin", "twitter", "x handle", "github", "socials", "dm", "reach you", "phone number", "instagram"], keys: ["contact", "connect", "email", "mail", "linkedin", "twitter", "x", "github", "socials", "social", "dm", "dms", "reach", "instagram", "phone", "number"],
      a: "You can find me on LinkedIn, X or GitHub. You can also just email me at ayushir2707@gmail.com. My DMs are open!" },

    /* 💼 experience (from the experience note) */
    { q: "what internships have you done?", alts: ["experience", "work experience", "internships", "reliance", "fynd", "where have you interned", "past jobs", "previous work"], keys: ["internships", "interned", "experience", "reliance", "fynd", "mdm", "previous", "past"],
      a: "Two so far! This summer (May–Aug 2026) I was an MDM Summer Intern at Reliance Retail, building an enterprise RAG system that searches 10,000+ documents by meaning. Before that, I was a Data Analyst Intern at Fynd, where I built a GenAI text-to-SQL tool that works across 20+ tables. The full version is in the 💼 experience note." },
    { q: "what's your best project?", alts: ["best project", "favourite project", "proudest project", "your best work", "llm security project"], keys: ["best", "proudest", "leblanc", "cwe", "security", "vulnerability", "vulnerabilities", "benchmark"],
      a: "Probably LeBlanc, my capstone — we checked if security hints + scanner-guided fixes still make LLM code safer, and cut vulnerability rates by 14–22 points at $0. Deep dive: https://github.com/ayushiii2707/CWE-Aware-LLM-Code-Security-Repair", more: "Beyond LeBlanc there's Flourish (AI workplace wellness, built at the BRG hackathon), a hybrid RAG chatbot, HeatGuard (heatwave forecasts on Kubernetes) and EvidentAI, which is still cooking. All on https://github.com/ayushiii2707" },

    { q: "what did you build at the brg hackathon?", alts: ["what did you build at brg", "what did you make at the brg hackathon", "what did you build at the tiaa hackathon", "what did you make at tiaa", "what did you make at brg", "brg project", "tiaa project", "what was your hackathon project", "what did you build at your first hackathon", "flourish", "tell me about flourish", "what is flourish"], keys: ["flourish", "wellness", "burnout", "tea", "build"],
      a: "Flourish — an AI workplace wellness app with LLM stress check-ins, an ML burnout predictor, an energy-aware scheduler and a 'tone shield' for spicy emails. Code: https://github.com/ayushiii2707/Flourish · demo: https://tea-hack.vercel.app", more: "Under the hood: React + TypeScript on the front, FastAPI on the back, Groq-hosted Llama 3 for the language bits and an XGBoost + Random Forest + Gradient Boosting ensemble for burnout. It also has a safe-cab booking flow and an invisible-labour tracker for unpaid work at home." },
    { q: "what projects have you worked on?", alts: ["projects", "your projects", "her projects", "tell me about her projects", "what are her projects", "tell me about your projects", "tell me more about your projects", "what have you built", "what have you made", "show me your work", "what kind of stuff have you made", "side projects", "github projects", "what's on your github", "personal projects"], keys: ["project", "projects", "built", "work", "portfolio"],
      a: "They're all on GitHub (https://github.com/ayushiii2707)! LeBlanc is my capstone on making AI-written code safer, Flourish is the AI wellness app from the BRG hackathon, plus a hybrid RAG chatbot, HeatGuard and EvidentAI. Some are polished, some are very much learning projects — ask me about any of them.", more: "Quick tour: Flourish predicts burnout and rewrites spicy emails; the RAG chatbot mixes FAISS + BM25 with a reranker; HeatGuard forecasts heatwaves 7 days out from real IMD data; EvidentAI shows what changed between doc versions (still cooking). Honestly, a couple are learning projects more than polished products — and I'm happy to admit it." },
    { q: "any other projects?", alts: ["more projects", "other projects", "any other projects", "what else have you built", "what else have you made", "anything else you've built", "more of your work", "other stuff you've built"], keys: ["other", "else"],
      a: "Sure! Flourish (AI workplace wellness, from the BRG hackathon), a hybrid RAG chatbot with a 3D frontend, HeatGuard (7-day heatwave forecasts on Kubernetes) and EvidentAI, which is still cooking. The code for all of them is on https://github.com/ayushiii2707", more: "Quick tour: Flourish predicts burnout and rewrites spicy emails; the RAG chatbot mixes FAISS + BM25 with a reranker; HeatGuard forecasts heatwaves 7 days out from real IMD data; EvidentAI shows what changed between doc versions (still cooking). Honestly, a couple are learning projects more than polished products — and I'm happy to admit it." },
    { q: "tell me about heatguard", alts: ["heatguard", "heatwave project", "heatwave forecast", "cloud computing project", "weather project"], keys: ["heatguard", "heatwave", "weather", "forecast", "kubernetes", "cloud"],
      a: "HeatGuard forecasts max temperatures 7 days out for ten Indian cities using real IMD data, and flags heatwaves — all Dockerised and running on Kubernetes. Code: https://github.com/ayushiii2707/CC-Mini-Project---Heatwave-Forecast" },
    { q: "tell me about your rag chatbot", alts: ["hybrid rag chatbot", "rag chatbot", "chatbot project", "hybrid rag"], keys: ["chatbot", "hybrid", "bm25", "faiss"],
      a: "A hybrid RAG chatbot: FAISS + BM25 search, a cross-encoder reranker, guardrails against prompt injection — and a 3D Three.js frontend, because why not. Code: https://github.com/ayushiii2707/Hybrid-RAG-Chatbot" },
    { q: "what is evidentai?", alts: ["evidentai", "evident ai", "tell me about evidentai", "what are you building now on github", "newest project", "latest project"], keys: ["evidentai", "evident", "latest", "newest"],
      a: "My newest one, still cooking! EvidentAI digs through technical docs to show exactly what changed between versions — and what that change might break. Code: https://github.com/ayushiii2707/EvidentAI" },
    { q: "what's your final year project?", alts: ["final year project", "capstone project", "what is your capstone", "btech project", "major project", "fyp", "what's your last year project", "tell me about leblanc", "cwe aware project", "what are you researching", "research project"], keys: ["final", "capstone", "fyp", "btech", "major", "research"],
      a: "LeBlanc! A B.Tech capstone with three teammates, testing whether security scaffolding still makes today's LLMs write safer code — and how often 'fixed' code is secretly broken. Code: https://github.com/ayushiii2707/CWE-Aware-LLM-Code-Security-Repair", more: "The fun bit: it runs 6 LLMs (GPT-4o-mini, Gemini 2.5 Flash, Claude Haiku 4.5, DeepSeek and two GPT-OSS models) through a 2,700-run matrix, with an offline harness that fakes MySQL, LDAP and the network so 'fixed' code actually gets tested. It even ships as an MCP server coding agents can call." },
    /* casual & fun */
    { q: "are you a builder or a marketer?", alts: ["builder or marketer", "builder or designer", "engineer or marketer", "are you technical", "tech or growth", "coder or marketer"], keys: ["builder", "marketer", "designer", "technical", "engineer"],
      a: "A bit of both, and honestly I like it that way! I can build the thing — RAG systems, text-to-SQL, n8n automations — and I genuinely enjoy figuring out how to get it in front of people. Not an expert at either yet, but I'd rather be good at connecting the two than great at just one." },
    { q: "what makes you different?", alts: ["what's your strength", "what are you good at", "your superpower", "what sets you apart", "biggest strength", "strengths", "unique"], keys: ["different", "strength", "strengths", "superpower", "apart", "unique", "good"],
      a: "Probably that I'm comfortable on both sides — building the technical thing and thinking about how people will actually find and use it. I also pick things up fast and I'm not scared of looking silly while I learn. Honest caveat: I'm still early, so 'strength' here means promising, not proven." },
    { q: "are you good at coding?", alts: ["can you code", "how good are you at coding", "are you a good programmer", "do you code"], keys: ["programmer", "coder"],
      a: "I'm okay at it and getting better every week! Mostly Python, SQL and C++, with a lot of AI/ML and backend work. Right now I'm more 'figure it out and make it work' than 'deep systems expert' — but that's the plan." },
    { q: "what did you learn from hackathons?", alts: ["hackathon lessons", "what do hackathons teach you", "lessons from hackathons"], keys: [],
      a: "That winning was never really the point! It's the journey — the endless discussions around ideas, building prototypes at odd hours and figuring things out together. Also: your team matters a lot. Pick people you'd happily argue with at 3am." },
    { q: "can i see your resume?", alts: ["resume", "cv", "where's your cv", "do you have a resume", "send me your resume"], keys: ["resume", "cv", "résumé"],
      a: "It's not up on the site, but my LinkedIn has the full history! Or just email me at ayushir2707@gmail.com and I'll send it over." },
    { q: "what motivates you?", alts: ["what drives you", "motivation", "why do you do what you do", "what keeps you going"], keys: ["motivate", "motivates", "motivation", "drive", "drives"],
      a: "Seeing something I built actually work, honestly — that feeling never gets old. That, and conversations that change how I see things. And maybe a little bit of proving to my first-year self that she belonged in tech all along." },
    { q: "tell me a fun fact about you", alts: ["fun fact", "something interesting about you", "something people don't know about you", "random fact about you", "surprise me"], keys: ["fact", "surprise", "random"],
      a: "I can go from a Harry Potter movie straight into a horror movie and call it a balanced evening. Also, any good conversation with me has a decent chance of turning into a card game." },
    { q: "what's the meaning of life?", alts: ["meaning of life", "what is life", "purpose of life", "why are we here"], keys: ["meaning", "purpose", "life"],
      a: "Still figuring that one out! Current best guess: be kind, keep learning, give back some of the love you've been lucky enough to receive — and dance whenever there's good music." },
    { q: "you're boring", alts: ["you suck", "this is boring", "you're dumb", "bad bot", "you're useless", "stupid"], keys: ["boring", "suck", "dumb", "useless", "stupid"], small: true,
      a: "Fair, I'm still a work in progress 😅 Give me one more shot — ask me about hackathons, AI growth or my ideal day." },
    { q: "will you marry me?", alts: ["marry me", "will you go on a date with me", "i love you", "can i date you"], keys: ["marry", "date", "love"], small: true,
      a: "Haha, I'm flattered, but I'm just an AI living inside a tiny fake Mac. How about a question about my hackathons instead?" },

    /* small talk */
    { q: "hi", alts: ["hello", "hey", "hey there", "yo", "sup", "hii", "hiii", "good morning", "good evening", "namaste", "hola"], keys: ["hi", "hello", "hey", "yo", "sup", "hii", "hiii", "namaste", "hola", "morning", "evening"], small: true,
      a: "Hey! So glad you're here. Ask me anything — work, hackathons, Harry Potter, the meaning of life (results may vary)." },
    { q: "how are you?", alts: ["how are you doing", "how's it going", "what's up", "wassup", "how is your day"], keys: ["going", "wassup", "doing"], small: true,
      a: "Pretty good, honestly! Probably mid rabbit hole on something random. How about you?" },
    { q: "thanks", alts: ["thank you", "thx", "ty", "cool", "nice", "awesome", "great", "ok", "okay", "got it"], keys: ["thanks", "thank", "thx", "ty", "cool", "nice", "awesome", "great", "ok", "okay"], small: true,
      a: "Anytime! If you want to keep talking, the real me is just an email away — ayushir2707@gmail.com." },
    { q: "bye", alts: ["goodbye", "see you", "see ya", "gtg", "good night", "cya"], keys: ["bye", "goodbye", "cya", "gtg", "see", "night"], small: true,
      a: "Bye! This was fun. Go drink some water and come back anytime." },
    { q: "are you real?", alts: ["are you an ai", "is this chatgpt", "are you a bot", "is this actually ayushi", "are you human", "is this really you"], keys: ["real", "bot", "human", "really", "actually", "chatgpt"], small: true,
      a: "I'm the AI version of Ayushi, living inside this tiny fake Mac. The real one is probably playing badminton right now. For the human, email ayushir2707@gmail.com!" },
    { q: "who made this website?", alts: ["who built this site", "how did you make this website", "this website is cool", "is this a real mac", "portfolio"], keys: ["website", "site", "portfolio", "mac", "made"], small: true,
      a: "I did! It's a tiny fake Mac — almost everything is clickable. Try the terminal (type help), the photo booth, or change the wallpaper in Settings." },
    { q: "what can i ask you?", alts: ["what can you do", "help", "what should i ask", "suggest a question", "what do you know"], keys: ["ask", "help", "suggest", "know"], small: true,
      a: "Pretty much anything about me! My hackathons, Datazen, what I'm building in AI growth, how I think, my ideal day, or why you should hire me. Go wild." },
    { q: "tell me a joke", alts: ["joke", "make me laugh", "say something funny"], keys: ["joke", "laugh", "funny"], small: true,
      a: "I opened one tab to learn about RAG. Forty tabs later, I'm reading about why octopuses have three hearts. Curiosity has terrible time management, apparently." },
    { q: "tell me more", alts: ["more", "go on", "continue", "elaborate", "and", "tell me more about it", "more details", "go deeper", "explain more"], keys: ["more", "elaborate", "continue", "deeper", "detail", "details"], small: true,
      a: "Happy to! The Notes app has the long versions — 👋 about me, 🏆 hackathons & wins, 🧠 how i think, and more. Or ask me something specific." },
  ],
  // personal details that aren't written down anywhere: say so, never make them up
  unknown: {
    keys: ["food", "eat", "colour", "color", "pet", "pets", "house", "hogwarts", "zodiac", "sign", "height", "relationship", "boyfriend", "single", "crush", "hometown", "live", "city", "born", "birthday", "salary", "siblings", "family", "school", "song", "singer", "artist", "anime", "show", "series", "game", "drink", "tea"],
    a: "Ooh, I haven't written that one down anywhere, so I'd rather not make it up! Ask the real me — ayushir2707@gmail.com — or ask about my hackathons, AI growth, or how I think.",
  },
  fallback: "Hmm, I don't have a good answer for that one in my notes, and I'd rather not make something up! Try asking about my hackathons, Datazen, AI growth, or how I think — or just email me at ayushir2707@gmail.com.",
};

/* ---------------- X PROFILE ---------------- */
window.XPROFILE = {
  bio: "21 · AI & data science @ KJSSE · building in AI growth & automations · hackathons, rabbit holes & good conversations",
  joined: "Joined March 2023",
  following: 183, followers: 74,
  posts: [
    { pinned: true, date: "May 28", text: "hi! i'm ayushi 👋\n\n21, AI & data science student. building in AI growth + automations, chasing hackathons, and always up for a good conversation.", replies: 4, reposts: 2, likes: 38, views: "1.2K" },
    { date: "May 20", text: "made my portfolio a fake mac. there's a terminal. type 'help'.", replies: 12, reposts: 6, likes: 120, views: "4.8K" },
    { date: "May 12", text: "lost another hackathon. learned more than the last win. back next weekend.", replies: 3, reposts: 1, likes: 41, views: "980" },
    { date: "Apr 30", text: "the best way to learn something is to ship something embarrassing with it.", replies: 2, reposts: 4, likes: 57, views: "1.6K" },
  ],
};

/* ---------------- LINKEDIN ---------------- */
window.LINKEDIN = {
  headline: "AI & Data Science @ KJSSE | AI Growth | RAG & GenAI | Ex-Reliance Retail, Ex-Fynd",
  connections: "500+ connections", followers: "1,000 followers",
  current: { company: "Reliance Retail", school: "KJSSE, Somaiya Vidyavihar University" },
  about: "Hi, I'm Ayushi — 21, an engineering student working in AI growth. I build RAG and GenAI systems, and I'm most interested in automations and distribution: how far growth itself can be automated with AI.",
  experience: [
    { role: "MDM Summer Intern", company: "Reliance Retail", dates: "May 2026 – Aug 2026", place: "Internship", desc: "Built an enterprise RAG system for semantic search across 10,000+ internal documents — ingestion, chunking, embeddings, FAISS indexing, and FastAPI + PostgreSQL retrieval services." },
    { role: "Data Analyst Intern", company: "Fynd (Reliance Company)", dates: "May 2025 – Jun 2025", place: "Internship", desc: "Built a GenAI text-to-SQL tool across 20+ relational tables, with prompt engineering and query validation that got generation reliability above 85%." },
    { role: "Technical Team Member", company: "Datazen, SVU Council", dates: "Third year", place: "College community", desc: "Built responsive web apps in React, FastAPI and PostgreSQL, plus the websites and promo material for our events." },
  ],
  education: [{ school: "K. J. Somaiya School of Engineering (KJSSE), Somaiya Vidyavihar University", degree: "B.Tech, Artificial Intelligence and Data Science", dates: "2023 – 2027" }],
  skills: ["RAG", "Generative AI", "FastAPI", "PostgreSQL", "React", "n8n", "Prompt Engineering"],
};

/* ---------------- PHOTOS ----------------
   src: path in /assets/photos (leave empty to show a gradient placeholder) */
window.PHOTOS = [
  { src: "assets/photos/about-me.jpg", caption: "about me", date: "2026-06-01", g: ["#2b5876", "#4e4376"] },
  { src: "assets/photos/n8n-workflow.jpg", caption: "one of the n8n workflows", date: "2026-05-01", g: ["#11998e", "#38ef7d"] },
  { src: "assets/photos/datazen-1.jpg", caption: "Datazen", date: "2026-03-01", g: ["#2193b0", "#6dd5ed"] },
  { src: "assets/photos/datazen-2.jpg", caption: "Datazen", date: "2025-10-01", g: ["#cc2b5e", "#753a88"] },
  { src: "assets/photos/brg-achieve.jpg", caption: "BRG Achieve Hackathon, TIAA", date: "2025-04-01", g: ["#1d2b64", "#4a90e2"] },
  { src: "assets/photos/brg-core-team.jpg", caption: "the core team we built", date: "2025-04-01", g: ["#3a7bd5", "#6a3093"] },
];

/* ---------------- MUSIC ----------------
   src: optional mp3 path you own. Without it, playback is simulated. */
window.MUSIC = {
  playlists: [
    { id: "late-night", emoji: "🪐", name: "late night orbit", g: ["#6a5af9", "#e48ad3"], songs: [0, 1, 2, 3, 4, 5, 6] },
    { id: "strawberry", emoji: "🍓", name: "strawberry hours", g: ["#ff6b6b", "#ffc371"], songs: [1, 3, 5, 7, 8, 9, 10, 11] },
    { id: "cowboy", emoji: "🤠", name: "coding cowboy", g: ["#e0a24a", "#3b2a1a"], songs: [2, 4, 6, 8, 10, 0] },
    { id: "focus", emoji: "🪄", name: "focus & ship", g: ["#4f6cf5", "#8a4ef0"], songs: [0, 2, 4, 6, 8, 10, 11] },
    { id: "3am", emoji: "⚰️", name: "3am builds", g: ["#1d2b4a", "#4b6585"], songs: [1, 2, 3, 5, 7, 9, 11] },
    { id: "hype", emoji: "✨", name: "hype for demos", g: ["#4fc3f7", "#e05290"], songs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
  ],
  songs: [
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "3:42" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "4:19" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "2:58" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "3:31" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "5:02" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "3:15" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "4:44" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "3:07" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "2:49" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "3:58" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "4:01" },
    { title: "[Song Title]", artist: "[Artist]", album: "[Album]", time: "3:26" },
  ],
};
