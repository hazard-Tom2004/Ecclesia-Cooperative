import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Handshake, Sprout } from "@/components/icons";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";
import { HoverCard } from "@/components/motion-ui";
import { TrainingCatalog } from "@/components/training-catalog";
import "../training.css";

export const metadata: Metadata = { title: "What we do" };
const areas = [
  { icon: Sprout, no: "01", title: "Crop production", tag: "GROWING FOOD & OPPORTUNITY", body: "Crop production is central to a strong agricultural community. Ecclesia welcomes conversations about growing interests, useful knowledge and the practical support people need to develop their work." },
  { icon: BookOpen, no: "02", title: "Livestock & agricultural learning", tag: "KNOWLEDGE FOR THE WORK", body: "Agriculture includes many paths. Share your interest in livestock or another area of production, learn from experience and connect with information that can help you make informed next steps." },
  { icon: Handshake, no: "03", title: "Cooperative development", tag: "PROGRESS THROUGH PARTICIPATION", body: "Cooperation makes it possible to share ideas, learn together and build stronger working relationships. We encourage participation that supports members and wider community development." },
];

export default function ServicesPage() {
  return <><section className="page-hero"><div className="page-hero-image page-hero-image-field" /><div className="page-hero-wash" /><div className="container page-hero-content" data-reveal><Eyebrow light>What we do</Eyebrow><h1>Growing stronger<br /><em>through agriculture.</em></h1><p>We bring together agricultural interests, practical learning and cooperative participation to create more room for shared progress.</p></div></section>
    <section className="section-pad"><div className="container"><div className="section-heading" data-reveal><Eyebrow>Our areas of focus</Eyebrow><h2>Many interests. One community.</h2><p>Whether you are growing crops, exploring livestock or looking to learn, Ecclesia is a place to connect around agriculture and mutual support.</p></div><div className="service-list">{areas.map(({ icon: Icon, no, title, tag, body }) => <HoverCard className="service-row" key={no}><span className="service-no">{no}</span><span className="service-icon"><Icon size={24} /></span><div><Eyebrow>{tag}</Eyebrow><h3>{title}</h3><p>{body}</p></div><Link href="/contact" className="service-arrow" aria-label={`Ask us about ${title}`}><ArrowUpRight size={20} /></Link></HoverCard>)}</div>
      <div className="service-approach" data-reveal><div><Eyebrow>How we work</Eyebrow><h2>Start with a conversation.</h2><p>Every member and community has different interests. We invite you to tell us what you hope to grow, learn or take part in, and connect with the cooperative about a practical next step.</p></div><ol><li><span>01</span><p><strong>Share your interest</strong>Tell us which area of agriculture or cooperative work matters to you.</p></li><li><span>02</span><p><strong>Explore together</strong>Talk through learning, services and ways to participate.</p></li><li><span>03</span><p><strong>Take the next step</strong>Connect with membership or follow up with the team.</p></li></ol></div>
    </div></section>
    <TrainingCatalog />
    <section className="simple-cta"><div className="container simple-cta-inner" data-reveal><div><Eyebrow light>Let’s talk</Eyebrow><h2>Have something specific in mind?</h2><p>Get in touch and tell us how we can help.</p></div><Link href="/contact" className="button button-light">Contact Ecclesia <ArrowUpRight size={17} /></Link></div></section></>;
}
