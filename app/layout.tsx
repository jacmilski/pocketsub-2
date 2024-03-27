import './globals.css'

export const metadata = {
  title: 'Pocketsub',
  description: 'Make your payments easier',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
