export const locales = ["en", "de","hi","ta","mr","te"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
