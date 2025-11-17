export const locales = ["en", "de","hi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
