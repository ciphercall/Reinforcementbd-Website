'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Clock, Building, Briefcase, CheckCircle, Circle, Trash2, Search, Filter, Loader2 } from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  message: string
  isRead: boolean
  createdAt: Date
}

export default function AdminMessagesPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all')
  const [filterService, setFilterService] = useState<string>('all')

  useEffect(() => {
    if (status === 'authenticated') {
      void fetchMessages()
    } else if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact', { credentials: 'include' })
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, isRead: !currentStatus })
      })
      
      if (res.ok) {
        setMessages(prev => prev.map(msg => 
          msg.id === id ? { ...msg, isRead: !currentStatus } : msg
        ))
      }
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return
    }

    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      
      if (res.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== id))
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const filteredMessages = messages.filter(msg => {
    // Status filter
    if (filterStatus === 'read' && !msg.isRead) return false
    if (filterStatus === 'unread' && msg.isRead) return false

    // Service filter
    if (filterService !== 'all' && msg.service !== filterService) return false

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        msg.name.toLowerCase().includes(term) ||
        msg.email.toLowerCase().includes(term) ||
        msg.message.toLowerCase().includes(term) ||
        (msg.company && msg.company.toLowerCase().includes(term))
      )
    }

    return true
  })

  const services = Array.from(new Set(messages.map(m => m.service).filter(Boolean))) as string[]
  const unreadCount = messages.filter(m => !m.isRead).length

  if (status === 'loading' || loading) {
    return (
      <AdminSidebar>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminSidebar>
    )
  }

  return (
    <AdminSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-gray-600">
              {messages.length} total messages
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search messages..."
                  className="pl-9"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'read' | 'unread')}
                className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>

              {/* Service Filter */}
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Services</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                {messages.length === 0 
                  ? 'No messages yet. Contact form submissions will appear here.'
                  : 'No messages match your filters.'}
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map((message) => (
              <Card key={message.id} className={message.isRead ? 'opacity-75' : 'border-l-4 border-l-blue-500'}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isRead ? 'bg-gray-100' : 'bg-blue-100'
                      }`}>
                        <Mail className={`w-5 h-5 ${message.isRead ? 'text-gray-500' : 'text-blue-600'}`} />
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{message.name}</h3>
                          {!message.isRead && (
                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 break-all">{message.email}</p>
                        {message.phone && (
                          <p className="text-sm text-gray-500">📞 {message.phone}</p>
                        )}
                        {message.company && (
                          <p className="text-sm text-gray-500 flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            {message.company}
                          </p>
                        )}
                        {message.service && (
                          <p className="text-sm text-gray-500 flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {message.service}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center flex-shrink-0 ml-4">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap break-words">{message.message}</p>
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-3 flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRead(message.id, message.isRead)}
                    >
                      {message.isRead ? (
                        <>
                          <Circle className="w-4 h-4 mr-2" />
                          Mark Unread
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Read
                        </>
                      )}
                    </Button>
                    <a 
                      href={`mailto:${message.email}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Reply via Email
                    </a>
                    {message.phone && (
                      <a 
                        href={`tel:${message.phone}`}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Call {message.phone}
                      </a>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteMessage(message.id)}
                      className="text-red-600 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminSidebar>
  )
}
