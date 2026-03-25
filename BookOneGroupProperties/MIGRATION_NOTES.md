# Next.js Migration Notes

## What Changed

- Replaced the Vite + Express runtime with Next.js App Router.
- Added `app/` routes for:
  - `/`
  - `/properties`
  - `/gallery`
  - `/contact`
  - `/property/silver-sand-resort`
- Added Next API routes for:
  - `/api/health`
  - `/api/users`
  - `/api/users/[id]`
  - `/api/users/by-username/[username]`
- Moved global styling into `app/globals.css`.
- Added an App Router layout with metadata, fonts, and client-side providers.
- Preserved the existing UI modules under `client/src` to reduce migration risk while changing the runtime shell to Next.js.

## Runtime Decisions

- Interactive sections stay as client components where hooks or browser-only behavior exist.
- Static layout sections remain server-compatible where possible.
- Existing Tailwind utility classes were preserved.
- Existing local image assets were migrated to Next-compatible usage with `next/image` in the active render tree.

## Backend Notes

- `server/routes.ts` did not contain business endpoints, so there was no Express route logic to port one-to-one.
- The in-memory storage logic was moved into `lib/storage.ts` and exposed via Next API routes.

## Commands

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run check`

## Environment

- `.env.local` now defines:
  - `PORT=5000`
  - `NEXT_PUBLIC_SITE_URL=http://localhost:5000`

## Remaining Legacy Folders

- `client/`, `server/`, and `script/` are still present for reference during the migration.
- The live app now runs from Next.js `app/`.
