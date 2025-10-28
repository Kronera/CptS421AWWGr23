export default function CtaBand() {
  return (
    <section className="reveal mx-auto max-w-5xl px-4">
      <div className="rounded-2xl bg-gradient-to-br from-[#0d4ea6] to-[#0a3680] p-10 text-center text-white shadow-lg">
        <h2 className="text-3xl font-bold">Get Involved Today</h2>
        <p className="mt-3 text-white/90">
          Every woman deserves to know her worth. Join our community and help us create lasting change.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/donate" className="rounded-full bg-[#f7941D] px-6 py-3 text-white btn-hover">Donate Now</a>
          <a href="/events" className="rounded-full bg-white/10 px-6 py-3 text-white hover:bg-white/20">Join an Event</a>
          <a href="/stories" className="rounded-full bg-white/10 px-6 py-3 text-white hover:bg-white/20">Share Your Story</a>
        </div>
      </div>
    </section>
  );
}