"use client";
import { useReveal } from "@/components/useReveal";

export default function HomeClient({ children }: { children: React.ReactNode }) {
  useReveal();
  return <>{children}</>;
}
