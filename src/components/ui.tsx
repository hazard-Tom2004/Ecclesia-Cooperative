import { AnimatedLink } from "@/components/motion-ui";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? " eyebrow-light" : ""}`}><span className="eyebrow-dot" />{children}</p>;
}

export function ButtonLink({ href, children, variant = "dark" }: { href: string; children: React.ReactNode; variant?: "dark" | "light" | "outline" }) {
  return <AnimatedLink href={href} variant={variant}>{children}</AnimatedLink>;
}

export function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="section-heading" data-reveal><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}
