import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const storyPath = join(root, '_bmad-output/implementation-artifacts/1-6-dynamic-global-settings-supabase-integration.md');
const astroConfigPath = join(root, 'astro.config.mjs');
const settingsPath = join(root, 'src/lib/settings.ts');
const supabasePath = join(root, 'src/lib/supabase.ts');
const footerPath = join(root, 'src/components/layout/Footer.astro');
const privacyPath = join(root, 'src/pages/privacidade.astro');
const formEmbedPath = join(root, 'src/components/ui/FormEmbed.astro');
const envExamplePath = join(root, '.env.example');
const envTypesPath = join(root, 'src/env.d.ts');

assert(existsSync(storyPath), 'Story 1.6 file must exist');
assert(existsSync(astroConfigPath), 'astro.config.mjs must exist');
assert(existsSync(settingsPath), 'src/lib/settings.ts must exist');
assert(existsSync(supabasePath), 'src/lib/supabase.ts must exist');
assert(existsSync(footerPath), 'Footer.astro must exist');
assert(existsSync(privacyPath), 'privacidade.astro must exist');
assert(existsSync(formEmbedPath), 'FormEmbed.astro must exist');
assert(existsSync(envExamplePath), '.env.example must exist');
assert(existsSync(envTypesPath), 'src/env.d.ts must exist');

const astroConfig = readFileSync(astroConfigPath, 'utf8');
const settings = readFileSync(settingsPath, 'utf8');
const supabase = readFileSync(supabasePath, 'utf8');
const footer = readFileSync(footerPath, 'utf8');
const privacy = readFileSync(privacyPath, 'utf8');
const formEmbed = readFileSync(formEmbedPath, 'utf8');
const envExample = readFileSync(envExamplePath, 'utf8');
const envTypes = readFileSync(envTypesPath, 'utf8');

// Dynamic requirement without redeploy (runtime rendering)
assert(astroConfig.includes("output: 'server'"), 'Astro output must be server for runtime dynamic settings');

// Supabase client must be safe if env vars are missing
assert(supabase.includes('getSupabaseClient'), 'Supabase helper must expose getSupabaseClient');
assert(supabase.includes('if (!supabaseUrl || !supabaseAnonKey)'), 'Supabase helper must guard missing env vars');

// Fail-safe and schema compatibility
assert(settings.includes('DEFAULT_SETTINGS'), 'Settings must define fallback defaults');
assert(settings.includes("fetchSettingsRows('key, value')"), 'Settings must query key/value schema');
assert(settings.includes("fetchSettingsRows('id, value')"), 'Settings must support id/value schema fallback');
assert(settings.includes('Supabase environment variables are missing. Using default settings.'), 'Settings must log env fail-safe path');
assert(settings.includes('return setCache(DEFAULT_SETTINGS);'), 'Settings must fallback to default settings');
assert(settings.includes('CACHE_TTL_MS'), 'Settings should cache responses to avoid repeated queries per request burst');

// Consumption in UI components
assert(footer.includes('getGlobalSettings'), 'Footer must consume global settings');
assert(privacy.includes('getGlobalSettings'), 'Privacy page must consume global settings');
assert(formEmbed.includes('getGlobalSettings'), 'Form embed fallback must consume global settings');

// Env definitions
assert(envExample.includes('PUBLIC_SUPABASE_URL='), '.env.example must define PUBLIC_SUPABASE_URL');
assert(envExample.includes('PUBLIC_SUPABASE_ANON_KEY='), '.env.example must define PUBLIC_SUPABASE_ANON_KEY');
assert(envTypes.includes('readonly PUBLIC_SUPABASE_URL: string;'), 'env types must include PUBLIC_SUPABASE_URL');
assert(envTypes.includes('readonly PUBLIC_SUPABASE_ANON_KEY: string;'), 'env types must include PUBLIC_SUPABASE_ANON_KEY');

console.log('Story 1.6 checks passed.');
