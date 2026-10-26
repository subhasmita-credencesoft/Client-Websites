import { careers, enquiryTypes } from '@/data/site';
import type { CareerPayload, ContactPayload } from '@/types';

type Errors = Record<string, string>;
type Result<T> = { data: T; errors?: undefined } | { data?: undefined; errors: Errors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_EXTENSIONS = ['pdf', 'doc', 'docx'] as const;

const str = (v: unknown, max = 2000): string => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function checkCommon(name: string, email: string, phone: string, phoneRequired: boolean, errors: Errors) {
  if (name.length < 2) errors.name = 'Please enter your full name.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  const digits = phone.replace(/\D/g, '');
  if (phone ? !PHONE_RE.test(phone) || digits.length < 8 || digits.length > 15 : phoneRequired) {
    errors.phone = 'Please enter a valid phone number.';
  }
}

export function validateContact(input: Record<string, unknown>): Result<ContactPayload> {
  const data: ContactPayload = {
    name: str(input.name, 120),
    email: str(input.email, 160),
    phone: str(input.phone, 30),
    enquiryType: str(input.enquiryType, 80),
    message: str(input.message, 4000),
  };
  const errors: Errors = {};
  checkCommon(data.name, data.email, data.phone, false, errors);
  if (!enquiryTypes.includes(data.enquiryType)) errors.enquiryType = 'Please select an enquiry type.';
  if (data.message.length < 10) errors.message = 'Please tell us a little more (at least 10 characters).';
  return Object.keys(errors).length ? { errors } : { data };
}

export function validateCareer(input: Record<string, unknown>): Result<CareerPayload> {
  const data: CareerPayload = {
    name: str(input.name, 120),
    email: str(input.email, 160),
    phone: str(input.phone, 30),
    position: str(input.position, 80),
  };
  const errors: Errors = {};
  checkCommon(data.name, data.email, data.phone, true, errors);
  if (!careers.positions.includes(data.position)) errors.position = 'Please select a position.';
  return Object.keys(errors).length ? { errors } : { data };
}

export function resumeExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() ?? '';
}

/** Checks the first bytes so a renamed .exe cannot pass as a PDF/DOC/DOCX. */
export function hasResumeSignature(buf: Buffer, ext: string): boolean {
  if (ext === 'pdf') return buf.subarray(0, 4).toString('latin1') === '%PDF';
  if (ext === 'docx') return buf[0] === 0x50 && buf[1] === 0x4b;
  if (ext === 'doc') return buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0;
  return false;
}

export const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);
