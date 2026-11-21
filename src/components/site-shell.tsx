"use client";

import Link from "next/link";
import { ArrowRight, Menu, X, Leaf, MapPin, Phone, Mail } from "@/components/icons";
import { useState } from "react";

const links = [
  ["About", "/about"], ["What we do", "/services"], ["Membership", "/membership"], ["Contact", "/contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topline"><div className="container topline-inner"><span><MapPin size={13} /> Nigeria <span className="topline-divider">/</span> Rooted in community</span><a href="tel:+2347011292508"><Phone size={13} /> +234 701 129 2508</a></div></div>
    <header className="site-header"><nav className="container nav-bar" aria-label="Main navigation">
      <Link className="brand" href="/" aria-label="Ecclesia Cooperative home"><span className="brand-mark"><img src="/logo.jpg" alt="" /></span><span className="brand-word">ECCLESIA<small>CHRISTIAN AGRICULTURAL COOPERATIVE</small></span></Link>
      <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <div className={`nav-links${open ? " nav-open" : ""}`}>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="nav-cta" href="/membership" onClick={() => setOpen(false)}>Join the cooperative <ArrowRight size={16} /></Link></div>
    </nav></header>
  </>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-brand-col"><Link className="brand brand-light" href="/"><span className="brand-mark"><img src="/logo.jpg" alt="" /></span><span className="brand-word">ECCLESIA<small>CHRISTIAN AGRICULTURAL COOPERATIVE</small></span></Link><p>Growing stronger communities through agriculture, shared learning and cooperation.</p></div><div><h3>Explore</h3><div className="footer-links">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div></div><div><h3>Get in touch</h3><div className="footer-contact"><a href="tel:+2347011292508"><Phone size={15} />+234 701 129 2508</a><a href="tel:+2348166885630"><Phone size={15} />+234 816 688 5630</a><a href="mailto:ecclesiacooperative01@gmail.com"><Mail size={15} />Email the cooperative</a></div></div><div className="footer-note"><span className="footer-leaf"><Leaf size={19} /></span><p>Better things grow when we grow them together.</p><Link href="/membership" className="footer-link">Take the next step <ArrowRight size={15} /></Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Ecclesia Cooperative</span><span>Agriculture · Cooperation · Community</span></div></footer>;
}
