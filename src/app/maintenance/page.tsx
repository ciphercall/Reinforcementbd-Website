'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AlertTriangle, Clock, Mail, Phone, RefreshCw } from 'lucide-react'

interface MaintenanceSettings {
  enabled: boolean
  title: string
  message: string
  expectedEndTime: string
  showCountdown: boolean
}

export default function MaintenancePage() {
  const [settings, setSettings] = useState<MaintenanceSettings>({
    enabled: true,
    title: "We'll Be Right Back!",
    message: "We're currently performing scheduled maintenance to improve your experience. Please check back soon.",
    expectedEndTime: '',
    showCountdown: true
  })
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Fetch maintenance settings
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings?key=maintenance')
        if (res.ok) {
          const data = await res.json()
          if (data.value) {
            setSettings(data.value)
          }
        }
      } catch (error) {
        console.error('Error fetching maintenance settings:', error)
      }
    }
    fetchSettings()
  }, [])

  useEffect(() => {
    if (!settings.expectedEndTime || !settings.showCountdown) return

    const updateCountdown = () => {
      const endTime = new Date(settings.expectedEndTime).getTime()
      const now = new Date().getTime()
      const difference = endTime - now

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [settings.expectedEndTime, settings.showCountdown])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logos/rg blue and gray full logo.jpg"
            alt="Reinforcement Group"
            width={200}
            height={60}
            className="rounded-lg"
          />
        </div>

        {/* Icon */}
        <div className="relative">
          <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-yellow-500/30">
            <AlertTriangle className="w-14 h-14 text-white" />
          </div>
          <div className="absolute inset-0 w-28 h-28 bg-yellow-400 rounded-full mx-auto animate-ping opacity-20" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          {settings.title}
        </h1>

        {/* Message */}
        <p className="text-xl text-gray-300 leading-relaxed max-w-lg mx-auto">
          {settings.message}
        </p>

        {/* Countdown */}
        {settings.expectedEndTime && settings.showCountdown && (
          <div className="pt-4">
            <p className="text-gray-400 mb-4 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              Expected to be back in:
            </p>
            <div className="flex justify-center gap-4">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map((item) => (
                <div 
                  key={item.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[80px]"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Refresh Button */}
        <button 
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-105"
        >
          <RefreshCw className="w-5 h-5" />
          Refresh Page
        </button>

        {/* Contact Info */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-gray-400 mb-4">Need urgent assistance? Contact us:</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="tel:+8801326249585" 
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              +88 013 26 24 95 85
            </a>
            <a 
              href="mailto:info@ragrpbd.com" 
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@ragrpbd.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Reinforcement Group. All rights reserved.
        </div>
      </div>
    </div>
  )
}
