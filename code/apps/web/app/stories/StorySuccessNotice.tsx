"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function StorySuccessNotice() {
  const search = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (search.get("submitted") === "true") {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [search]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 rounded-md bg-green-600 text-white px-4 py-2 shadow-lg">
      Your story was submitted successfully!
    </div>
  );
}
