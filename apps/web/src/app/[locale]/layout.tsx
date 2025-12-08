import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales } from "../../i18n/config";
import { ChatWidget } from "../../components/BotComponents/ChatWidget";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

async function getMessages(locale: string) {
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return messages;
  } catch {
    notFound();
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ChatWidget />
      {children}
    </NextIntlClientProvider>
  );
}