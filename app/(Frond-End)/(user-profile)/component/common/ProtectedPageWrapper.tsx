"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedPageWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // token extract helper
  const getCookieToken = () => {
    if (typeof document === "undefined") return null;

    const cookieString = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("tourAccessToken="));
    return cookieString?.split("=")[1] || null;
  };

  useEffect(() => {
    const token = getCookieToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    setChecking(false);

    // ⏱️ check every second if token is still present
    const interval = setInterval(() => {
      const token = getCookieToken();
      if (!token) {
        router.replace("/login");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
