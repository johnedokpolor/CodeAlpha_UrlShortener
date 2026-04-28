import { Dispatch, SetStateAction } from "react";
import { Card } from "./ui/card";
import { Link2 } from "lucide-react";

type SnippedLinkProps = {
  shortUrl: string;
  setShortUrl: Dispatch<SetStateAction<string | null>>;
};
const SnippedLink = ({ shortUrl, setShortUrl }: SnippedLinkProps) => {
  return (
    <Card className="p-12 text-center">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Link2 className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">Snipped your link!🎉</p>
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm dark:text-white underline mt-1"
      >
        {shortUrl}
      </a>
      <p
        className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
        onClick={() => setShortUrl(null)}
      >
        Go to homepage
      </p>
    </Card>
  );
};

export default SnippedLink;
