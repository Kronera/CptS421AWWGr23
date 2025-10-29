type Props = {
  title: string;
  excerpt?: string;
  image?: string;
  href: string;
  tag?: string;
  readTime?: string;
  focalY?: "top" | "center" | "bottom";
};

const FALLBACK_STORY_IMG = "/branding/story-fallback.jpg";

export default function StoryCard({ title, excerpt, image, href, tag, readTime, focalY }: Props) {
  const src = image || FALLBACK_STORY_IMG;
  const objPos = focalY === "top" ? "50% 0%" : focalY === "bottom" ? "50% 100%" : "50% 50%";

  return (
    <article className="reveal rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img src={src} alt="" className="h-60 w-full rounded-t-2xl object-cover" style={{ objectPosition: objPos }} />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {tag && <span className="rounded-full bg-[#f7941D] px-2 py-1 text-xs font-medium text-white">{tag}</span>}
          {readTime && <span className="rounded-full bg-black/60 px-2 py-1 text-xs text-white">{readTime}</span>}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {excerpt && <p className="mt-2 text-sm text-gray-600">{excerpt}</p>}

        <a
          href={href}
          className="mt-5 inline-flex items-center justify-center rounded-md border border-[#f7941D] px-4 py-2 text-[#f7941D] transition hover:bg-[#f7941D] hover:text-white"
        >
          Read Full Story <span className="ml-2">→</span>
        </a>
      </div>
    </article>
  );
}
