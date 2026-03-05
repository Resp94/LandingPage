# Story 1.6: Dynamic Global Settings (Supabase Integration)

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **to integrate Supabase to fetch global settings (social links, contact emails)**,
so that **the operational team can easily update these settings without touching the codebase or requiring a new deployment**.

## Acceptance Criteria

1. **Given** the initialized Astro project and Supabase project setup
2. **When** the page renders (Server-Side or via client fetch on load)
3. **Then** it establishes a connection to the `global_settings` table in Supabase
4. **And** retrieves the values for key-value pairs (e.g., `instagram_url`, `linkedin_url`, `contact_email`, `privacy_email`)
5. **And** populates the `Footer.astro`, `Header.astro`, and any other component requiring contact/social information with the retrieved data
6. **And** if the database fetch fails, it gracefully falls back to a set of predefined default values (fail-safe)
7. **And** environment variables (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`) are properly configured locally and in Cloudflare

## Tasks / Subtasks

- [ ] Task 1: Setup Supabase Integration
  - [ ] Configure `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` in `.env` and `.env.example`
  - [ ] Create a utility/service to fetch settings and handle the fallback mechanism clearly (`src/lib/settings.ts` or `src/lib/supabase.ts`).
- [ ] Task 2: Implement Component Updates
  - [ ] Update `Footer.astro` to consume dynamic settings.
  - [ ] Update `Header.astro` to consume dynamic settings (if any apply).
  - [ ] Update `privacidade.astro` to consume the dynamic contact email.
- [ ] Task 3: Fail-safe Testing
  - [ ] Simulate a database failure and assert that the preset default static values render perfectly.

## Dev Notes

- **Technical Context:** We need a hybrid/table setup in Supabase (`global_settings` table). A `fail-safe` rule must be implemented: If the DB is down or unreachable, the frontend must use default static variables.
- **Architecture Compliance:** 
  - The previous architecture decision "No Database in MVP" was explicitly modified via `sprint-change-proposal-2026-03-05.md` to allow Supabase strictly for fetching Global Settings.
  - Fetching should preferable happen during SSR or on the client edge cleanly. If Astro is in SSG mode, fetching will bake the values at build time (which defeats "operational team can update without deployment"). Given this is a Landing Page, if Astro is running in static mode, the requirements specify "Server-Side or client fetch". Using standard `fetch` on the client or Astro's SSR endpoints are valid. The developer must ensure the outcome meets the requirement of not requiring a new deployment to show new data. Support both standard static configuration as fallback and dynamic fetch.
- **File Structure:**
  - `src/lib/supabase.ts` or `src/lib/settings.ts` for fetch configuration.
  - Modify `src/components/layout/Footer.astro`.
  - Modify `src/components/layout/Header.astro`.
- **Libraries/Frameworks:** Use `@supabase/supabase-js` or native `fetch` API against Supabase REST endpoint.
- **Testing Standards:** Test the fail-safe path (e.g., misconfigure the DB URL temporarily and verify the page still loads with default static data).
- **Previous Learnings:** Ensure to maintain the established `tailwind` classes architecture intact, replacing ONLY the static text/href values.

### Project Structure Notes

- Alignment with unified project structure: Add `src/lib` or `src/utils` as necessary. Maintain TypeScript Strict mode. Extracted components like Footer and Header should retain their existing styling context.

### References

- [Source: _bmad-output/planning-artifacts/sprint-change-proposal-2026-03-05.md#Section-4] (FR10 addition)
- [Source: _bmad-output/planning-artifacts/architecture.md#Section-Schema] (`global_settings` table)
- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.6]

## Dev Agent Record

### Agent Model Used
Antigravity

### Debug Log References
None

### Completion Notes List
- Ultimate context engine analysis completed - comprehensive developer guide created

### File List
- `src/components/layout/Footer.astro`
- `src/components/layout/Header.astro`
- `src/pages/privacidade.astro`
- `.env` and `.env.example`
- `src/lib/settings.ts` (new)
