# Studydesk — KTU CST401 Artificial Intelligence

A responsive, local-first study dashboard for the KTU B.Tech S7 CSE CST401
Artificial Intelligence course (2019 Scheme). It combines syllabus tracking,
past-paper practice, revision planning, and mock exams in a browser-based app.

## Features

- Dashboard with exam countdown, study streak, and course progress.
- Five-module syllabus checklist and important-topic priorities.
- Searchable question bank and filters for the indexed question papers.
- Past-paper browser and repeated-question analysis.
- Bookmarks, study notes, a daily planner, and revision tracking.
- Timed mock exams with answer review and self-evaluation.
- Formula sheet, study analytics, dark mode, and preferences.
- Progress saved in the current browser using `localStorage`; no account or
  backend is required.

## Run locally

The app is plain HTML, CSS, and JavaScript. No package installation or build
step is needed.

1. Clone the repository:

   ```sh
   git clone https://github.com/Joelkoshyjohn/exam_helper.git
   cd exam_helper
   ```

2. Open `index.html` in a modern browser.

   Alternatively, serve the folder locally:

   ```sh
   python -m http.server 8000
   ```

   Then open <http://localhost:8000>.

Keep `paper-data.js`, `script.js`, and `styles.css` alongside `index.html`.
The HTML loads the paper data before the app script.

## Question-paper data and accuracy

[`paper-data.js`](./paper-data.js) contains transcribed question data from seven
archived KTU papers: December 2022; May and December 2023; May and November
2024; and April and November 2025. It also contains eight readable prompts from
a first-series paper dated 15 August 2026.

The first-series paper is supplemental practice, not an actual past paper. Its
source notes that its questions may not reflect the actual examination; question
6 is blank. It is excluded from past-paper repetition counts.

Question text was extracted from supplied PDFs, and some scanned or encoded
content may be ambiguous. Diagrams and numerical tables are not reproduced.
Consult the original paper for those details before relying on an extracted
question. The source PDFs themselves are not included in this repository.

## Exam date

The countdown is configured for **23 November 2026**. The exam start time was
not provided, so the countdown targets midnight at the beginning of that date.
To change it, update `EXAM_DATE` near the top of [`script.js`](./script.js).

## Development and checks

- Edit the app in `index.html`, `styles.css`, `script.js`, and `paper-data.js`.
- Check JavaScript syntax with:

  ```sh
  node --check script.js
  node --check paper-data.js
  ```

- Open or refresh the app in a browser to verify UI and behavior. The project
  does not currently include an automated test suite.

## Privacy and saved progress

Study progress is stored in browser `localStorage` on the device and browser
profile where the app is used. It is not uploaded or synchronized. Clearing
browser site data can remove saved progress. When served locally, use the same
address and port to keep accessing the same browser storage.
