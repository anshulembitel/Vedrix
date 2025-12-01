import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales } from "../../i18n/config";
import { ChatWidget } from "@vedrix@vedrix/components/BotComponents/ChatWidget";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }
}

export default async function LocaleLayout(props: Props) {
  const { children, params } = props;
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
  
      <ChatWidget/>
    </NextIntlClientProvider>
  );
}