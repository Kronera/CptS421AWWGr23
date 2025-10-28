export default function AboutBand() {
  return (
    <section className="py-14 reveal">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          About <span className="text-[#f7941D]">A Woman&apos;s Worth</span>
        </h2>
        <p className="mt-6 text-gray-700 text-lg leading-7">
          We believe every woman has inherent worth and unlimited potential. Through mentorship,
          community support, and empowerment programs, we help women discover their strength,
          pursue their dreams, and create positive change in their lives and communities.
        </p>
        <a
          href="/about"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#f7941D] px-6 py-3 text-white btn-hover"
        >
          Learn More About Our Impact
          <span className="ml-2">→</span>
        </a>
      </div>
    </section>
  );
}
