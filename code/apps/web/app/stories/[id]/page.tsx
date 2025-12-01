import Link from "next/link";

export const revalidate = 0;

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const mediaUrl = (p?: string | null) =>
  !p ? "" : p.startsWith("http") ? p : `${CMS_URL}${p}`;
const pickImageUrl = (img: any): string | null =>
  img?.url || img?.data?.attributes?.url || (Array.isArray(img?.data) ? img.data[0]?.attributes?.url : null) || null;

type StoryItem = {
  id: number;
  documentId?: string | null;
  title: string;
  authorName?: string | null;
  coverUrl?: string | null;
  body?: any[] | null;
};

async function fetchStory(id: string): Promise<StoryItem | null> {
  const isDocId = isNaN(Number(id));
  const url = isDocId
    ? `${CMS_URL}/api/stories?filters[documentId][$eq]=${encodeURIComponent(id)}&populate=cover`
    : `${CMS_URL}/api/stories/${encodeURIComponent(id)}?populate=cover`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;

  const json = await res.json();
  const node = isDocId ? (json?.data?.[0] ?? null) : json?.data ?? null;
  if (!node) return null;

  const a = node.attributes ?? node;
  return {
    id: node.id ?? a.id,
    documentId: node.documentId ?? a.documentId ?? null,
    title: a.title ?? "Story",
    authorName: a.authorName ?? null,
    coverUrl: mediaUrl(pickImageUrl(a.cover)),
    body: a.body ?? null,
  };
}

function renderBlocks(blocks?: any[] | null) {
  if (!blocks?.length) return null;
  return (
    <div className="prose prose-neutral max-w-none">
      {blocks.map((b, i) => {
        if (b.type === "paragraph") {
          const text =
            Array.isArray(b.children)
              ? b.children.map((c: any) => c?.text ?? "").join("")
              : "";
          return <p key={i}>{text}</p>;
        }
        return <div key={i} />;
      })}
    </div>
  );
}

export default async function StoryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = await fetchStory(id);
  if (!story) return <div className="mx-auto max-w-4xl px-4 py-16">Story not found.</div>;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {/* Title band */}
      <div
        className="rounded-2xl px-6 py-5 text-white shadow"
        style={{
          background:
            "linear-gradient(135deg,#0a3680 0%,#0d4ea6 55%,#f79520 100%)",
        }}
      >
        <h1 className="text-2xl md:text-3xl font-extrabold">{story.title}</h1>
        {story.authorName ? (
          <p className="mt-1 text-white/85 text-sm">By {story.authorName}</p>
        ) : null}
      </div>

      {/* Cover with preserved aspect (no compression) */}
      {story.coverUrl ? (
        <div className="mt-5 overflow-hidden rounded-2xl border bg-white shadow">
          {/* Use a responsive wrapper to avoid forced heights */}
          <div className="relative w-full">
            {/* 16:9 by default; adjusts fluidly */}
            <div className="relative w-full aspect-[10/9] bg-neutral-100">
              <img
                src={story.coverUrl}
                alt=""
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            {renderBlocks(story.body)}
            <div className="mt-5">
              <Link
                href="/stories"
                className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-neutral-50"
              >
                Back to Stories
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border bg-white p-6 shadow">
          {renderBlocks(story.body)}
          <div className="mt-5">
            <Link
              href="/stories"
              className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-neutral-50"
            >
              Back to Stories
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
