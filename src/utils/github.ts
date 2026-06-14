export const handleDownload = async (e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  
  // Optional: show some loading state if needed, but fetch is usually very fast
  try {
    const res = await fetch("https://api.github.com/repos/rayhan138/Watchman/releases/latest");
    const data = await res.json();
    
    // Look for a Windows installer (.exe) or an archive (.zip)
    const asset = data.assets?.find((a: any) => a.name.endsWith('.exe') || a.name.endsWith('.zip'));
    
    if (asset && asset.browser_download_url) {
      // Trigger direct download without leaving the page
      window.location.href = asset.browser_download_url;
    } else {
      // Fallback if no .exe or .zip is attached to the release yet
      window.open("https://github.com/rayhan138/Watchman/releases/latest", "_blank");
    }
  } catch (err) {
    // Fallback if API rate limited or offline
    window.open("https://github.com/rayhan138/Watchman/releases/latest", "_blank");
  }
};
