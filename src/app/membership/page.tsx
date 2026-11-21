import type { Metadata } from "next";
import { Check, Handshake } from "@/components/icons";
import { MembershipForm } from "@/components/membership-form";
import { ButtonLink, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Membership" };

export default function MembershipPage() {
  const benefits = ["Learn about agricultural opportunities", "Connect through shared knowledge", "Explore cooperative services", "Take part in community-focused work"];
  return <><section className="page-hero"><div className="page-hero-image page-hero-image-member" /><div className="page-hero-wash" /><div className="container page-hero-content" data-reveal><Eyebrow light>Membership</Eyebrow><h1>Make room<br />to <em>grow.</em></h1><p>Become part of a cooperative community built on agriculture, shared learning and mutual support.</p></div></section>
    <section className="section-pad"><div className="container membership-application-layout"><aside className="membership-intro-panel" data-reveal><span className="membership-symbol"><Handshake size={26} /></span><Eyebrow>Why join Ecclesia</Eyebrow><h2>Good things<br /><em>grow together.</em></h2><p>Membership connects you with people who share an interest in agriculture, learning and cooperative progress.</p><p>The training proposal describes possible cooperative-farm placements and loan-acquisition support for qualified graduates. These depend on eligibility and availability.</p><ul className="benefit-list">{benefits.map((benefit) => <li key={benefit}><span><Check size={14} /></span>{benefit}</li>)}</ul><div className="application-contact"><strong>Questions before you apply?</strong><span>Call <a href="tel:+2347011292508">+234 701 129 2508</a></span><span>or email <a href="mailto:ecclesiacooperative01@gmail.com">the cooperative</a></span></div></aside>
      <section className="application-panel" data-reveal><div className="application-heading"><Eyebrow>Membership application</Eyebrow><h2>Let’s get to know you.</h2><p>Share a few details and your interests. The cooperative will contact you about next steps.</p></div><MembershipForm /></section>
    </div></section>
    <section className="simple-cta"><div className="container simple-cta-inner" data-reveal><div><Eyebrow light>A clear way forward</Eyebrow><h2>Every journey starts somewhere.</h2><p>We look forward to hearing what you hope to grow.</p></div><ButtonLink href="/contact" variant="light">Contact Ecclesia</ButtonLink></div></section></>;
}
