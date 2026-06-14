# Watchman Tab And Widget Guide

This guide explains Watchman tab by tab, including the Preferences window and
the taskbar widget. It is written so a developer, designer, website writer, or
another AI assistant can understand what each area does and why it matters.

Watchman is a Windows desktop app for live network monitoring. It shows
download and upload speed, CPU and RAM usage, traffic history, per-app
bandwidth, connection quality, update status, export tools, and a compact
taskbar widget.

## Main App Layout

Watchman opens as a compact desktop window instead of a full-screen app. The
main navigation has five tabs:

- Dashboard
- Data
- Apps
- Network
- Tools

The title bar also contains:

- Settings button, which opens Preferences.
- Theme button, which cycles the visual theme.
- Minimize button.
- Close button, which closes the window to tray instead of fully quitting.

The bottom status bar shows the current connection state and app uptime.

## Dashboard Tab

The Dashboard is the main live overview. It is the first place users look when
they want to know what their PC is doing right now.

### What It Shows

- Live download speed.
- Live upload speed.
- Current session download total.
- Current session upload total.
- Current session combined total.
- Reset Session button.
- Usage Snapshot for the current period.
- Network usage health status, such as Normal or Heavy.
- CPU usage gauge.
- RAM usage gauge.
- GPU usage gauge.
- Expandable Network Details panel.
- Expandable System Information panel.

### What Each Feature Does

Live speed cards show the current real-time traffic rate. They answer the
simple question: "Is something using my internet right now?"

Current Session shows traffic counted since Watchman opened or since the user
pressed Reset Session. This is useful when a user wants to measure one browsing
session, one gaming session, one download, or one work period without mixing it
with older history.

Usage Snapshot shows traffic totals from saved history. It gives the user a
quick local traffic summary without opening the full Data tab.

The health status card turns network usage into a simple human-readable state.
Instead of forcing the user to read several numbers, Watchman says whether the
current usage looks normal or heavy.

CPU, RAM, and GPU gauges show whether network activity is connected to system
load. For example, if download speed is high and CPU or RAM is also high, the
user can quickly understand that the machine is busy, not just the network.

Network Details expands into more connection information. System Information
expands into more hardware and system data.

### Why It Is Unique

The Dashboard combines network speed, session usage, traffic status, and system
gauges in one compact view. Many apps only show network speed, and Windows
Settings only shows larger historical totals. Watchman makes the live condition
of the PC readable at a glance.

## Data Tab

The Data tab is for history. It helps users understand how much traffic they
used over time.

### What It Shows

- Daily, Weekly, and Monthly mode selector.
- Total Usage summary.
- Download summary.
- Upload summary.
- Today filter.
- Last 7 Days filter.
- Monthly filter.
- Yearly filter.
- Traffic history chart.
- Date/month range label.
- Previous period comparison.
- Data limit progress.
- Data limit input.

### What Each Feature Does

Daily, Weekly, and Monthly modes change how Watchman groups traffic records.
Daily is best for exact day-by-day tracking. Weekly is better for a wider usage
pattern. Monthly is useful for billing-cycle style thinking.

The summary cards show total traffic, download traffic, and upload traffic for
the selected period.

The chart turns saved local history into a visual timeline. The user can quickly
see which days were heavy, which days were quiet, and whether usage is going up
or down.

The filter buttons let the user move between short-term and long-term views:

- Today: only the current day.
- Last 7 Days: recent usage pattern.
- Monthly: one month of daily totals.
- Yearly: month-by-month yearly overview.

The comparison card compares the selected period with the previous period. This
helps the user see whether their usage increased or decreased.

The Data Limit area lets the user set a monthly cap in GB. Watchman can then
show progress toward that cap and warn the user as usage gets close.

### Why It Is Unique

The Data tab is local-first traffic history. It is designed for users who care
about data caps, mobile hotspot usage, broadband limits, or simply knowing where
their traffic went. The important idea is that Watchman preserves daily history
locally instead of depending on an online account.

## Apps Tab

The Apps tab shows which applications are connected and using the network.

### What It Shows

- Application name.
- Live or background status.
- Last active time.
- Download total or current rate.
- Upload total or current rate.
- Connection count.
- App count badge.
- Usage by App button.

### What Each Feature Does

The app table lists processes that are currently active or recently active on
the network. This helps users understand which app is using data instead of only
seeing one combined system total.

Live status means the app is actively using the network now. Background status
means the app was recently active or still has connections, but may not be
moving data at that moment.

Download and upload columns show traffic direction. This is important because
some apps mostly download data, while others upload or sync in the background.

Connection count shows how many network connections the process has. A high
connection count can explain why an app feels busy even if speed is not very
high at that exact second.

The Usage by App button opens the Windows Data Usage page. Watchman does not
need to fully copy Windows' own per-app historical data; it gives users a quick
shortcut to the native Windows page when they want the operating system's
official per-app usage view.

### Admin Mode Note

Some per-app bandwidth details can require administrator mode on Windows. If
Watchman is not running as administrator, the Apps tab may still show app names
and connection counts, but exact per-app download/upload numbers can be limited.

Users can right-click the Watchman tray icon and choose Run as Administrator
when they need deeper per-app bandwidth visibility.

### Why It Is Unique

The Apps tab makes network usage understandable by application. Instead of only
knowing "my PC is using data," the user can see whether it is a browser, Discord,
Windows services, a download manager, an AI tool, or another background process.

## Network Tab

The Network tab is for connection quality and speed testing.

### What It Shows

- Connection Health status.
- Latency.
- Jitter.
- Packet loss.
- Connection type.
- SSID or adapter name.
- Link speed.
- Local IP address.
- Connection visual indicator.
- M-Lab speed test.
- Download speed test result.
- Upload speed test result.
- Speed test latency.
- Speed test server.
- Last tested time.

### What Each Feature Does

Connection Health summarizes the network into a simple state such as Stable,
Fair, Unstable, or Offline.

Latency shows the average response time. Lower latency usually means the
connection feels more responsive.

Jitter shows how much latency changes between replies. Low jitter is important
for calls, gaming, streaming, and remote work.

Packet loss shows whether requests are being dropped. Packet loss usually means
the connection is unstable even if raw speed looks okay.

The Connection card shows what Watchman thinks the active connection is:
Ethernet, Wi-Fi, Cellular, or another detected type. It also shows the adapter
or SSID, link speed, and local IP address.

The connection visual changes based on connection type. Ethernet should use a
wired-link style visual, Wi-Fi should use Wi-Fi signal arcs, and Cellular should
use mobile-style bars.

The speed test uses M-Lab NDT7. M-Lab selects an available measurement server
and runs a test for download, upload, and latency. Watchman shows the results
inside the Network tab.

### Why It Is Unique

The Network tab does more than show "connected" or "not connected." It explains
connection quality. A user can have fast internet but poor jitter or packet
loss. Watchman puts those signals together so the user can understand whether
their connection is actually healthy.

## Tools Tab

The Tools tab is the maintenance area.

### What It Shows

- Network Troubleshooter.
- Run Diagnostics button.
- Suggested fixes area.
- Updates section.
- Check for Updates button.
- Install Update button when an update is available.
- Export CSV section.
- Export period selector.
- Export month or year selector.
- Download CSV button.

### What Each Feature Does

Network Troubleshooter runs basic network checks. It is meant to help users
understand common connection problems without opening several Windows tools.

Diagnostics can check things like DNS, route, internet reachability, and common
network failure points. When Watchman can suggest a fix, it shows the suggestion
inside the Tools tab.

Updates checks GitHub/Tauri updater release information. If a newer signed
release is available, Watchman can show update status and offer an install
action.

Export CSV lets the user export saved traffic history. The user can choose a
period and a year or month, then download a CSV file for spreadsheets, reports,
or backup.

### Why It Is Unique

The Tools tab keeps support actions inside the app. The user does not need to
remember where Windows network pages, update checks, or data exports live.
Watchman gives them one small maintenance panel.

## Preferences Window

Preferences is opened from the gear icon in the title bar or from the tray menu.
It is not one of the main five tabs, but it controls important app behavior.

### What It Shows

- Run on Windows Startup.
- Use Bits/s instead of Bytes/s.
- Hide Hardware Gauges.
- Monthly Data Limit (GB).
- High Usage Warnings.
- Today's Traffic warning.
- Memory Usage warning.
- CPU Temperature warning.
- GPU Temperature warning.
- Disk Temperature warning.
- Mainboard Temperature warning.
- Current app version label.
- Use Recommended button.
- Undo button.
- Save button.

### What Each Feature Does

Run on Windows Startup starts Watchman automatically when Windows starts.

Use Bits/s instead of Bytes/s changes the speed unit style. Some users prefer
bits per second because internet providers advertise speeds in Mbps. Others
prefer bytes per second because file downloads are usually shown in MB/s.

Hide Hardware Gauges removes CPU, RAM, and hardware gauges from the Dashboard
for users who want a cleaner network-only view.

Monthly Data Limit lets the user define a monthly usage cap. This works with the
Data tab and warning system.

High Usage Warnings let the user choose when Watchman should warn them. The user
can enable or disable each warning separately.

Today's Traffic warning is useful for users with strict daily or monthly data
limits.

Memory Usage warning helps users notice when RAM usage is too high.

Temperature warnings help users notice high CPU, GPU, disk, or mainboard
temperature. These may require administrator mode or system sensor access on
some PCs.

Use Recommended applies a sensible default set of preferences.

Undo reverts unsaved preference changes.

Save writes the preference changes.

### Why It Is Unique

Preferences lets Watchman adapt to different users. Some users want a full
system monitor. Some only want network traffic. Some need strict warnings. Some
care about temperature. Watchman keeps those choices in one focused place.

## Taskbar Widget

The taskbar widget is a compact Watchman window embedded into the Windows
taskbar. It is separate from the main app window.

### What It Shows

In full mode, the widget shows:

- Upload speed.
- Download speed.
- CPU percentage.
- Memory percentage.

In network-only mode, the widget shows:

- Upload speed.
- Download speed.

The widget uses a compact monospace layout so values stay readable in the small
taskbar area. It also adapts its text colors for light and dark taskbar themes.

### How It Works

Watchman creates a separate taskbar widget window from `src/taskbar.html`.
The Rust backend embeds that window into the Windows taskbar area and keeps it
positioned while Watchman is running.

The backend sends live metrics to both the main app and the taskbar widget. The
widget listens for those metrics and updates the upload, download, CPU, and
memory values.

The widget is meant to stay visible while the main window is closed to tray. The
main window can be closed, but the widget can keep showing live speed.

### Where To Right-Click

There are two different right-click places:

1. Right-click the taskbar widget itself.
2. Right-click the Watchman tray icon near the Windows clock or hidden icons
   menu.

These are not the same menu.

Right-click the taskbar widget when you want quick widget actions, history
shortcuts, or session reset.

Right-click the tray icon when you want app-level actions such as opening
Preferences, hiding/showing the widget, restarting, running as administrator,
or quitting Watchman.

### Taskbar Widget Right-Click Menu

Right-click directly on the small Watchman speed widget in the Windows taskbar.
The widget menu contains:

- Open Dashboard
- Open History
- View
- Widget
- Reset Session Counters
- Exit

The View submenu contains:

- Today
- Last 7 Days
- Monthly

The Widget submenu contains:

- Show Network Only
- Show CPU/MEM

### What The Widget Menu Options Do

Open Dashboard opens the main Watchman window on the Dashboard tab.

Open History opens the main Watchman window on the Data tab, usually focused on
recent history.

View > Today opens the Data tab with the Today history filter.

View > Last 7 Days opens the Data tab with the Last 7 Days filter.

View > Monthly opens the Data tab with the Monthly history filter.

Widget > Show Network Only changes the widget into a smaller network-only view
with upload and download speed.

Widget > Show CPU/MEM changes the widget into the fuller view with upload,
download, CPU, and memory.

Reset Session Counters resets the current session totals, the same idea as the
Dashboard Reset Session button.

Exit fully quits Watchman.

### Left-Click And Double-Click Behavior

The widget listens for quick left-click actions. A double-click, or two quick
left clicks in the same spot, opens the history view in the main Watchman
window.

This gives the user a fast path from the taskbar speed display into traffic
history.

### Tray Icon Menu

The tray icon is the Watchman icon near the Windows clock. If it is hidden,
click the Windows hidden icons arrow first, then right-click the Watchman icon.

The tray menu contains:

- Open Watchman
- Preferences
- Show/Hide Widget
- Run as Administrator
- Restart Watchman
- Help & About
- Quit

### What The Tray Menu Options Do

Open Watchman opens the main app window.

Preferences opens the Preferences window.

Show/Hide Widget toggles the embedded taskbar widget. Use this when you want to
temporarily remove the widget from the taskbar without fully quitting Watchman.

Run as Administrator restarts Watchman with administrator permissions. This can
help with per-app bandwidth and temperature features that need deeper Windows
access.

Restart Watchman closes and reopens the app.

Help & About shows app information and quick usage tips.

Quit fully exits Watchman.

### How To Hide The Taskbar Widget

To hide the widget:

1. Find the Watchman tray icon near the Windows clock.
2. If you do not see it, click the hidden icons arrow in the notification area.
3. Right-click the Watchman tray icon.
4. Click Show/Hide Widget.

To show it again, repeat the same steps and click Show/Hide Widget again.

Important: hiding the widget is controlled from the tray icon menu, not from the
widget's own right-click menu.

### How To Close The Main Window Without Quitting

Click the X button in the Watchman title bar. Watchman hides the main window to
the system tray instead of closing the entire app.

The widget and monitoring can continue running while the main window is hidden.

To reopen the main window, click the tray icon or choose Open Watchman from the
tray menu.

### How To Fully Quit Watchman

Use one of these methods:

- Right-click the Watchman tray icon and choose Quit.
- Right-click the taskbar widget and choose Exit.

Closing the main window with X is not the same as quitting.

### Why The Taskbar Widget Is Unique

The widget is Watchman's fastest glanceable feature. Users do not need to open a
window to know whether their network is active. They can see upload/download
speed directly in the Windows taskbar, and they can jump from there into
Dashboard, History, or quick view filters.

## Theme Behavior

Watchman supports multiple visual themes, including light, dark, and focus
style. The theme button in the title bar cycles the visual style.

Themes affect the main app UI, including cards, navigation, buttons, gauges,
tables, and the Tools area. The taskbar widget separately adapts to the Windows
taskbar's light or dark appearance so it stays readable.

## Update Behavior

Watchman supports signed Tauri updater releases through GitHub Releases.

The app can check for updates from the Tools tab. When an update is available,
Watchman can show an update card and install the update.

The startup update prompt can also notify the user that a newer version is
available. Clicking the prompt takes the user to the Tools tab updater area.

## Local Data And Privacy

Watchman stores traffic history and settings locally on the user's PC. The main
local storage is under:

```text
%APPDATA%\Watchman\
```

Important local files include:

```text
settings.json
history.json
```

The history file stores date-keyed traffic records. This makes charts and CSV
exports possible without requiring a cloud account.

The M-Lab speed test is different from local traffic history. M-Lab may collect
public IP and test data for internet research when the user runs a speed test.
Watchman displays that note in the Network tab.

## Quick User Guide

Use Dashboard when you want to know what is happening right now.

Use Data when you want to understand traffic history.

Use Apps when you want to know which apps are using the network.

Use Network when you want to check connection quality or run a speed test.

Use Tools when you want diagnostics, updates, or CSV export.

Use Preferences when you want to change startup, units, warnings, data limits,
or dashboard hardware visibility.

Use the taskbar widget when you want live speed without opening the app.

Right-click the widget for widget shortcuts.

Right-click the tray icon for app-level controls, including Show/Hide Widget,
Run as Administrator, Preferences, Restart, and Quit.
