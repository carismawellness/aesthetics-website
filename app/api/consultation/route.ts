import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { CONTACT } from "@/lib/site";

export const runtime = "nodejs";

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  treatment?: string;
  message?: string;
  consent?: boolean;
};

function clean(s: unknown, max = 500): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let data: Body;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const firstName = clean(data.firstName, 100);
  const lastName = clean(data.lastName, 100);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 50);
  const treatment = clean(data.treatment, 120);
  const message = clean(data.message, 2000);

  // Validation
  if (!firstName) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 422 });
  if (!phone && !email) return NextResponse.json({ ok: false, error: "Please provide a phone number or email." }, { status: 422 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }
  if (!data.consent) return NextResponse.json({ ok: false, error: "Please accept the consent notice." }, { status: 422 });

  const submission = {
    receivedAt: new Date().toISOString(),
    firstName,
    lastName,
    email,
    phone,
    treatment,
    message,
  };

  const summary = `New consultation request — ${firstName} ${lastName}
Phone: ${phone || "—"}
Email: ${email || "—"}
Treatment: ${treatment || "—"}
Message: ${message || "—"}`;

  // 0) Forward to GoHighLevel via an Inbound Webhook (set GHL_WEBHOOK_URL).
  //    Primary delivery — the lead lands directly in the GHL pipeline.
  const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;
  if (GHL_WEBHOOK_URL) {
    try {
      const res = await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          interested_services: treatment,
          treatment,
          message,
          source: "carismaaesthetics.com",
          submitted_at: submission.receivedAt,
        }),
      });
      if (!res.ok) throw new Error(`GHL webhook responded ${res.status}`);
      return NextResponse.json({ ok: true, delivery: "ghl" });
    } catch (err) {
      console.error("[consultation] GHL webhook failed:", err);
      // fall through to email / local capture so the lead is never lost
    }
  }

  // 1) Email via Resend if configured (no SDK needed — REST API).
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONSULTATION_FROM || "Carisma Aesthetics <onboarding@resend.dev>",
          to: [process.env.CONSULTATION_TO || CONTACT.email],
          reply_to: email || undefined,
          subject: `Consultation request — ${firstName} ${lastName}`,
          text: summary,
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
      return NextResponse.json({ ok: true, delivery: "email" });
    } catch (err) {
      console.error("[consultation] email send failed:", err);
      // fall through to local capture so the lead is never lost
    }
  }

  // 2) Fallback: persist locally so submissions work end-to-end in dev.
  try {
    const file = path.join(process.cwd(), "consultation-submissions.jsonl");
    await fs.appendFile(file, JSON.stringify(submission) + "\n", "utf8");
  } catch (err) {
    console.error("[consultation] local capture failed:", err);
  }
  console.log("[consultation]", summary);

  return NextResponse.json({ ok: true, delivery: "captured" });
}
