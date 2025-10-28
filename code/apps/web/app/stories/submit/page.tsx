"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

async function downscaleImage(file: File, maxDim = 1600, quality = 0.82): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  
  const scale = Math.min(1, maxDim / Math.max(width, height));
  const tw = Math.round(width * scale);
  const th = Math.round(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = tw; canvas.height = th;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0, tw, th);

  const blob: Blob = await new Promise((res) => canvas.toBlob(b => res(b!), 'image/jpeg', quality));
  return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
}

export default function SubmitStoryPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function onPickFile() {
    fileRef.current?.click();
  }
  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    if (!f) { setImage(null); setPreview(null); return; }

    // gate: show message if absurdly large before compressing (optional)
    if (f.size > 25 * 1024 * 1024) {
      alert('Please choose a file under 25 MB.');
      return;
    }

    // downscale anything over ~1.5MB
    const processed = f.size > 1.5 * 1024 * 1024 ? await downscaleImage(f) : f;

    setImage(processed);
    setPreview(URL.createObjectURL(processed));
  }


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const fd = new FormData();
    fd.append("authorName", authorName);
    fd.append("title", title);
    fd.append("body", body);
    if (image) fd.append("image", image);

    const res = await fetch("/api/stories/submit", { method: "POST", body: fd });
    setSubmitting(false);

    if (res.ok) {
      router.push("/stories?submitted=true");
    } else {
      const j = await res.json().catch(() => null);
      setErrorMsg(
        j?.stage === "upload"
          ? "We couldn't upload your image. Please try a smaller file or different format."
          : "Could not submit your story. Please try again."
      );
      // Keep data on screen; do not redirect.
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-[var(--aww-navy)] text-center">Share Your Story</h1>
      <p className="mt-2 text-center text-neutral-600">
        Tell us how A Woman's Worth has impacted your life.
      </p>

      {errorMsg ? (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg} If this keeps happening, email us at <a href="mailto:info@awomansworth.org" className="underline">info@awomansworth.org</a>.
          <button onClick={onSubmit} className="ml-3 underline">Try again</button>
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-8 space-y-6 rounded-2xl border bg-white p-6 shadow">
        <div className="grid gap-4">
          <label className="text-sm font-medium">Your Name</label>
          <input
            className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-[#f7941D]"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </div>

        <div className="grid gap-4">
          <label className="text-sm font-medium">Story Title</label>
          <input
            className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-[#f7941D]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A moment I won’t forget"
            required
          />
        </div>

        <div className="grid gap-4">
          <label className="text-sm font-medium">Your Story</label>
          <textarea
            className="min-h-[140px] rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-[#f7941D]"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your story here..."
            required
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm font-medium">Photo (optional)</label>

          {/* Image actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onPickFile}
              className="rounded-md border px-4 py-2 transition hover:bg-neutral-50"
            >
              Upload Photo
            </button>
            {image ? (
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="rounded-md border px-4 py-2 text-red-600 transition hover:bg-red-50"
              >
                Remove
              </button>
            ) : null}
          </div>

          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />

          {preview ? (
            <div className="overflow-hidden rounded-xl border bg-neutral-50">
              {/* preserve aspect ratio; don’t distort */}
              <div className="aspect-[16/9] w-full">
                <img src={preview} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
          ) : null}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-[var(--aww-navy)] px-6 py-3 font-medium text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit Story"}
          </button>
        </div>

        <p className="text-xs text-neutral-500">
          Submissions are reviewed before publishing. By submitting, you agree that we may edit for clarity/length.
        </p>
      </form>
    </main>
  );
}
