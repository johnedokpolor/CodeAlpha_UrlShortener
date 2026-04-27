import { useEffect, useState } from "react";
import {
  Link2,
  Copy,
  ExternalLink,
  BarChart3,
  Trash2,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import api from "@/hooks/axios-instance";

interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
}

const initialLinks: ShortenedLink[] = [
  {
    id: "1",
    originalUrl: "https://example.com/very-long-url-that-needs-shortening",
    shortCode: "abc123",
    clicks: 142,
    createdAt: new Date(Date.now() - 86400000 * 2),
  },
  {
    id: "2",
    originalUrl: "https://documentation.site/api/v2/endpoints",
    shortCode: "xyz789",
    clicks: 89,
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    originalUrl: "https://blog.example.org/post/minimalist-design",
    shortCode: "min456",
    clicks: 234,
    createdAt: new Date(Date.now() - 3600000),
  },
];

export function LinkDashboard() {
  const [links, setLinks] = useState<ShortenedLink[]>();
  const [originalUrl, setOriginalUrl] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getUrls = async () => {
    try {
      const response = await api.get("/api/urls");
      setLinks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUrls();
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl.trim()) {
      alert("A Url must be provided");
      return;
    }

    try {
      const response = api.post("/api/urls", { originalUrl });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    getUrls();
    setOriginalUrl("");
  };

  const handleCopy = async (shortCode: string, id: string) => {
    await navigator.clipboard.writeText(`snip.link/${shortCode}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalClicks = 50;

  return (
    <div className="min-h-screen  bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
              <Link2 className="w-4 h-4 text-background" />
            </div>
            <span className="text-lg font-semibold tracking-tight">snip</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>{totalClicks.toLocaleString()} clicks</span>
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
              placeholder="Paste a long URL..."
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

          {links?.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Link2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No links yet</p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Create your first shortened link above
              </p>
            </Card>
          ) : (
            links?.map((link) => (
              <Card
                key={link.id}
                className="p-4 group hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Short URL */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        snip.link/{link.shortCode}
                      </span>
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

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => window.open(link.originalUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
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
