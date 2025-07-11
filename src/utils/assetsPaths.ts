/**
 * Get the correct asset path for both development and production builds
 * @param path - Relative path to asset (without leading slash)
 * @returns Full path with base URL applied
 */
export function getAssetPath(path: string): string {
  // For external CDN resources, return as-is
  if (path.startsWith("http")) {
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Use Vite's BASE_URL for proper path resolution
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
