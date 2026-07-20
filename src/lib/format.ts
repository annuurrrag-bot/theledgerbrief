/**
 * Formats a Unix timestamp (seconds) the way the site's masthead dates
 * are styled elsewhere, e.g. "Tuesday, July 07".
 */
export function formatBriefDate(unixSeconds: number | null): string {
  if (!unixSeconds) return "";
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  });
}
