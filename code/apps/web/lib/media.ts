
export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
export function mediaUrl(path?: string | null) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${CMS_URL}${path}`;
}
