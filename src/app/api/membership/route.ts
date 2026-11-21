import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PHOTO_SIZE = 1_500_000;
const MAX_REQUEST_SIZE = 1_650_000;
const interests = new Set(["Crop production", "Livestock", "Agribusiness", "Cooperative development", "Other"]);

function readText(form: FormData, key: string, maxLength: number, required = false) {
  const value = form.get(key);
  if (typeof value !== "string") return required ? null : "";
  const trimmed = value.trim();
  return trimmed.length <= maxLength && (!required || trimmed.length > 0) ? trimmed : null;
}

function photoExtension(bytes: Buffer): "jpg" | "png" | "webp" | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "png";
  if (bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") return "webp";
  return null;
}

export async function POST(request: Request) {
  const requestSize = Number(request.headers.get("content-length") || 0);
  if (requestSize > MAX_REQUEST_SIZE) {
    return NextResponse.json({ message: "The submission is too large. Please choose a photo under 1.5 MB." }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ message: "Please submit the membership form again." }, { status: 400 });
  }

  // Quietly discard bot submissions caught by the honeypot.
  if (readText(form, "website", 200)) return NextResponse.json({ message: "Your application has been received." });

  const fullNameValue = readText(form, "full_name", 120, true);
  const fullName = fullNameValue?.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ");
  const phone = readText(form, "phone", 35, true);
  const email = readText(form, "email", 190, true);
  const community = readText(form, "community", 140, true);
  const occupation = readText(form, "occupation", 120, true);
  const interest = readText(form, "agricultural_interest", 40, true);
  const motivation = readText(form, "motivation", 1500, true);
  const experience = readText(form, "experience", 1500);
  const consent = form.get("consent") === "on";
  const photo = form.get("photo");

  if (!fullName || fullName.length < 2 || !phone || !/^[+\d\s().-]{7,35}$/.test(phone) || (phone.match(/\d/g) || []).length < 7 || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !community || !occupation || interest === null || !interests.has(interest) || !motivation || motivation.length < 10 || experience === null || !consent) {
    return NextResponse.json({ message: "Please check the required fields and try again." }, { status: 400 });
  }
  if (!(photo instanceof File) || photo.size === 0) {
    return NextResponse.json({ message: "Please add a profile photo to your application." }, { status: 400 });
  }
  if (photo.size > MAX_PHOTO_SIZE) {
    return NextResponse.json({ message: "Your photo must be 1.5 MB or smaller." }, { status: 413 });
  }

  const bytes = Buffer.from(await photo.arrayBuffer());
  const extension = photoExtension(bytes);
  if (!extension) {
    return NextResponse.json({ message: "Use a valid JPEG, PNG or WebP image." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const recipient = process.env.APPLICATION_EMAIL_TO || "ecclesiacooperative01@gmail.com";
  if (!host || !user || !password) {
    return NextResponse.json({ message: "Online applications are temporarily unavailable. Please contact Ecclesia by phone or email." }, { status: 503 });
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return NextResponse.json({ message: "Online applications are temporarily unavailable. Please contact Ecclesia by phone or email." }, { status: 503 });
  }
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: { user, pass: password },
    });
    await transporter.sendMail({
      from: process.env.MAIL_FROM || user,
      to: recipient,
      replyTo: { name: fullName, address: email },
      subject: `Membership application · ${fullName}`,
      text: [
        "New Ecclesia Cooperative membership application",
        "",
        `Full name: ${fullName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Community / state: ${community}`,
        `Occupation: ${occupation}`,
        `Agricultural interest: ${interest}`,
        `Motivation: ${motivation}`,
        `Experience: ${experience || "Not provided"}`,
        "Consent to contact: Yes",
        "",
        "The applicant's profile photo is attached.",
      ].join("\n"),
      attachments: [{ filename: `membership-profile.${extension}`, content: bytes }],
    });
    return NextResponse.json({ message: "Thank you. Your membership application has been emailed to the Ecclesia team." }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "We couldn’t send your application right now. Please try again or contact Ecclesia by phone or email." }, { status: 503 });
  }
}
