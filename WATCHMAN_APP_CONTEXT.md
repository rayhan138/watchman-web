# Watchman App Context

This document explains what Watchman is, what has already been built, what problems were fixed or discussed, and what the current website work is about. It is intended for future collaborators, developers, or AI assistants who need quick context before making changes.

## What Watchman Is

Watchman is a Windows desktop app for monitoring network activity in a clean, local-first interface.

The app helps users see:

- live download and upload speed
- current session traffic
- daily, weekly, monthly, and yearly usage history
- per-app network activity
- connection health
- latency, jitter, and packet loss
- network type and adapter details
- manual M-Lab speed test results
- CSV exports
- update availability
- compact taskbar widget status

The app is built with Tauri 2, Rust, and a plain HTML/CSS/JavaScript frontend.

Watchman is not meant to be a cloud dashboard. The core idea is a local Windows utility that sits quietly on the user’s PC and helps them understand what their network is doing.

## Product Direction

Watchman should feel:

- useful before decorative
- premium but not bloated
- calm and readable
- local-first and trustworthy
- easy for normal Windows users
- polished enough for Product Hunt or a public launch

The app has three theme modes:

- Light
- Dark
- Focus

Focus mode is a softer, warmer, premium-looking mode that sits between Light and Dark.

## Main App Tabs

### Dashboard

The Dashboard is the main live overview.

It shows:

- live download speed
- live upload speed
- current session totals
- usage snapshot
- connection status
- hardware gauges such as CPU, RAM, and GPU
- network details and system information accordions

This tab should feel like the command center of the app.

### Data

The Data tab shows traffic history.

It includes:

- daily usage
- weekly usage
- monthly usage
- yearly usage
- last 7 days view
- previous period comparison
- charts for download and upload

This tab is important because one of the earliest major problems was disappearing history data.

### Apps

The Apps tab shows app-level network activity.

It includes:

- live and recent app network usage
- background or live app status
- connection count
- down/up traffic per app when available
- a Usage by App button that opens Windows Data Usage settings

The app does not fully replace Windows Data Usage. It gives a shortcut and provides its own session-level visibility.

### Network

The Network tab handles connection health and diagnostics.

It includes:

- connection health status
- latency
- jitter
- packet loss
- connection type
- adapter name
- link speed
- local IP
- manual M-Lab speed test

M-Lab speed tests should be manual, not automatic. The app should not surprise users by consuming bandwidth.

### Tools

The Tools tab includes utilities.

It includes:

- network troubleshooter
- update checking
- CSV export
- selected format and period controls

The update UI should be clear and readable. It previously had a squeezed layout issue that was fixed.

## Major Problems Faced

### History Disappearing

The biggest early bug was traffic history disappearing after a few days, especially on the user’s brother’s PC.

Observed behavior:

- only today and yesterday remained
- older days disappeared
- monthly view also missed old days
- this suggested the problem was not only chart rendering

Direction taken:

- stop relying on old Electron-style history
- accept losing old legacy data if needed
- use clean Watchman-only local history
- preserve history by date
- avoid replacing the whole history list accidentally
- keep long-term daily records

### Electron Legacy Cleanup

The app originally had some Electron-era assumptions or names. The user wanted Watchman to be cleanly separated from old Electron logic.

Decision:

- no old Electron history import
- no mixed Electron/Tauri history logic
- old local data can be lost if necessary
- future data should be stored cleanly under Watchman identity

### Startup And Black Screen

The user reported that sometimes the app could open as a black screen or show missing UI after Windows startup.

Likely causes discussed:

- frontend failing to render
- broken local config or history data
- startup timing
- backend command not ready
- Windows/taskbar timing issues

This area should still be treated carefully in future work.

### Taskbar Widget Reliability

The app has a taskbar widget, but taskbar embedding is sensitive.

Problems discussed:

- widget not showing after startup
- show/hide button not always recovering it
- widget visual corruption on a friend’s Windows 10 PC
- squeezed or overlapped widget layout

Important instruction from the user:

Do not touch taskbar embedding unless explicitly asked.

### Network Type Detection

The user’s brother had Ethernet, but Watchman showed it as Cellular.

Correct behavior:

- Ethernet should show as Ethernet or Wired
- Ethernet should not show mobile bars
- Ethernet should not require signal strength
- Cellular should only be used for clear mobile broadband signals

Detection should be strict:

- wired adapter names and media types should classify as Ethernet
- cellular should require WWAN, LTE, 5G, MBIM, modem, SIM, or mobile broadband clues

### Signal Display

Because Ethernet was misclassified as Cellular, the app sometimes showed gray or empty mobile bars. This was a symptom of the wrong network type.

### Usage By App Shortcut

The Apps tab includes a Usage by App button that opens Windows Data Usage.

The user wanted it to take them as close as possible to the Windows Data Usage page, not only the general Network and Internet page.

This behavior may depend on Windows version.

### Right-Click Context Menu

During development, the default webview context menu appeared. The user wanted this removed for production builds.

### Temperature Preferences

The Preferences modal contains temperature warning settings.

These may require admin mode or hardware access depending on the PC. Treat this as a system-permission-sensitive feature.

## Release And GitHub History

The GitHub repository is:

https://github.com/rayhan138/Watchman

The app was prepared for GitHub Actions builds.

Important branches used:

- release/prepare-watchman
- release/add-updater
- feature/focus-theme-mode

The user learned how to:

- create pull requests
- wait for GitHub Actions checks
- merge PRs
- create GitHub releases
- attach release assets
- publish tags

## GitHub Actions

GitHub Actions builds the Windows installer.

The workflow originally had some flaky failures caused by GitHub or action download issues, not necessarily app code.

The build eventually succeeded.

Later the workflow was adjusted to use npm instead of Bun for better CI reliability.

## Auto Update

Watchman has signed updater support.

Signing matters because it proves updates are genuine and were created by the developer.

GitHub secrets used:

- TAURI_SIGNING_PRIVATE_KEY
- TAURI_SIGNING_PRIVATE_KEY_PASSWORD

The private key must remain secret.

The public key can be included in the app configuration.

Important release notes:

- v1.0.1 was the first updater-enabled release
- v1.0.2 added Focus mode and update experience improvements

The repository needed to be public for update checking to work through the GitHub release channel.

## Known Version Display Issue

After updating from v1.0.1 to v1.0.2, the Preferences modal still showed Watchman v1.0.1.

Reason:

- the displayed version was likely hardcoded in the frontend
- it was not automatically read from Tauri metadata

The user accepted this as not urgent.

Future fix:

- expose app version from Tauri
- render it dynamically in Preferences

## Current Website Work

The current active work is the Watchman website.

The website folder is:

`watchman-website/`

This folder is intentionally ignored by the main app repository through `.gitignore`.

The user wants the website to become its own separate project/repository later.

The current website is built with Next.js.

The website should be:

- one-page
- premium
- stylish
- smooth
- Product Hunt-ready
- focused on the real app
- based on real Watchman screenshots
- not fake SVG copies of the app

Important user preference:

Use the real Watchman logo and real app screenshots.

The first website attempt was too weak and did not match the user’s expectation. The direction was corrected to use real screenshots and a central tab-by-tab showcase.

## Website Structure Goal

The website should be structured professionally, not as one giant random file.

Preferred structure:

```text
watchman-website/
├─ app/
│  ├─ layout.jsx
│  ├─ page.jsx
│  └─ globals.css
├─ components/
│  ├─ layout/
│  │  ├─ Navbar.jsx
│  │  └─ Footer.jsx
│  ├─ sections/
│  │  ├─ HeroSection.jsx
│  │  ├─ TourSection.jsx
│  │  ├─ FeaturesSection.jsx
│  │  ├─ PrivacySection.jsx
│  │  └─ DownloadSection.jsx
│  ├─ showcase/
│  │  └─ AppTheatre.jsx
│  └─ ui/
│     ├─ Brand.jsx
│     ├─ ButtonLink.jsx
│     └─ Reveal.jsx
├─ data/
│  └─ site-content.js
├─ hooks/
│  └─ useSmoothScroll.js
├─ public/
│  ├─ watchman-logo.svg
│  └─ screenshots/
├─ package.json
├─ package-lock.json
├─ next.config.mjs
├─ postcss.config.mjs
└─ jsconfig.json
```

The goal is:

- `app/page.jsx` should only arrange sections
- content should live in `data/site-content.js`
- reusable UI should live in `components/ui`
- page sections should live in `components/sections`
- app showcase animation should live in `components/showcase`
- smooth scrolling should live in `hooks`

## Current Website Assets

Current real screenshots:

- `public/screenshots/dashboard.png`
- `public/screenshots/data.png`
- `public/screenshots/apps.png`
- `public/screenshots/network.png`
- `public/screenshots/tools.png`

Current logo:

- `public/watchman-logo.svg`

## How To Run The Website

From the website folder:

```powershell
cd D:\traficmonitor\traffic-monitor-tauri\watchman-website
npm install
npm run dev -- --hostname 127.0.0.1 --port 3014
```

Then open:

```text
http://127.0.0.1:3014
```

## Things To Avoid

Do not:

- replace real app screenshots with fake SVG mockups
- touch taskbar embedding unless the user explicitly asks
- push code without the user approving it
- add unnecessary documentation into the main app repo
- mix old Electron history with Watchman history
- auto-run M-Lab speed tests
- make a generic SaaS landing page that does not show the real app
- create decorative pages without explaining Watchman’s real features

## Current Priority

The current priority is the Watchman website.

Next likely tasks:

- restructure the Next.js website into clean folders
- improve the hero section
- make the app showcase feel more cinematic
- describe all five app tabs clearly
- prepare the website for a separate GitHub repo
- later connect website download links to the latest GitHub release

## Tone And Product Promise

Watchman should communicate this message:

Watchman helps Windows users understand their network without needing a cloud account, complicated setup, or noisy dashboard. It shows live speed, history, app activity, diagnostics, speed tests, exports, and updates in one polished local app.
