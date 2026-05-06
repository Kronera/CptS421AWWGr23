import NewsletterContent, { type NewsletterPost } from "@/components/NewsletterContent";
import { CMS_URL as CMS_URL_FROM_LIB } from "@/lib/strapi";

export const revalidate = 30;

const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL || CMS_URL_FROM_LIB || "http://localhost:1337";

const mediaUrl = (p?: string | null) =>
  !p ? null : p.startsWith("http") ? p : `${CMS_URL}${p}`;

const pickImage = (img: any): string | null =>
  img?.url ||
  img?.data?.attributes?.url ||
  (Array.isArray(img?.data) ? img.data[0]?.attributes?.url : null) ||
  null;

async function getNewsletterPosts(): Promise<NewsletterPost[]> {
  try {
    const url =
      `${CMS_URL}/api/newsletter-posts?` +
      `populate=coverImage` +
      `&filters[active][$eq]=true` +
      `&sort=createdAt:desc` +
      `&pagination[pageSize]=100`;

    const res = await fetch(url, { next: { revalidate: 30 } });

    if (!res.ok) return [];

    const rows: any[] = (await res.json())?.data ?? [];

    return rows.map((row) => {
      const a = row?.attributes ?? row;
      const img = pickImage(a?.coverImage);

      return {
        id: row.id ?? a.id,
        documentId: row.documentId ?? a.documentId ?? String(row.id),
        slug: a?.slug ?? row.documentId ?? String(row.id),
        title: a?.title ?? "Newsletter Post",
        excerpt: a?.excerpt ?? "",
        category: a?.category ?? null,
        authorName: a?.authorName ?? null,
        publishDate: row.createdAt ?? null,
        coverUrl: img ? mediaUrl(img) : null,
        featured: a?.featured ?? false,
      } as NewsletterPost;
    });
  } catch {
    return [];
  }
}

export default async function NewsletterPage() {
  const posts = await getNewsletterPosts();

  return <NewsletterContent posts={posts} />;
}