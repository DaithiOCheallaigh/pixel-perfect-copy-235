import { imgDims } from "@/data/imageDimensions";

export type ImageShape = "tall" | "strip" | "normal";

/** Tall phone screens are height-capped; ultra-wide strips scroll sideways on small screens. */
export function imageShape(width?: number, height?: number): ImageShape {
  if (!width || !height) return "normal";
  if (height / width > 1.2) return "tall";
  if (width / height >= 2.8) return "strip";
  return "normal";
}

interface CaseImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  eager?: boolean;
  caption?: string;
  className?: string;
}

/** Content image at its natural aspect ratio — never cropped. */
const CaseImage = ({ src, alt, width, height, eager, caption, className = "" }: CaseImageProps) => {
  const dims = width && height ? { width, height } : imgDims(src);
  const shape = imageShape(dims.width, dims.height);
  const loading = eager
    ? ({ loading: "eager", fetchPriority: "high" } as const)
    : ({ loading: "lazy" } as const);

  const imgClass =
    shape === "tall"
      ? "mx-auto block h-auto max-h-[640px] w-auto max-w-full object-contain"
      : shape === "strip"
        ? "block h-auto w-full min-w-[640px] md:min-w-0"
        : "block h-auto w-full";

  const frameClass =
    shape === "tall"
      ? "overflow-hidden p-4 md:p-6"
      : shape === "strip"
        ? "overflow-x-auto overflow-y-hidden"
        : "overflow-hidden";

  return (
    <figure className={className}>
      <div className={`rounded-2xl border border-border bg-card ${frameClass}`}>
        <img src={src} alt={alt} className={imgClass} {...dims} {...loading} decoding="async" />
      </div>
      {caption && <figcaption className="mt-3 font-mono-label text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
};

export default CaseImage;
