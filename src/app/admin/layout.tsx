import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - MARSH Services',
  description: 'Admin panel for MARSH Services website',
  robots: {
    index: false,
    follow: false
  }
}

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
