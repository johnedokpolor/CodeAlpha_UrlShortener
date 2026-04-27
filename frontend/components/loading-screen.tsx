import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link2 } from "lucide-react";

interface LoadingScreenProps {
  onComplete: boolean;
  setOnComplete: Dispatch<SetStateAction<boolean>>;
}

export function LoadingScreen({
  onComplete,
  setOnComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setOnComplete(true), 200);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center">
            <Link2 className="w-8 h-8 text-background" />
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-foreground/10 animate-pulse" />
        </div>

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight dark:text-white">
            snip
          </h1>
          <p className="text-sm mt-1 dark:text-white">Link Shortener</p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
