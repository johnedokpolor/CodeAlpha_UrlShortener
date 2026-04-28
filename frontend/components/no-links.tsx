import React from "react";
import { Card } from "./ui/card";
import { Link2 } from "lucide-react";

const NoLinks = () => {
  return (
    <Card className="p-12 text-center">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Link2 className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">No links yet</p>
      <p className="text-sm text-muted-foreground/60 mt-1">
        Create your first shortened link above
      </p>
    </Card>
  );
};

export default NoLinks;
