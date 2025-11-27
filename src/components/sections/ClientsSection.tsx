'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'

const clients = {
  enterprise: [
    { name: 'Max Chemical Ltd.', category: 'Chemical Industry Manufacturing' },
    { name: 'Passco Steel Ltd', category: 'Manufacturing' },
    { name: 'Brickland Composite Ltd.', category: 'Composite' },
    { name: 'Newline Clothings Ltd.', category: 'RMG & Textiles' },
  ],
  sme: [
    { name: 'Inclusive Bangladesh Development', category: 'Development' },
    { name: 'A.K. Oxygen Ltd.', category: 'Industrial' },
    { name: 'Healthport Bangladesh Ltd', category: 'Healthcare' },
  ]
}

export function ClientsSection() {
  return (
    <Section background="white" id="clients">
      <SectionHeader
        title="Companies That Trust Us"
        subtitle="Trusted by leading enterprises and growing startups alike"
      />

      <div className="space-y-12">
        {/* Enterprise */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Enterprise</h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {clients.enterprise.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">{client.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{client.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* SMEs & Startups */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">SME's & Startups</h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {clients.sme.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">{client.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{client.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <p className="text-center text-gray-500 italic">And many more...</p>
      </div>
    </Section>
  )
}
