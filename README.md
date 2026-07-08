# Portfolio and Resume Development Setup

This repository contains a modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## Completed Tasks & Enhancements

### 1. Resume Integration
* Linked a downloadable/viewable resume inside the portfolio.
* Desktop and mobile buttons in [index.html](index.html) link to `assets/resume.pdf`.
* To update the resume, place a PDF named `resume.pdf` in the `assets/` directory.

### 2. LaTeX Resume Configuration
* Designed a LaTeX resume (`main.tex`) using standard formatting that matches the content on your portfolio website.
* **Synchronized Information**: Included three major team projects (*College Bus Tracking & Attendance Management System*, *Cynx-YouthLink*, and *Decentralized Freelance Payment & Escrow Platform*).
* **Improved Separation**: Applied the heading color `\color[rgb]{0.1, 0.2, 0.4}` to project titles and increased the vertical spacing between projects (`\vspace{8pt}`) to visually separate them and prevent them from looking merged.
* **Minimized Noise**: Kept the tech stack lists concise and excluded any details not present in the portfolio website (like location, phone, CGPA, graduation dates, or unmentioned coursework).

### 3. "Let's Talk" Button Integration
* Updated the main call-to-action button in the hero section to link directly to a Gmail web client compose tab:
  `https://mail.google.com/mail/?view=cm&fs=1&to=gampasathwik2220@gmail.com`
* This bypasses default OS-level mail handlers (such as Windows Outlook) and opens a new compose tab straight in the web browser.

---

## Local Development Server

To run this static website locally, spin up a local development server to bypass default browser security policy constraints (e.g. CORS):

```bash
npx serve
```

Once running, navigate to the local address displayed in your console (typically `http://localhost:3000`).
