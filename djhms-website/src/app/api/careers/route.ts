import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';
import { clientIp, rateLimited } from '@/lib/rateLimit';
import { RESUME_MAX_BYTES, hasResumeSignature, resumeExtension, validateCareer } from '@/lib/validation';
import type { ApiResponse } from '@/types';

export const runtime = 'nodejs';

const reply = (body: ApiResponse, status = 200) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  if (rateLimited(`careers:${clientIp(request.headers)}`, 3)) {
    return reply({ ok: false, message: 'Too many submissions. Please try again later.' }, 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply({ ok: false, message: 'Invalid request.' }, 400);
  }

  if (String(form.get('website') ?? '').trim() !== '') return reply({ ok: true }); // honeypot

  const fields = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === 'string'));
  const result = validateCareer(fields);
  const errors: Record<string, string> = { ...(result.errors ?? {}) };

  const file = form.get('resume');
  let resume: { filename: string; content: Buffer } | undefined;
  if (!(file instanceof File) || file.size === 0) {
    errors.resume = 'Please upload your CV / resume.';
  } else if (file.size > RESUME_MAX_BYTES) {
    errors.resume = 'File is too large (maximum 5 MB).';
  } else {
    const ext = resumeExtension(file.name);
    const content = Buffer.from(await file.arrayBuffer());
    if (!hasResumeSignature(content, ext)) errors.resume = 'Please upload a valid PDF, DOC or DOCX file.';
    else resume = { filename: `resume-${Date.now()}.${ext}`, content };
  }

  if (Object.keys(errors).length || !result.data || !resume) return reply({ ok: false, errors }, 422);
  const d = result.data;

  try {
    await sendMail({
      subject: `[DJHMS Careers] ${d.position} – ${d.name}`,
      replyTo: d.email,
      text: `New job application\n\nName: ${d.name}\nEmail: ${d.email}\nMobile: ${d.phone}\nPosition: ${d.position}\n`,
      attachments: [resume],
    });
    return reply({ ok: true, message: 'Thank you! Your application has been submitted.' });
  } catch (err) {
    console.error('[careers] mail failure', err);
    return reply({ ok: false, message: 'We could not submit your application right now. Please email your CV to us directly.' }, 500);
  }
}
