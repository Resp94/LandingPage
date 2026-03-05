import { supabase } from './supabase';

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

export async function getGlobalSettings(): Promise<GlobalSettings> {
  try {
    const { data, error } = await supabase.from('global_settings').select('key, value');

    if (error) {
      console.error('Error fetching global settings from Supabase:', error);
      return DEFAULT_SETTINGS;
    }

    if (!data || data.length === 0) {
      return DEFAULT_SETTINGS;
    }

    const loadedSettings = data.reduce(
      (acc, row) => {
        acc[row.key] = row.value;
        return acc;
      },
      {} as Record<string, string>
    );

    return {
      ...DEFAULT_SETTINGS,
      ...loadedSettings,
    };
  } catch (err) {
    console.error('Unexpected error fetching global settings:', err);
    return DEFAULT_SETTINGS;
  }
}
