---
title: "Deep Dive: How Watchman Keeps You in Control of Your Network"
date: "2026-06-26"
description: "An in-depth look at Watchman's architecture, its five main tabs, preferences, and our signature real-time taskbar widget."
author: "Rayhan"
category: "Product Deep-Dive"
---

Watchman was built to answer a simple, recurring question: *What is my computer doing on the internet right now?* 

Many network monitors are bloated, require complex setups, or upload your personal browsing history to a cloud server. Watchman is different. It is a lightweight, local-first utility built on a modern desktop stack (Tauri 2 & Rust) that keeps all your network data exactly where it belongs: on your computer.

In this deep dive, we will explain exactly how Watchman works under the hood, how to navigate its five core sections, and how to get the most out of our custom taskbar widget.

---

## Under the Hood: The Architecture

Watchman is built using **Tauri 2** and **Rust** on the backend, combined with a clean HTML/CSS/JavaScript frontend. 

By leveraging Rust for low-level systems calls, Watchman queries active network adapters, gathers per-app connection metrics, and polls hardware temperature sensors with negligible CPU and RAM overhead. 

All your settings and traffic logs are saved locally to standard JSON files on your hard drive:
* `settings.json`: Your startup preferences, color theme choice, and warning limits.
* `history.json`: Date-keyed network volume metrics (downloads/uploads) stored locally for historical chart rendering and CSV data exports.

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
* **Sensory Warnings**: Configure customizable warning popups when Today's traffic exceeds a limit, or if hardware temperatures (CPU, GPU, hard drives, or motherboard) exceed your safe threshold.
