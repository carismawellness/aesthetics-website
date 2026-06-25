import { NextResponse } from 'next/server';

/**
 * Aesthetics quiz → GoHighLevel lead (Carisma Aesthetics sub-account).
 *
 * Upserts the contact by email/phone, sets quiz custom fields, adds a detailed
 * note and creates a 24h follow-up task.
 *
 * Requires env var:
 *   GHL_API_KEY_AESTHETICS — Private Integration Token for the Carisma Aesthetics sub-account.
 */

const GHL_API_URL   = 'https://services.leadconnectorhq.com';
const GHL_LOCATION  = 'Goi7kzVK7iwe2woxUHkT';

/* Custom field IDs for the Carisma Aesthetics sub-account */
const CF = {
  skinConcerns:       'am8nNn4YuI1JRabDLunK', // Quiz: Skin Concerns
  treatmentInterest:  'ZnN24StycI2h48AGdXgF', // Quiz: Treatment Interest
  injectableComfort:  'YnMzGHVstV0MOFacRRbR', // Quiz: Injectables Comfort
  referralSource:     'fvxWpy0h67N9DGrbO3v0', // Quiz: Referral Source
  consultationType:   'hhfPb91ew6f7ihDMl9DX', // Quiz: Consultation Type
  newLead:            '2UCVKJczAyoVMb2wIzEk', // New Lead (NUMERICAL)
  taskActive:         'ysygudmkd8qRHZlOODuq', // Task Active (Yes/No)
  treatmentInterestMain: 'JITrpmQMMhH7OyMG85Dg', // Treatment Interest (main field)
};

type LeadBody = {
  firstName?: string;
  surname?: string;
  email?: string;
  phone?: string;
  concerns?: string[];
  areas?: string[];
  injectableComfort?: string;
  timeline?: string;
  referral?: string;
  consultation?: string;
};

const validEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const firstName = (body.firstName || '').trim();
  const surname   = (body.surname || '').trim();
  const email     = (body.email || '').trim();
  const phone     = (body.phone || '').trim();

  if (!firstName || !surname || !validEmail(email) || phone.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ ok: false, error: 'Please provide your name, a valid email and phone number.' }, { status: 400 });
  }

  const apiKey = process.env.GHL_API_KEY_AESTHETICS;
  if (!apiKey) {
    console.error('[quiz-lead] GHL_API_KEY_AESTHETICS is not set.');
    return NextResponse.json({ ok: false, error: 'Lead capture is temporarily unavailable.' }, { status: 503 });
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
  };

  const concerns   = (body.concerns || []).join(', ');
  const areas      = (body.areas || []).join(', ');
  const injectable = body.injectableComfort || '';
  const timeline   = body.timeline || '';
  const referral   = body.referral || '';
  const consultation = body.consultation || '';

  const contactPayload = {
    locationId: GHL_LOCATION,
    firstName,
    lastName: surname,
    email,
    phone,
    source: 'Aesthetics Quiz (Website)',
    tags: [
      'aesthetics-quiz-lead',
      'to-do',
      `timeline:${timeline}`,
      `injectables:${injectable}`,
      `consultation:${consultation}`,
      `heard-via:${referral}`,
    ],
    customFields: [
      { id: CF.skinConcerns,       value: concerns },
      { id: CF.treatmentInterest,  value: concerns || 'Aesthetic treatment' },
      { id: CF.treatmentInterestMain, value: concerns || 'Aesthetic treatment' },
      { id: CF.injectableComfort,  value: injectable },
      { id: CF.referralSource,     value: referral },
      { id: CF.consultationType,   value: consultation },
      { id: CF.newLead,            value: 1 },
      { id: CF.taskActive,         value: 'Yes' },
    ],
  };

  const upsert = async (payload: object) => {
    const r = await fetch(`${GHL_API_URL}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    return r.json().catch(() => null);
  };

  try {
    let result = await upsert(contactPayload);
    let contactId: string | null = result?.contact?.id || null;

    if (!contactId) {
      result = await upsert({
        locationId: GHL_LOCATION,
        firstName, lastName: surname, email, phone,
        source: 'Aesthetics Quiz (Website)',
        tags: ['aesthetics-quiz-lead', 'to-do'],
      });
      contactId = result?.contact?.id || null;
    }

    if (!contactId) {
      console.error('[quiz-lead] GHL upsert returned no contactId:', JSON.stringify(result));
      return NextResponse.json({ ok: false, error: 'Failed to save lead.' }, { status: 502 });
    }

    const noteBody = [
      '--- Aesthetics Quiz Lead (Website) ---',
      `Skin Concerns: ${concerns}`,
      `Treatment Areas: ${areas}`,
      `Injectable Comfort: ${injectable}`,
      `Timeline: ${timeline}`,
      `Referral Source: ${referral}`,
      `Consultation Type: ${consultation}`,
    ].join('\n');

    await fetch(`${GHL_API_URL}/contacts/${contactId}/notes/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ body: noteBody }),
    }).catch(() => null);

    const dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    await fetch(`${GHL_API_URL}/contacts/${contactId}/tasks`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: `Call Aesthetics quiz lead - ${firstName} ${surname}`.trim(),
        body: 'New aesthetics quiz lead from the website. Their concerns, areas, injectable comfort, timeline, referral source and consultation preference are in this contact\'s Notes.',
        dueDate,
        completed: false,
      }),
    }).catch(() => null);

    return NextResponse.json({ ok: true, contactId });
  } catch (err) {
    console.error('[quiz-lead] GHL request error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to save lead.' }, { status: 502 });
  }
}
