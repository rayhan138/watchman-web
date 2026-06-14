# Watchman Features And Workflow

This document explains what Watchman does, how the app works, where the main
features live, and what another developer or AI assistant should understand
before changing the project.

## Product Summary

Watchman is a Windows desktop app for live network monitoring. It shows current
upload/download speed, tracks daily traffic history, monitors per-app network
activity, checks connection health, runs M-Lab speed tests, exports traffic data,
and provides a compact taskbar widget.

The app is built with:

- Tauri 2 for the desktop shell.
- Rust for Windows system monitoring and backend commands.
- Plain HTML, CSS, and JavaScript for the frontend UI.
- Vite for frontend building.
- NSIS for Windows installer packaging.
- GitHub Releases and Tauri updater artifacts for updates.

Current app identity:

- Product name: `Watchman`
- Package identifier: `app.blinkeye.watchman`
- Current version in source: `1.0.2`
- Default main window size: `520 x 780`
- Minimum main window size: `460 x 650`

## High-Level App Flow

When Watchman starts:

1. Tauri creates the main app window from `src/index.html`.
2. Tauri creates a separate hidden taskbar widget window from `src/taskbar.html`.
3. Rust initializes shared state for monitoring, config, history, alerts, and
   widget display mode.
4. The backend starts a metrics loop.
5. Every second, the backend samples CPU, memory, GPU, temperatures, and network
   counters.
6. The backend emits a `metrics` event to the main window and taskbar widget.
7. The frontend updates the live dashboard, taskbar widget, status bar, gauges,
   and other UI values.
8. Traffic deltas are appended into today's history record.
9. A separate save loop writes history to disk every 30 seconds when needed.
10. On startup, the frontend also checks config, app version, updater state, and
    initializes the active UI tab.

The important mental model is: Rust owns real system data and persistence;
JavaScript owns the UI presentation and user interactions.

## Source Layout

Important files:

```text
src/
  index.html          Main app UI markup
  renderer.js         Main app behavior and UI rendering
  tauri-bridge.js     Frontend wrapper around Tauri commands/events
  styles.css          Main app styles and themes
  taskbar.html        Compact taskbar widget window
  taskbar.js          Taskbar widget behavior
  main.js             Frontend entrypoint
  watchman-logo.svg   App logo

src-tauri/
  tauri.conf.json     Tauri app config, updater config, bundle settings
  Cargo.toml          Rust dependencies and package metadata
  src/main.rs         Desktop app entrypoint, loops, tray, widget, commands
  src/taskbar_embed.rs
                      Rust wrapper around native taskbar embedding
  native/taskbar_embed.cpp
                      Windows native taskbar embedding layer
  scripts/temperature_probe.ps1
                      Temperature helper script
  vendor/libre-hardware-monitor/
                      Bundled temperature/runtime DLLs
  capabilities/default.json
                      Tauri permissions

src-tauri/src/commands/
  monitor.rs          CPU, memory, GPU, network, disk, temperature, interfaces
  history.rs          Local traffic history persistence and aggregation
  config.rs           Settings, recommendations, undo, notification config
  network_health.rs   Ping health, connection classification, M-Lab speed test
  app_monitor.rs      Per-app network activity via Windows ETW/IP tables
  data_usage.rs       Usage totals, data limit, period comparison
  troubleshooter.rs   DNS, default route, and internet diagnostics
  export.rs           CSV export
  profile.rs          Usage profiles
  notifications.rs    Notification action stubs
```

## Local Data Storage

Watchman stores user data locally. It does not use a cloud database.

Main local files:

```text
%APPDATA%\Watchman\settings.json
%APPDATA%\Watchman\history.json
```

History uses date-keyed records:

```json
{
  "records": {
    "2026-06-03": {
      "upload": 123456,
      "download": 987654
    }
  }
}
```

The history system is intentionally defensive:

- It loads all saved history on startup.
- It appends traffic into today's date instead of replacing the whole file.
- It merges disk data before saving so another process does not accidentally
  erase older records.
- It drops invalid date keys instead of crashing.
- It writes through a temporary file and verifies the temp file before replacing
  the real history file.
- It keeps a `.bak` backup of the previous history file.
- If the history file is unreadable, it moves/copies it to a timestamped backup
  and tries to recover from backup.

This was added because earlier builds had a serious bug where some machines only
kept today's and yesterday's history.

## Main Tabs And Features

### Dashboard

The Dashboard is the first screen and shows the current live state of the app.

It includes:

- Live download speed.
- Live upload speed.
- Current session download, upload, and total usage.
- Reset Session button.
- Usage Snapshot for the selected dashboard period.
- Network status badge such as Normal or Heavy.
- CPU gauge.
- RAM gauge.
- GPU gauge.
- Expandable Network Details panel.
- Expandable System Information panel.
- Bottom status bar showing connection state and uptime.

The dashboard gets live data from the backend `metrics` event. Session totals
come from `MonitorState`, while daily/monthly totals come from local traffic
history.

### Data

The Data tab focuses on traffic history.

It includes:

- Daily, weekly, and monthly summary modes.
- Total usage, download, and upload summary cards.
- Today, Last 7 Days, Monthly, and Yearly history filters.
- Bar charts for traffic history.
- Date and month pickers for historical ranges.
- Comparison with previous period.

History data comes from `get_traffic_history`. The backend can aggregate raw
daily records into:

- Daily records: `YYYY-MM-DD`
- Weekly records: `YYYY-W##`
- Monthly records: `YYYY-MM`
- Yearly records: `YYYY`

### Apps

The Apps tab shows per-app network activity for the current session.

It includes:

- App/process name.
- Live/background status.
- Download total and current download rate.
- Upload total and current upload rate.
- Connection count.
- App count badge.
- Usage by App button that opens Windows Data Usage settings.

The backend uses Windows network tracing and IP helper tables. On Windows, live
per-app bandwidth can require administrator rights. When Watchman is not running
as admin, the app may still show apps and connection counts, but exact per-app
download/upload bandwidth can be unavailable.

The Apps tab intentionally keeps recent background apps visible for the session,
so short-lived network activity does not disappear immediately.

### Network

The Network tab shows connection health and network diagnostics.

It includes:

- Connection Health status: Stable, Fair, Unstable, Offline.
- Latency.
- Jitter.
- Packet loss.
- Connection type.
- SSID or adapter name.
- Link speed.
- Local IP.
- A visual connection indicator:
  - wired link for Ethernet
  - Wi-Fi arcs for Wi-Fi
  - cellular bars for cellular/mobile broadband
- M-Lab speed test.
- Last tested speed result.

Latency uses Windows `ping` against the configured target, defaulting to
`8.8.8.8`. The app sends 5 samples and calculates average latency, min/max,
jitter, packet loss, sent count, and received count.

Connection classification is deliberately strict. Ethernet should not be
classified as cellular. The code checks adapter names, descriptions, physical
medium, and keywords such as:

- Ethernet: `ethernet`, `802.3`, `gbe`, `gigabit`, `realtek pcie`,
  `intel ethernet`, `lan`
- Wi-Fi: `wi-fi`, `wifi`, `wireless lan`, `wlan`, `802.11`
- Cellular: `wwan`, `wireless wan`, `cellular`, `mobile broadband`, `mbim`,
  `modem`, `sim`, `lte`, `4g`, `5g`

The speed test uses M-Lab NDT7:

1. Watchman asks M-Lab locate API for a nearby NDT7 server.
2. It opens NDT7 WebSocket connections.
3. It measures download for about 10 seconds.
4. It measures upload for about 10 seconds.
5. It records Mbps, MB/s compatibility values, ping, server label, city,
   country, source, timestamp, and data used.
6. It saves recent speed test results in settings.

M-Lab may collect public IP and test data for internet research. The UI mentions
this before running the test.

### Tools

The Tools tab contains maintenance and utility features.

It includes:

- Network Troubleshooter.
- Updates.
- Export CSV.

The Network Troubleshooter runs:

- DNS resolution test.
- Default route/gateway test.
- Internet connectivity test.

It returns pass, warning, or fail results and suggested fixes. The fixes are
currently advisory, not automated.

The Updates section:

- Checks GitHub release metadata through Tauri updater.
- Shows whether Watchman is up to date.
- Shows available update details.
- Can download and install an update.
- Uses signed updater artifacts.

The Export CSV section:

- Exports saved traffic history to a CSV file.
- Writes files into the user's Downloads folder.
- Supports period-based exports.
- Includes MB columns and raw byte columns.
- Uses a UTF-8 BOM so spreadsheet apps open the CSV cleanly.

## Preferences And Settings

The Preferences modal includes:

- Run on Windows Startup.
- Use Bits/s instead of Bytes/s.
- Hide Hardware Gauges.
- Monthly Data Limit in GB.
- High Usage Warnings.
- Today's traffic threshold.
- Memory usage threshold.
- CPU temperature threshold.
- GPU temperature threshold.
- Disk temperature threshold.
- Mainboard temperature threshold.
- App version display.
- Use Recommended settings.
- Undo settings.
- Save settings.

The config backend supports:

- Loading settings from `%APPDATA%\Watchman\settings.json`.
- Creating default settings when no file exists.
- Saving partial config updates.
- Keeping up to 10 previous config states for undo.
- Emitting `config-updated` so frontend windows can react.
- Enabling/disabling autostart based on the saved setting.

Recommended settings currently reset the app toward a safe default:

- bytes/s display
- gauges visible
- memory warning enabled
- warning threshold around 80%
- system theme
- work profile
- notification defaults
- sound disabled

## Themes

Watchman supports multiple visual modes:

- System
- Light
- Dark
- Focus

The frontend resolves the selected theme, applies it to the document, and updates
the theme icon. Focus mode was added as a softer, premium-looking theme between
Light and Dark.

## Notifications And Alerts

Watchman has in-app and native notification support.

The backend evaluates high usage warnings during the metrics loop. It can alert
for:

- Memory usage crossing the configured percentage.
- Today's traffic crossing the configured amount.
- CPU temperature crossing the configured Celsius threshold.
- GPU temperature crossing the configured Celsius threshold.
- Disk temperature crossing the configured Celsius threshold.
- Mainboard temperature crossing the configured Celsius threshold.

Alerts avoid repeating continuously while the condition remains active. Traffic
warning state resets when the day changes.

The frontend also handles update notifications and in-app notification cards.

## Startup Update Prompt

The updater experience has two layers:

- Tools tab updater card.
- Startup update prompt overlay.

On startup, the frontend schedules an update check. If a newer release exists,
Watchman can show a small update-available prompt over the app with a blurred
background. Clicking the prompt opens the Tools updater section. A dismiss button
lets the user hide it.

Reminder spacing is stored per update so the same update prompt does not keep
appearing too aggressively. The current behavior is designed around a two-day
spacing for the same update notice.

## Taskbar Widget

Watchman creates a second Tauri webview window for the taskbar widget.

The widget shows:

- Upload speed.
- Download speed.
- CPU percentage.
- Memory percentage.

It supports:

- full mode: network + CPU/MEM
- network-only mode
- dark/light taskbar theme adaptation
- native context menu
- double-click to open history
- right-click menu actions
- reset session from widget menu

On Windows, the widget has native integration in `src-tauri/native/taskbar_embed.cpp`
and `src-tauri/src/taskbar_embed.rs`. The backend periodically re-applies widget
placement because Windows can change taskbar geometry after Explorer reloads,
screen scaling changes, taskbar position changes, or full-screen app changes.

Important: taskbar embedding is fragile Windows-native behavior. Change it only
when specifically working on widget placement or recovery.

## Tray And Window Behavior

Watchman uses a tray icon and hidden main-window behavior.

Behavior includes:

- Close hides the main window instead of exiting.
- Minimize minimizes the window.
- Tray menu can restore the main window.
- Single-instance plugin prevents duplicate app instances in release builds.
- Startup can launch minimized with `--minimized`.
- Normal launch forces the main window visible even if saved state remembered a
  hidden window.

## Build, Release, And Update Flow

The app uses GitHub Actions for Windows builds.

Workflow file:

```text
.github/workflows/build-windows.yml
```

The workflow:

1. Runs on pushes to `main`, `codex/**`, and `release/**`.
2. Runs on pull requests into `main`.
3. Can be manually triggered.
4. Uses `windows-latest`.
5. Checks out the repo.
6. Sets up Rust.
7. Installs NSIS if needed.
8. Runs `npm ci --no-audit --no-fund`.
9. Runs `npm run tauri:build:nosign`.
10. Uploads the NSIS `.exe` installer as an artifact.

The signed updater is configured in `src-tauri/tauri.conf.json`.

Updater endpoint:

```text
https://github.com/rayhan138/Watchman/releases/latest/download/latest.json
```

Release assets should include:

- installer `.exe`
- installer signature `.sig`
- `latest.json`

The private signing key and password belong in GitHub repository secrets, not in
source control.

## Known History Of Problems Fixed Or Discussed

These are important because future work should not accidentally reintroduce them.

### History disappearing after two days

Some machines only showed today and yesterday. The likely cause was older history
being overwritten or not loaded. The fix direction was to use clean Watchman
local storage, date-keyed records, merge-before-save, backups, and safe loading.

### Ethernet classified as Cellular

Ethernet adapters such as Realtek or Intel GbE were sometimes shown as Cellular.
This caused the UI to show mobile signal bars for wired connections. The
classification logic now uses stricter Ethernet, Wi-Fi, and Cellular indicators.

### Startup black screen / hidden window

The app can hide to tray, so startup needs to avoid restoring an invisible main
window accidentally. Normal launch forces the main window visible and repeats the
show call shortly after startup.

### Per-app bandwidth needs admin

The app monitor can show process activity and connection counts without full
bandwidth data, but detailed per-app bandwidth can require administrator access
because Windows ETW network tracing may need elevation.

### Windows Data Usage button

The Apps tab includes a button to open Windows Data Usage. Windows Settings does
not always deep-link exactly to the desired page, so the backend uses a hidden
PowerShell/UIAutomation script to open Settings and invoke the Data Usage item.

### Update prompt polish

The startup prompt and Tools update card were improved so update availability is
shown without squeezing the Tools card layout.

## Development Commands

Install dependencies:

```bash
npm install
```

Run frontend only:

```bash
npm run dev
```

Run Tauri app in development:

```bash
npm run tauri:dev
```

Build frontend:

```bash
npm run build
```

Build Windows app:

```bash
npm run tauri:build
```

Build Windows app without signing:

```bash
npm run tauri:build:nosign
```

## Important Maintenance Notes

- Do not rename Watchman back to Traffic Monitor.
- Do not restore Electron-era history logic.
- Do not store app history under an Electron-style app data path.
- Do not delete or rewrite the native taskbar embedding code casually.
- Do not commit generated folders such as `node_modules`, `dist`,
  `src-tauri/target`, or release artifacts.
- Do not commit updater private keys.
- Keep app data local unless a future product decision explicitly adds cloud
  sync.
- Treat temperature readings as best-effort because hardware sensors vary by
  machine and may need admin/system access.
- Treat GitHub Actions download failures as possible CI/network flakiness before
  assuming the code is broken.
- Keep UI changes consistent across Light, Dark, and Focus themes.

## Website Context

The marketing website work is separate from the app source. The current local
website folder is:

```text
watchman-website/
```

That folder is ignored by the main app repo so it can later become its own
website repository or deployment project.

The website should use real Watchman screenshots and the real Watchman logo,
not fake SVG recreations of the app UI.

