export interface RawBlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  category: string;
  content: string;
}

export const postsData: RawBlogPost[] = [
  {
    slug: "deep-dive-how-watchman-works",
    title: "Deep Dive: How Watchman Keeps You in Control of Your Network",
    date: "2026-06-26",
    description: "An in-depth look at Watchman's architecture, its five main tabs, preferences, and our signature real-time taskbar widget.",
    author: "Rayhan",
    category: "Product Deep-Dive",
    content: `Watchman was built to answer a simple, recurring question: *What is my computer doing on the internet right now?* 

Many network monitors are bloated, require complex setups, or upload your personal browsing history to a cloud server. Watchman is different. It is a lightweight, local-first utility built on a modern desktop stack (Tauri 2 & Rust) that keeps all your network data exactly where it belongs: on your computer.

In this deep dive, we will explain exactly how Watchman works under the hood, how to navigate its five core sections, and how to get the most out of our custom taskbar widget.

---

## Under the Hood: The Architecture

Watchman is built using **Tauri 2** and **Rust** on the backend, combined with a clean HTML/CSS/JavaScript frontend. 

By leveraging Rust for low-level systems calls, Watchman queries active network adapters, gathers per-app connection metrics, and polls hardware temperature sensors with negligible CPU and RAM overhead. 

All your settings and traffic logs are saved locally to standard JSON files on your hard drive:
* \`settings.json\`: Your startup preferences, color theme choice, and warning limits.
* \`history.json\`: Date-keyed network volume metrics (downloads/uploads) stored locally for historical chart rendering and CSV data exports.

There are no databases to maintain, no background daemons hogging resources, and absolutely no data telemetry leaving your machine.

---

## Navigating the Main Interface

Watchman opens as a compact, non-intrusive desktop window. You can navigate the application using the five core tabs:

### 1. Dashboard (The Live Command Center)
The Dashboard provides an instant snapshot of your current network and system status. Here you will find:
* **Live Speed Cards**: Real-time upload and download rates.
* **Session Totals**: Data volumes consumed since the app opened (or since you clicked "Reset Session").
* **Hardware Gauges**: Interactive gauges showing CPU, RAM, and GPU usage so you can quickly see if network spikes are related to overall system load.
* **Expandable Details**: Accordions showing network adapter names, local IP configurations, and system specifications.

### 2. Data (Your Local History)
The Data tab provides visual graphs of your historical network consumption.
* **Mode Selector**: View your records grouped by Day, Week, or Month.
* **Timeline Chart**: Easily spot heavy data days and check if your usage is trending up or down.
* **Usage Filters**: Instantly filter the timeline to view *Today*, the *Last 7 Days*, the *Current Month*, or the *Entire Year*.
* **Data Limit Cap**: Set your monthly billing cycle limit (in GB) to track progress and prevent overages.

### 3. Apps (Process-Level Tracking)
Ever wonder why your network connection feels sluggish? The Apps tab lists every active process on your PC.
* View live application bandwidth (upload and download rates).
* Inspect active connection counts per process.
* **Pro-Tip**: Running Watchman as **Administrator** enables deeper kernel-level inspection, allowing for precise per-app bandwidth volumes.

### 4. Network (Diagnostics & Speed Testing)
The Network tab tracks connection health and quality rather than just volume.
* **Quality Metrics**: Live latency, jitter, and packet loss monitoring.
* **M-Lab Speed Test**: Run standard M-Lab network tests manually to check maximum download and upload capabilities. Testing is strictly manual to prevent unexpected data usage.

### 5. Tools (Maintenance & Exports)
The Tools tab houses auxiliary utilities to keep your connection healthy.
* **Network Troubleshooter**: Run basic diagnostics to detect DNS issues, connection reachability failures, and suggest simple fixes.
* **CSV Export**: Export your historical network logs to a spreadsheet-ready CSV file.
* **Update Engine**: Check for signed, verified updates straight from our GitHub repository.

---

## The Signature Taskbar Widget

One of Watchman’s most popular features is the **Taskbar Widget**—a tiny window embedded directly into your Windows taskbar. 

The widget communicates with the Rust backend in real-time, allowing you to monitor active speeds without having to open the main application window.

### Widget Modes
* **Network Only**: Displays just your current download and upload speeds.
* **CPU / Memory**: Expands the widget slightly to show your CPU load and RAM percentage alongside network traffic.

### Quick Actions & Shortcuts
* **Double-Click**: Open the main Data tab instantly to view your detailed history.
* **Right-Click the Widget**: Open a specialized shortcut menu to reset session counters, change the widget display mode, or jump straight to Today's history.
* **Right-Click the System Tray Icon**: Access app-level settings, show/hide the taskbar widget, run as Administrator, or exit the application completely.

---

## Customizing Your Preferences

Watchman is designed to fit your workflow. Clicking the gear icon opens the **Preferences modal**, letting you control:
* **Startup Behavior**: Set Watchman to start automatically with Windows.
* **Measurement Units**: Switch between *Bits/s* (recommended for comparing with ISP packages) and *Bytes/s* (best for comparing with file sizes).
* **Sensor Gauges**: Hide hardware sensors for a network-only focus.
* **Sensory Warnings**: Configure customizable warning popups when Today's traffic exceeds a limit, or if hardware temperatures (CPU, GPU, hard drives, or motherboard) exceed your safe threshold.`
  },
  {
    slug: "introducing-watchman",
    title: "Introducing Watchman: Know Where Your Internet is Going",
    date: "2026-06-27",
    description: "See live per-app bandwidth monitoring, track active background tasks, and see exactly what is consuming your data—all from a lightweight taskbar widget.",
    author: "Rayhan",
    category: "Product Launch",
    content: `Today, we are thrilled to introduce **Watchman**, a lightweight, local-first network monitor designed for Windows and macOS. 

Watchman was built out of a simple frustration: modern operating systems make it incredibly difficult to see exactly what is consuming your internet bandwidth in real-time. Whether it's a hidden background Windows update, a rogue browser tab, or a background sync task, network activity is often a black box.

Watchman changes that by bringing complete, real-time transparency directly to your desktop.

---

## Why Watchman?

Unlike heavy enterprise network sniffers or bloated task managers, Watchman is designed to be sleek, fast, and completely private.

### 1. Real-Time Per-App Bandwidth Monitoring
See a live stream of every active application on your system and exactly how many kilobytes or megabytes it is downloading and uploading per second.

### 2. Active Connection Tracking
Keep tabs on active background tasks and remote connections. Watchman shows you not just *how much* data is being used, but *where* it is going.

### 3. Historical Data Analysis
Wondering how much data you consumed this week compared to last week? Watchman saves your network history locally and lets you export it as a clean CSV format for deeper analysis.

---

## Built with Privacy First

We believe your network history is yours alone. That is why Watchman is built on three core pillars of privacy:

* **Local First**: Everything stays on your hard drive. No data leaves your machine, ever.
* **No Telemetry**: We do not track what apps you use, what servers you connect to, or how you use the utility.
* **Zero Cloud Dependence**: No cloud account required. It runs completely offline.

---

## Getting Started

Watchman is written with highly optimized native code to run silently in the background with negligible CPU and RAM footprint. You can get started today by downloading the latest release for your platform.

We have a lot of exciting features planned for future releases, including advanced packet filters, custom warning alerts, and custom network profiles.

*Download Watchman today and take control of your internet connection.*`
  },
  {
    slug: "network-monitoring-best-practices",
    title: "Best Practices for Local Network Monitoring",
    date: "2026-06-25",
    description: "Learn how to detect abnormal network traffic, identify data leaks, and optimize your bandwidth usage with simple desktop utilities.",
    author: "Rayhan",
    category: "Guides",
    content: `Monitoring your local network traffic doesn't require a degree in systems administration. With the right tools and a few simple strategies, you can easily spot performance issues, identify background processes hogging your bandwidth, and keep your data secure.

Here are a few best practices to get you started.

---

## 1. Establish a Baseline

Before you can spot abnormal traffic, you need to know what *normal* looks like. 
Spend a couple of days checking your idle network consumption. 
- How much bandwidth does your system use when you are only editing text?
- What is your typical download speed during video calls?
- Which applications connect to the internet as soon as your system boots?

Once you have a baseline, rogue applications making unexpected connections will stand out instantly.

---

## 2. Check for Hidden Upgrades

Many modern applications automatically check for updates and download files in the background without prompting you. While keeping software up-to-date is good for security, it can choke your bandwidth during critical meetings or games.

Use a real-time monitor to check which apps are downloading in the background. If you spot a background updater using significant bandwidth, you can configure its settings to only update when the system is idle or download updates manually.

---

## 3. Identify High Latency Triggers

If your internet suddenly feels sluggish, the culprit might not be your ISP. It could be **bufferbloat**—high latency caused by another device or application uploading large files.

Keep an eye on active upload streams. Applications like cloud backups, file sharing clients, or video streaming can saturate your upload channel, causing ping spikes for everything else on your network. Knowing exactly which process is causing the surge lets you throttle it or pause it until you need it.`
  }
];
