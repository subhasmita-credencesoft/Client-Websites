import nodemailer from 'nodemailer';

interface MailInput {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST);
}

/** Sends via SMTP. In development without SMTP the message is logged instead. */
export async function sendMail({ subject, text, replyTo, attachments }: MailInput): Promise<void> {
  const mailTo = process.env.MAIL_TO || 'info@djhms.in';
  const mailFrom = process.env.MAIL_FROM || `DJHMS Website <no-reply@djhms.in>`;

  if (!isMailConfigured()) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[mail:dev] SMTP not configured – would send to ' + mailTo + ':\n', { subject, text, replyTo, attachments: attachments?.map((a) => a.filename) });
      return;
    }
    throw new Error('SMTP is not configured');
  }

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });

  await transport.sendMail({
    from: mailFrom,
    to: mailTo,
    replyTo,
    subject,
    text,
    attachments,
  });
}
