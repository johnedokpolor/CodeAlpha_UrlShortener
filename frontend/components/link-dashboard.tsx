import { useEffect, useState } from "react";
import {
  Link2,
  Copy,
  ExternalLink,
  BarChart3,
  Plus,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import api from "@/hooks/axios-instance";
import NoLinks from "./no-links";
import SnippingLink from "./snipping-link";
import Error from "./error";
import FetchingLinks from "./fetching-links";
import SnippedLink from "./snipped-link";

interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
}

export function LinkDashboard() {
  const [links, setLinks] = useState<ShortenedLink[] | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [stats, setStats] = useState<number | null>(null);
  const [loading, setLoading] = useState<string | boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUrls = async () => {
    try {
      const response = await api.get("/api/urls");
      setLinks(response.data);
      console.log(response.data);
    } catch (error) {
      setError("Failed to fetch Urls");
      console.log(error);
    }
  };
  const getStats = async () => {
    try {
      const response = await api.get("/api/stats");
      setStats(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUrls();
    getStats();
    console.log("useffect triggered");
  }, [0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl.trim()) {
      alert("A Url must be provided");
      return;
    }

    try {
      setLoading("Snipping");
      setError(null);
      setShortUrl(null);
      const response = await api.post("/api/urls", { originalUrl });
      console.log(response);
      setOriginalUrl("");
      setShortUrl(response.data.shortUrl);
      // getUrls();
    } catch (error) {
      setError("Failed to snip link");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (shortCode: string, id: string) => {
    await navigator.clipboard.writeText(`snip0.vercel.app/${shortCode}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const handleRefresh = () => {
    setError(null);
    getStats();
    getUrls();
  };

  const totalClicks = stats;

  return (
    <div className="min-h-screen  bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
              <Link2 className="w-4 h-4 text-background" />
            </div>
            <span className="text-lg font-semibold tracking-tight">snip0</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>{totalClicks} clicks</span>
            </div>
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              <span>{links?.length} links</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Create new link */}
        <Card className="p-6 mb-12">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              type="url"
              placeholder="https://example.com"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="flex-1 h-11"
            />
            <Button type="submit" className="h-11 px-6 gap-2">
              <Plus className="w-4 h-4" />
              Shorten
            </Button>
          </form>
        </Card>

        {/* Links list */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            Recent Links
          </h2>
          {!links && !error && <FetchingLinks />}
          {error && (
            <Error
              error={error}
              handleSubmit={handleSubmit}
              handleRefresh={handleRefresh}
            />
          )}
          {loading && <SnippingLink originalUrl={originalUrl} />}
          {shortUrl && (
            <SnippedLink shortUrl={shortUrl} setShortUrl={setShortUrl} />
          )}

          {links?.length === 0 ? (
            <NoLinks />
          ) : (
            !loading &&
            !shortUrl &&
            !error &&
            links?.map((link) => (
              <Card
                key={link.id}
                className="p-4 group hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Short URL */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <a
                        href={`https://snip0.vercel.app/${link.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline text-foreground"
                      >
                        snip0.vercel.app/{link.shortCode}
                      </a>
                      <button
                        onClick={() => handleCopy(link.shortCode, link.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedId === link.id ? (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {link.originalUrl}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-lg font-semibold tabular-nums">
                        {link.clicks}
                      </p>
                      <p className="text-xs text-muted-foreground">clicks</p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(link.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
