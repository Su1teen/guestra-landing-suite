import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export const SectionHeader = ({ eyebrow, title, lede, align = "left", className, as = "h2" }: SectionHeaderProps) => {
  const Heading = as;
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <span className="eyebrow">
        <span className="eyebrow-dot" aria-hidden />
        {eyebrow}
      </span>
      <Heading className="headline mt-5">{title}</Heading>
      {lede && <p className={cn("lede mt-5 max-w-2xl", align === "center" && "mx-auto")}>{lede}</p>}
    </Reveal>
  );
};
