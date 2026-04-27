import { useState } from "react";
import { RedirectScreen } from "@/components/redirect-screen";
import { LinkDashboard } from "@/components/link-dashboard";
import { LoadingScreen } from "@/components/loading-screen";
import { on } from "events";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Simulated backend fetch - replace with actual API call
async function fetchLongUrl(shortCode: string): Promise<string> {
  // Simulate network delay
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock data - in production this would be an API call
  const mockUrls: Record<string, string> = {
    abc123: "https://github.com/vercel/next.js",
    xyz789: "https://vercel.com/docs/getting-started",
    demo: "https://example.com/very-long-url-that-was-shortened",
  };

  const url = mockUrls[shortCode];
  if (!url) {
    throw new Error("Link not found");
  }

  return url;
}

type View = "dashboard" | "redirect";

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [shortCode] = useState("abc123"); // Would come from URL params in production
  const [onComplete, setOnComplete] = useState<boolean>(false);

  if (view === "redirect") {
    return <RedirectScreen />;
  }

  return (
    <div className="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LinkDashboard />} />
          <Route path="/:shortCode" element={<RedirectScreen />} />
        </Routes>
      </BrowserRouter>
      {onComplete ? (
        <LinkDashboard />
      ) : (
        <LoadingScreen onComplete={onComplete} setOnComplete={setOnComplete} />
      )}
    </div>
  );
}
