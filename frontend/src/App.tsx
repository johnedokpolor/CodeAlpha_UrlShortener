import { useState } from "react";
import { RedirectScreen } from "@/components/redirect-screen";
import { LinkDashboard } from "@/components/link-dashboard";
import { LoadingScreen } from "@/components/loading-screen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [onComplete, setOnComplete] = useState<boolean>(false);

  return (
    <div className="dark">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              onComplete ? (
                <LinkDashboard />
              ) : (
                <LoadingScreen
                  onComplete={onComplete}
                  setOnComplete={setOnComplete}
                />
              )
            }
          />
          <Route path="/:shortCode" element={<RedirectScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
