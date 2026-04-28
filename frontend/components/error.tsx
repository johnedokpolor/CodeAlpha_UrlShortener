import React from "react";
import { Card } from "./ui/card";
import { AlertCircle } from "lucide-react";
type ErrorProps = {
  error: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleRefresh: () => void;
};

const Error = ({ error, handleSubmit, handleRefresh }: ErrorProps) => {
  return (
    <Card className="p-12 text-center">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center mx-auto justify-center">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      <p className="text-muted-foreground">{error}</p>
      <p
        className="text-sm text-muted-foreground/60 mt-1 underline"
        onClick={error === "Failed to snip link" ? handleSubmit : handleRefresh}
      >
        Try again
      </p>
    </Card>
  );
};

export default Error;
