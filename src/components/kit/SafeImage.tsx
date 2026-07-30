import { useState } from "react";
import { cn } from "@/lib/utils";

type SafeImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** CSS aspect ratio, e.g. "16 / 9" or "3 / 4" */
  ratio?: string;
  fit?: "cover" | "contain";
  loading?: "lazy" | "eager";
};

export function SafeImage({
  src,
  alt,
  className,
  ratio = "16 / 9",
  fit = "cover",
  loading = "lazy",
}: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-border bg-surface",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,#050505_0%,#141414_45%,rgba(246,201,0,0.18)_75%,rgba(215,25,32,0.20)_100%)]"
      />
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
            fit === "cover" ? "object-cover" : "object-contain",
          )}
        />
      )}
    </div>
  );
}
