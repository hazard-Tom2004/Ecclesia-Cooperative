"use client";

import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { ArrowRight, Check, Upload } from "@/components/icons";

const maxPhotoBytes = 1_500_000;

export function MembershipForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [photoName, setPhotoName] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function updatePhoto(event: ChangeEvent<HTMLInputElement>) {
    const photo = event.target.files?.[0];
    setPhotoError("");
    if (!photo) {
      setPhotoName("");
      return;
    }
    if (photo.size > maxPhotoBytes) {
      event.target.value = "";
      setPhotoName("");
      setPhotoError("Choose an image no larger than 1.5 MB.");
      return;
    }
    setPhotoName(`${photo.name} · ${(photo.size / 1_000_000).toFixed(2)} MB`);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);
    setSubmitting(true);
    try {
      const response = await fetch("/api/membership", { method: "POST", body: new FormData(event.currentTarget) });
      const result = await response.json() as { message?: string };
      setMessage(result.message || "We couldn’t process the application. Please try again.");
      if (response.ok) {
        setSuccess(true);
        setPhotoName("");
        formRef.current?.reset();
      }
    } catch {
      setMessage("We couldn’t connect to Ecclesia. Please try again or use the contact details below.");
    } finally {
      setSubmitting(false);
    }
  }

  return <form className="application-form" ref={formRef} onSubmit={submit}>
    {message && <div className={`form-message${success ? " form-message-success" : ""}`} role="status"><span>{success ? <Check size={17} /> : null}</span>{message}</div>}
    <div className="form-field-grid">
      <label className="form-field"><span>Full name <b>*</b></span><input name="full_name" autoComplete="name" minLength={2} maxLength={120} placeholder="Your full name" required /></label>
      <label className="form-field"><span>Phone number <b>*</b></span><input name="phone" type="tel" autoComplete="tel" maxLength={35} placeholder="+234…" required /></label>
      <label className="form-field"><span>Email address <b>*</b></span><input name="email" type="email" autoComplete="email" maxLength={190} placeholder="you@example.com" required /></label>
      <label className="form-field"><span>Community or state <b>*</b></span><input name="community" autoComplete="address-level1" maxLength={140} placeholder="Where are you based?" required /></label>
      <label className="form-field"><span>Occupation <b>*</b></span><input name="occupation" autoComplete="organization-title" maxLength={120} placeholder="Your occupation" required /></label>
      <label className="form-field"><span>Main area of interest <b>*</b></span><select name="agricultural_interest" defaultValue="" required><option value="" disabled>Choose an area</option><option>Crop production</option><option>Livestock</option><option>Agribusiness</option><option>Cooperative development</option><option>Other</option></select></label>
      <label className="form-field form-field-wide"><span>Why would you like to join? <b>*</b></span><textarea name="motivation" minLength={10} maxLength={1500} rows={3} placeholder="Tell us briefly what you hope to learn or take part in." required /></label>
      <label className="form-field form-field-wide"><span>Agricultural or cooperative experience <small>Optional</small></span><textarea name="experience" maxLength={1500} rows={2} placeholder="Share any experience that may help us understand your interests." /></label>
      <div className="form-field form-field-wide"><span className="upload-label">Profile photo <b>*</b></span><label className={`upload-box${photoName ? " upload-box-selected" : ""}`} htmlFor="photo"><span className="upload-icon"><Upload size={18} /></span><span><strong>{photoName || "Choose a profile photo"}</strong><small>JPEG, PNG or WebP · 1.5 MB maximum</small></span><input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" required onChange={updatePhoto} aria-describedby="photo-help" /></label><span className={`field-help${photoError ? " field-error" : ""}`} id="photo-help">{photoError || "The photo is attached to your application email and is not published on the website."}</span></div>
    </div>
    <label className="application-consent"><input type="checkbox" name="consent" required /><span>I agree that Ecclesia may use these details to review my membership enquiry and contact me about next steps. <b>*</b></span></label>
    <div className="honeypot-field" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button button-dark submit-application" type="submit" disabled={submitting}>{submitting ? "Sending application…" : "Submit membership application"}<ArrowRight size={17} /></button>
    <p className="form-footnote">Fields marked * are required. Your details and photo are sent directly to Ecclesia by email.</p>
  </form>;
}
