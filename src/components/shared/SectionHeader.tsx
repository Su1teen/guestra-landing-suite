import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  ledeClassName?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  reveal?: boolean;
}

export const SectionHeader = ({ eyebrow, title, lede, ledeClassName, align = "left", className, as = "h2", reveal = true }: SectionHeaderProps) => {
  const Heading = as;
  const body = (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <Heading className="headline mt-5">{title}</Heading>
      {lede && <p className={cn("lede mt-5 max-w-2xl", align === "center" && "mx-auto", ledeClassName)}>{lede}</p>}
    </>
  );
  const cls = cn("max-w-3xl", align === "center" && "mx-auto text-center", className);
  return reveal ? <Reveal className={cls}>{body}</Reveal> : <div className={cls}>{body}</div>;
};
