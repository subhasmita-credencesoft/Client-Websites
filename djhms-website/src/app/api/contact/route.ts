import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';
import { clientIp, rateLimited } from '@/lib/rateLimit';
import { validateContact } from '@/lib/validation';
import type { ApiResponse } from '@/types';

export const runtime = 'nodejs';

const reply = (body: ApiResponse, status = 200) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  if (rateLimited(`contact:${clientIp(request.headers)}`)) {
    return reply({ ok: false, message: 'Too many requests. Please try again in a few minutes.' }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return reply({ ok: false, message: 'Invalid request.' }, 400);
  }

  // Honeypot: bots fill the hidden field. Pretend success.
  if (typeof body.website === 'string' && body.website.trim() !== '') return reply({ ok: true });

  const result = validateContact(body);
  if (result.errors) return reply({ ok: false, errors: result.errors }, 422);
  const d = result.data;

  try {
    await sendMail({
      subject: `[DJHMS Website] ${d.enquiryType} – ${d.name}`,
      replyTo: d.email,
      text: `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || '-'}\nEnquiry type: ${d.enquiryType}\n\nMessage:\n${d.message}\n`,
    });
    return reply({ ok: true, message: 'Thank you! We have received your enquiry and will get back to you shortly.' });
  } catch (err) {
    console.error('[contact] mail failure', err);
    return reply({ ok: false, message: 'We could not send your message right now. Please email or call us directly.' }, 500);
  }
}
