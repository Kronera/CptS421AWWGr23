"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Calendar, Tag, User, ArrowRight, Star } from "lucide-react";
import { useState, useRef } from "react";

export type NewsletterPost = {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  authorName: string | null;
  publishDate: string | null;
  coverUrl: string | null;
  featured: boolean;
};

const CATEGORY_COLORS: Record<string, string> = {
  "Community Update": "bg-blue-100 text-blue-800",
  "Event Recap":      "bg-amber-100 text-amber-800",
  "Partner Spotlight":"bg-purple-100 text-purple-800",
  "Announcement":     "bg-orange-100 text-orange-800",
  "Story":            "bg-green-100 text-green-800",
};

function fmtDate(iso?: string | null) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
    });
  } catch { return null; }
}

function PostCard({ post, featured = false }: { post: NewsletterPost; featured?: boolean }) {
  const href = `/newsletter/${encodeURIComponent(post.slug || post.documentId)}`;
  const dateStr = fmtDate(post.publishDate);
  const catColor = post.category ? (CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700") : null;

  if (featured) {
    return (
      <Link href={href} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="h-64 md:h-auto min-h-[280px] overflow-hidden bg-gradient-to-br from-[#004080] to-[#f7941D]">
              {post.coverUrl ? (
                <img
                  src={post.coverUrl}
                  alt={post.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="relative h-full w-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#004080] via-[#0d4ea6] to-[#f79520]" />
                  <img src="/branding/logo.png" alt="" className="relative w-36 opacity-90" />
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#f7941D] px-3 py-1 text-xs font-semibold text-white">
                  <Star className="h-3 w-3" /> Featured
                </span>
                {post.category && catColor && (
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${catColor}`}>
                    {post.category}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-extrabold text-[#004080] leading-snug mb-3 group-hover:text-[#f7941D] transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-neutral-600 line-clamp-3 mb-4">{post.excerpt}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-6">
                {dateStr && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {dateStr}
                  </span>
                )}
                {post.authorName && (
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" /> {post.authorName}
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-2 text-[#f7941D] font-semibold text-sm group-hover:gap-3 transition-all">
                Read Full Article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block h-full">
      <div className="h-full flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#004080] to-[#0d4ea6]">
          {post.coverUrl ? (
            <img
              src={post.coverUrl}
              alt={post.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#004080] via-[#0d4ea6] to-[#f79520]" />
              <img src="/branding/logo.png" alt="" className="relative w-20 opacity-85" />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.category && catColor && (
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${catColor}`}>
                {post.category}
              </span>
            )}
          </div>
          <h2 className="font-bold text-neutral-900 leading-snug mb-2 group-hover:text-[#f7941D] transition-colors line-clamp-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-sm text-neutral-600 line-clamp-3 mb-3 flex-1">{post.excerpt}</p>
          )}
          <div className="flex flex-wrap gap-3 text-xs text-neutral-400 mt-auto pt-3 border-t border-neutral-100">
            {dateStr && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {dateStr}
              </span>
            )}
            {post.authorName && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {post.authorName}
              </span>
            )}
          </div>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#f7941D] group-hover:gap-2 transition-all">
            Read More <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

type SignupState = "idle" | "submitting" | "success" | "error";

export default function NewsletterContent({ posts }: { posts: NewsletterPost[] }) {
  const featured = posts.find((p) => p.featured) ?? null;
  const rest = posts.filter((p) => !p.featured || p !== featured);

  const [email, setEmail] = useState("");
  const [signupState, setSignupState] = useState<SignupState>("idle");
  const [signupMsg, setSignupMsg] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (signupState === "submitting") return;
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setSignupState("error");
      setSignupMsg("Please enter a valid email address.");
      emailRef.current?.focus();
      return;
    }
    setSignupState("submitting");
    setSignupMsg("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (data.success) {
        setSignupState("success");
        setSignupMsg(data.message || "You're subscribed!");
        setEmail("");
      } else {
        setSignupState("error");
        setSignupMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setSignupState("error");
      setSignupMsg("Something went wrong. Please try again later.");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero + Signup */}
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg,#0a3680 0%,#0d4ea6 55%,#f79520 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none [background:radial-gradient(circle_at_20%_50%,white,transparent_60%)]" />
        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium mb-5">
            <Tag className="h-4 w-4" /> AWW Newsletter
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Stay Connected</h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8">
            Updates, event recaps, community stories, and partner news from A Woman's Worth.
          </p>

          {/* Inline signup */}
          {signupState === "success" ? (
            <motion.div
              className="mx-auto max-w-md rounded-2xl bg-white/15 backdrop-blur-sm px-6 py-4 text-white"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg font-semibold">🎉 {signupMsg}</p>
              <p className="text-sm text-white/75 mt-1">We'll keep you in the loop.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubscribe}
              noValidate
              className="mx-auto max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (signupState === "error") setSignupState("idle");
                  }}
                  placeholder="Your email address"
                  required
                  disabled={signupState === "submitting"}
                  className={`flex-1 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none
                    placeholder:text-gray-400 disabled:opacity-60 transition-all
                    focus:ring-2 focus:ring-white/60
                    ${signupState === "error" ? "bg-red-50 ring-2 ring-red-300" : "bg-white"}`}
                />
                <button
                  type="submit"
                  disabled={signupState === "submitting"}
                  className="rounded-xl px-6 py-3 text-sm font-semibold bg-[#f7941D] text-white
                    hover:bg-[#e8830e] active:scale-95 transition-all disabled:opacity-60
                    whitespace-nowrap shadow-lg shadow-black/20"
                >
                  {signupState === "submitting" ? "Subscribing…" : "Subscribe"}
                </button>
              </div>
              {signupState === "error" && signupMsg && (
                <p className="mt-2 text-sm text-red-200" role="alert">{signupMsg}</p>
              )}
            </motion.form>
          )}
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-24 text-neutral-400">
            <p className="text-xl font-medium">No posts yet — check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[#f7941D] mb-4">Featured</h2>
                <PostCard post={featured} featured />
              </motion.div>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-6">
                  {featured ? "More Posts" : "All Posts"}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <motion.div key={post.id} variants={fadeUp}>
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
