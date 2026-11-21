"use client";

import Link from "next/link";
import { motion, MotionConfig, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons";

const MotionLink = motion.create(Link);

export function AnimatedLink({ href, children, variant = "dark" }: { href: string; children: ReactNode; variant?: "dark" | "light" | "outline" }) {
  const reduceMotion = useReducedMotion();
  return <MotionConfig reducedMotion="user"><MotionLink href={href} className={`button button-${variant}`} whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} transition={{ type: "spring", stiffness: 360, damping: 24 }}>{children}<ArrowRight size={17} /></MotionLink></MotionConfig>;
}

export function HoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.article data-reveal className={className} whileHover={reduceMotion ? undefined : { y: -6, scale: 1.012 }} whileTap={reduceMotion ? undefined : { scale: 0.995 }} transition={{ type: "spring", stiffness: 300, damping: 23 }}>{children}</motion.article>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX: reduceMotion ? scrollYProgress : smoothProgress, transformOrigin: "0% 50%" }} aria-hidden="true" />;
}
