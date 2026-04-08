# Interactive Calendar Component

A polished, interactive React calendar component built for the Frontend Engineering Challenge. Designed to emulate a physical wall calendar aesthetic with a premium visual hierarchy.

## Features

* **Wall Calendar Aesthetic:** Features a rich hero image section with a faux spiral-wire binding effect, seamlessly leading into the calendar grid.
* **Day Range Selector:** Click on a start date and then an end date to select a range. Fully continuous visual highlighting.
* **Integrated Notes System:** A unified notepad area. Notes are persisted in `localStorage` and act contextually: viewing the month gives a monthly overview, while selecting a date or range pulls up the notes specific to that selection.
* **Fully Responsive:** Uses a vertical stacked layout on mobile that gracefully expands into a side-by-side layout on desktop devices.
* **Premium Interactions:** Smooth hover effects, custom scrollbars, and careful typography scaling using Inter.

## Tech Stack
* **Vite + React**: Lightning-fast local development and production builds without unnecessary backend overhead.
* **Vanilla CSS (CSS Modules)**: Full custom styling to nail the specific aesthetics requested by the challenge, avoiding the "generic" look.
* **Date-Fns**: For robust, error-free date math.
* **Lucide React**: For crisp, scalable icons.

## Running Locally

1. Clone the repository.
2. Ensure you have Node.js installed.
3. Run `npm install` to install the dependencies.
4. Run `npm run dev` to start the frontend server locally.
5. Visit `http://localhost:5173` in your browser.

## Evaluation Requirements Addressed

* **Strictly Frontend:** Only client-side architecture was used.
* **Data Persistence:** Used `localStorage` cleanly with React `useEffect` for syncing notes.
* **Attention to Detail:** Included small micro-interactions (red dots marking dates with notes), perfect spiral bindings drawn via CSS gradients/SVG paths, and responsive typography.

*Built with ❤️ for the SWE Summer Intern application.*
