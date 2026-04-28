import { Metadata } from 'next';
import LinksClient from './LinksClient';

export const metadata: Metadata = {
  title: 'FlyUp Paraquedismo | Links',
  description: 'Links Oficiais - FlyUp Paraquedismo',
};

export default function LinksPage() {
  return <LinksClient />;
}
