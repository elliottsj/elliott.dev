import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import FamilyTree from './family-tree';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function FamilyPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string | string[] }>;
}) {
  const { secret } = await searchParams;
  if (!secret || secret !== process.env.FAMILY_SECRET) {
    notFound();
  }

  const response = await fetch(
    'https://raw.githubusercontent.com/elliottsj/elliott-family-data/master/family.json',
    {
      headers: { Authorization: `token ${process.env.DATA_TOKEN}` },
      cache: 'no-store',
    },
  );
  const data = await response.json();

  return <FamilyTree data={data} />;
}
