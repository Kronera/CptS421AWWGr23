"use client";

import { motion } from "motion/react";
import { Handshake } from "lucide-react";

export function PartnershipsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#062f73] via-[#0a4fa8] to-[#f79520] px-6 py-24 text-center text-white">
      {/* decorative radial highlights */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_15%_20%,white,transparent_28%),radial-gradient(circle_at_85%_15%,white,transparent_24%),radial-gradient(circle_at_50%_100%,white,transparent_30%)]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur"
        >
          <Handshake className="h-8 w-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-6xl font-black tracking-tight"
        >
          Partner with Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 text-xl md:text-2xl text-white/90 leading-8"
        >
          Together, we can create lasting change and empower women to reach
          their full potential
        </motion.p>
      </div>
    </section>
  );
}
