/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly TYPEFORM_FORM_ID?: string;
  readonly PUBLIC_GA_ID?: string;
  readonly CF_WEB_ANALYTICS_TOKEN?: string;
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_URL?: string;
  readonly SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
