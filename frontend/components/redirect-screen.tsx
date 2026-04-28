import { useEffect, useState } from "react";
import { Link2, ExternalLink, AlertCircle } from "lucide-react";
import api from "@/hooks/axios-instance";
import { useParams } from "react-router-dom";

type RedirectState = "loading" | "redirecting" | "error";

export function RedirectScreen({}) {
  const { shortCode } = useParams();
  const [state, setState] = useState<RedirectState>("loading");
  const [destinationUrl, setDestinationUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  async function fetchAndRedirect() {
    try {
      const response = await api.get(`/${shortCode}`);
      console.log(response.data);
      setState("redirecting");

      window.location.href = response.data.originalUrl;
    } catch (error) {
      setState("error");
      setError("This link may be broken or expired");
    }
  }
  useEffect(() => {
    fetchAndRedirect();
  }, [0]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        {/* Logo */}
        <div className="relative">
          <div className="w-14 h-14 rounded-xl bg-foreground flex items-center justify-center">
            <Link2 className="w-7 h-7 text-background" />
          </div>
          {state === "loading" && (
            <div className="absolute -inset-2 rounded-2xl border-2 border-foreground/20 animate-ping" />
          )}
        </div>

        {/* Content based on state */}
        {state === "loading" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-medium">Looking up your link</h1>
              <p className="text-sm text-muted-foreground">
                snip0.vercel.app/<span className="font-mono">{shortCode}</span>
              </p>
            </div>

            {/* Loading dots */}
            <div className="flex gap-1.5">
              <div
                className="w-2 h-2 rounded-full bg-foreground animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-foreground animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-foreground animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}

        {state === "redirecting" && destinationUrl && (
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-medium">Redirecting you now</h1>
              <p className="text-sm text-muted-foreground">
                Taking you to your destination
              </p>
            </div>

            {/* Destination preview */}
            <div className="w-full p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                <p className="text-sm font-mono dark:text-white truncate">
                  {destinationUrl}
                </p>
              </div>
            </div>

            {/* Animated arrow */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-0.5 bg-foreground/30 rounded-full overflow-hidden">
                <div className="w-full h-full bg-foreground animate-[slide_1s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-medium">Link not found</h1>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>

            <a
              href="/"
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              Go to homepage
            </a>
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-muted-foreground mt-4">
          Powered by <span className="font-medium">snip0</span>
        </p>
      </div>
    </div>
  );
}
