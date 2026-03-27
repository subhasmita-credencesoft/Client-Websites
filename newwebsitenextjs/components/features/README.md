## Feature Structure

- `about`
  Page-level UI for the About route.
- `detail`
  Shared detail-page view used by active room and package routes.
- `gallery`
  Gallery page UI.
- `home`
  Homepage composition and homepage-only sections.
- `offers`
  Offers page client UI.
- `shared`
  Reusable cross-page sections such as awards, reservation, and partner logos.
- `venues`
  Shared venue showcase page used by venue routes.

Keep `layout`, `providers`, and `ui` outside this folder because they are app-wide building blocks rather than feature-specific modules.
