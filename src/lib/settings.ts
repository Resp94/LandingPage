import { getSupabaseClient } from './supabase';

export interface GlobalSettings {
  contact_email: string;
  privacy_email: string;
  linkedin_url: string;
  instagram_url: string;
  [key: string]: string;
}

const DEFAULT_SETTINGS: GlobalSettings = {
  contact_email: 'contato@aptus.com',
  privacy_email: 'privacidade@aptus.com',
  linkedin_url: 'https://linkedin.com/company/aptus',
  instagram_url: 'https://instagram.com/aptus.tech',
};

const CACHE_TTL_MS = 60_000;
let cachedSettings: GlobalSettings | null = null;
let cacheExpiresAt = 0;
let inFlightSettingsPromise: Promise<GlobalSettings> | null = null;

type GlobalSettingRow = {
  key?: string | null;
  id?: string | null;
  value?: string | null;
};

function buildSettings(rows: GlobalSettingRow[]): GlobalSettings {
  const loadedSettings = rows.reduce(
    (acc, row) => {
      const settingKey = row.key ?? row.id;
      if (
        typeof settingKey === 'string' &&
        settingKey.length > 0 &&
        typeof row.value === 'string'
      ) {
        acc[settingKey] = row.value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  return {
    ...DEFAULT_SETTINGS,
    ...loadedSettings,
  };
}

function setCache(settings: GlobalSettings): GlobalSettings {
  cachedSettings = settings;
  cacheExpiresAt = Date.now() + CACHE_TTL_MS;
  return settings;
}

async function fetchSettingsRows(
  selectColumns: 'key, value' | 'id, value'
): Promise<GlobalSettingRow[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await (supabase as any).from('global_settings').select(selectColumns);

  if (error || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  return data as GlobalSettingRow[];
}

export async function getGlobalSettings(): Promise<GlobalSettings> {
  if (cachedSettings && Date.now() < cacheExpiresAt) {
    return cachedSettings;
  }

  if (inFlightSettingsPromise) {
    return inFlightSettingsPromise;
  }

  inFlightSettingsPromise = (async () => {
    try {
      if (!getSupabaseClient()) {
        console.error('Supabase environment variables are missing. Using default settings.');
        return setCache(DEFAULT_SETTINGS);
      }

      const keyRows = await fetchSettingsRows('key, value');
      if (keyRows) {
        return setCache(buildSettings(keyRows));
      }

      const idRows = await fetchSettingsRows('id, value');
      if (idRows) {
        return setCache(buildSettings(idRows));
      }

      return setCache(DEFAULT_SETTINGS);
    } catch (err) {
      console.error('Unexpected error fetching global settings:', err);
      return setCache(DEFAULT_SETTINGS);
    }
  })();

  try {
    return await inFlightSettingsPromise;
  } finally {
    inFlightSettingsPromise = null;
  }
}
