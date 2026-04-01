import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlyUp CRM',
  description: 'Sistema de gestão de leads — FlyUp Paraquedismo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
