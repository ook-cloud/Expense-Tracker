# Project 14 — Expense Tracker

**Difficulty:** med · **Category:** Tool · **Core demo:** ~20 min

## What you're building

A personal finance tool where you log income and expense entries with an amount and category, see a running balance, per-category totals, and have everything survive a page refresh.

## The 20-minute core (MVP)

- A form to add a transaction: amount, category, type (income/expense)
- Submitting the form adds it to a running list of transactions and updates the display
- Show a large running balance (income minus expenses)
- Show a per-category breakdown (e.g. total spent on "Food", "Rent", etc.)
- Transactions persist after a page refresh

## How it works (concept — no code)

- **Capturing form input without a page reload** → the default behavior of submitting an HTML form is to reload the page; you intercept that so JavaScript can handle it instead. Research: the `submit` event on a `<form>` element, `event.preventDefault()`.
- **Reading values out of form fields** → after intercepting submit, pull the values the user typed/selected out of each input. Research: `FormData`, or reading `.value` directly off each input element (`document.querySelector` + `.value`).
- **Storing each entry as structured data** → every transaction becomes an object (amount, category, type, maybe a timestamp) pushed into an array, which is your single source of truth for everything rendered on screen. Research: `Array.prototype.push`, object literals.
- **Calculating the running balance** → sum all income and subtract all expenses from your transactions array. Research: `Array.prototype.reduce`.
- **Calculating per-category totals** → group transactions by category and sum each group's amounts. Research: `Array.prototype.reduce` (building an object/map of category → total) or `Array.prototype.filter` + `reduce` per category.
- **Re-rendering the list after every change** → after adding a transaction, redraw the transaction list and totals from the current state of the array rather than manually inserting one row. Research: clearing and re-populating a container element, `Array.prototype.map` to turn transactions into HTML.
- **Persisting data across page loads** → the transactions array lives in memory and disappears on refresh unless you explicitly save it to the browser's storage and load it back on page start. Research: `localStorage.setItem`, `localStorage.getItem`, `JSON.stringify` (object → string to store), `JSON.parse` (string → object when loading back).

## What you'll use

- HTML/CSS: form with amount/category/type inputs, list of transaction rows, big balance display, clean finance-app styling
- JavaScript: objects, arrays, array methods (`reduce`, `map`, `filter`), functions, form handling, conditional logic
- Browser APIs: `localStorage`, form `submit` event
- Public API: none — all data is local to the browser

## Design prompt (paste it → get a visual spec sheet → build from it)

Paste the prompt below into an AI/design tool that can output HTML (Claude, ChatGPT, v0, etc.). It returns a **single annotated design-spec sheet** — a picture of the screen with the exact pixel spacing, colors, and font sizes labeled on it, plus a per-component breakdown — so you can read every number and rebuild it yourself in plain HTML/CSS/JS. It's a spec to copy, **not** the finished app.

> Create a single self-contained HTML file that is an **annotated design-spec sheet** (like a Figma redline) for a personal expense tracker — NOT a working app. Include: (1) a clean static mockup of the main screen with realistic placeholder content (balance display, add-transaction form, transaction list rows); (2) small labeled chips placed on the mockup marking the key spacing and sizes in pixels — padding, gaps, border-radius, main element sizes, and the biggest font size; (3) a **Colors** panel — each color as a swatch + hex code + what it is used for, and make sure body text stays at least 4.5:1 contrast against its background; (4) a **Typography** panel — each text element with its pixel font-size and weight; (5) a **Spacing & sizes** panel — max width, paddings, gaps, corner radii in px, plus one note on how the layout reflows on a narrow phone screen (a single breakpoint); (6) a **States** strip — small mini-mockups of the empty (no entries yet) and has-entries states, since the working app needs them; (7) a **Component-by-component breakdown** where each component shown in the mockup above gets its own small card listing all of its specs: width/height, padding, background hex, border and border-radius, and text color + font size + weight — so I can build one component at a time just by reading its card. Use the Manrope font for the mockup so it matches the style below, and keep the spec panels themselves in a clean readable sans-serif. Make it clean and beginner-friendly so someone who has coded for one month can read the numbers and implement it by looking. Style direction: clean, trustworthy fintech style. Do NOT include any interactivity, JavaScript, or real data — it is a static spec sheet I will read and rebuild by hand.

## Resources

- https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

## Stretch goals

- Add a delete button per transaction (and re-save to `localStorage`)
- Add a simple bar chart of category totals (canvas or CSS-only bars)
- Filter transactions by date range or category
- Add a monthly budget limit with a warning when exceeded

## Skills it drills

- Objects, arrays, `reduce`/`map`/`filter`, functions, conditional logic, form handling
