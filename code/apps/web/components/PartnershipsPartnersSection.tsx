"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Building2, ExternalLink, Sparkles } from "lucide-react";

type Partner = {
  id: number;
  name: string;
  url: string | null;
  logoUrl: string | null;
  blurb: string | null;
  partnerType: string | null;
  callout: string | null;
  featured: boolean;
  displayOrder: number;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function ScrollReveal({
  children,
  variants = fadeInUp,
  className = "",
}: {
  children: React.ReactNode;
  variants?: object;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const isLeft = index % 2 === 0;

  const logoSide = (
    <div
      className={`md:col-span-2 bg-gradient-to-br from-[#004080] to-[#003066] p-8 md:p-12 flex flex-col justify-center items-center text-white ${
        !isLeft ? "md:order-2" : ""
      }`}
    >
      <motion.div
        className="bg-white p-6 rounded-2xl mb-6 w-full max-w-xs flex items-center justify-center min-h-[120px]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {partner.logoUrl ? (
          <img
            src={partner.logoUrl}
            alt={`${partner.name} logo`}
            className="w-full h-auto object-contain max-h-28"
          />
        ) : (
          <Building2 className="h-14 w-14 text-[#004080]/40" />
        )}
      </motion.div>

      {partner.callout && (
        <p className="text-center text-white/90 text-base font-medium italic">
          &ldquo;{partner.callout}&rdquo;
        </p>
      )}
    </div>
  );

  const contentSide = (
    <div
      className={`md:col-span-3 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50/30 ${
        !isLeft ? "md:order-1" : ""
      }`}
    >
      {partner.partnerType && (
        <div className="mb-4 inline-block w-fit rounded-full bg-[#f7941D] px-4 py-1 text-sm text-white">
          {partner.partnerType}
        </div>
      )}

      <h3 className="text-3xl md:text-4xl font-bold text-[#004080] mb-4">
        {partner.name}
      </h3>

      {partner.blurb && (
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          {partner.blurb}
        </p>
      )}

      {partner.url && (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#f7941D] font-bold hover:underline w-fit"
        >
          Visit Website
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );

  return (
    <ScrollReveal variants={isLeft ? slideInLeft : slideInRight}>
      <div className="overflow-hidden rounded-3xl border-2 border-[#f7941D]/20 shadow-lg hover:shadow-2xl transition-all duration-500">
        <div className="grid md:grid-cols-5">
          {logoSide}
          {contentSide}
        </div>
      </div>
    </ScrollReveal>
  );
}

export function PartnershipsPartnersSection({
  partners,
}: {
  partners: Partner[];
}) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#f7941D]/10 to-[#F79520]/5 rounded-full blur-3xl -z-0" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#004080]/10 to-blue-500/5 rounded-full blur-3xl -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-bold text-[#d56f00]">
            <Sparkles className="h-4 w-4" />
            Community Support
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#004080] mb-4">
            Community Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These organizations collaborate with A Woman&apos;s Worth to expand
            resources, programs, and community support.
          </p>
        </ScrollReveal>

        {partners.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-200 bg-white/80 py-16 text-center shadow-sm">
            <p className="text-neutral-500">
              Partner information will be added soon.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {partners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
