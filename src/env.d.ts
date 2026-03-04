/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly TYPEFORM_FORM_ID?: string;
  readonly PUBLIC_GA_ID?: string;
  readonly CF_WEB_ANALYTICS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
