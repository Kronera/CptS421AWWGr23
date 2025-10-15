export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL!;
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${CMS_URL}${path}`, { cache: 'no-store', ...init });
  if (!res.ok) throw new Error(`Strapi ${path} ${res.status}`);
  return res.json() as Promise<T>;
}
