import type { Metadata } from "next";
import { Handshake, Leaf, Sprout } from "@/components/icons";
import { ButtonLink, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "About Ecclesia" };

export default function AboutPage() {
  return <><section className="page-hero"><div className="page-hero-image" /><div className="page-hero-wash" /><div className="container page-hero-content" data-reveal><Eyebrow light>About Ecclesia</Eyebrow><h1>Rooted in faith.<br /><em>Growing together.</em></h1><p>A Christian cooperative bringing people together around agriculture and shared opportunity.</p></div></section>
    <section className="section-pad"><div className="container about-layout"><div data-reveal><Eyebrow>Who we are</Eyebrow><h2>Shared work.<br /><em>Shared possibility.</em></h2></div><div className="about-prose" data-reveal><p>Ecclesia Christian Agricultural Multipurpose Cooperative Society is an agriculture-focused cooperative built around a simple belief: people can achieve more when they learn and work together.</p><p>We create a place for members and communities to connect with agricultural learning, practical support and opportunities to take part.</p><p>The training proposal centers on integrated farming: combining crops, forage and livestock, reusing crop by-products, and processing produce to add value.</p><ButtonLink href="/membership">Get involved</ButtonLink></div></div></section>
    <section className="principles-section section-pad"><div className="container"><div className="section-heading" data-reveal><Eyebrow>What guides us</Eyebrow><h2>Grounded in what matters.</h2></div><div className="principle-grid"><article data-reveal><Sprout /><h3>Stewardship</h3><p>Care for the land, our work and the communities we share.</p></article><article data-reveal><Leaf /><h3>Learning</h3><p>Build useful knowledge that helps people take their next step.</p></article><article data-reveal><Handshake /><h3>Cooperation</h3><p>Make room for shared effort, support and collective growth.</p></article></div></div></section>
    <section className="about-cta"><div className="container about-cta-inner" data-reveal><div><Eyebrow light>Be part of the journey</Eyebrow><h2>Let’s grow<br /><em>something together.</em></h2></div><ButtonLink href="/membership" variant="light">Explore membership</ButtonLink></div></section></>;
}
