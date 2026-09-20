import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Index');
  
  return (
    <main className="p-8">
      <h1 className="text-4xl font-sans font-bold text-leaf-800">
        {t('title')}
      </h1>
      <p className="mt-4 text-ink-soft text-lg">
        {t('description')}
      </p>
    </main>
  );
}
