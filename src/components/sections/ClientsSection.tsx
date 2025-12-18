'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import { coercePageContent } from '@/lib/utils/pageContent'

interface ClientItem {
  id: string
  name: string
  logo: string
  category: 'enterprise' | 'sme'
}

interface ClientsContent {
  sectionTitle: string
  sectionSubtitle: string
  enterpriseTitle: string
  smeTitle: string
  clients: ClientItem[]
}

const defaultContent: ClientsContent = {
  sectionTitle: 'Companies That Trust Us',
  sectionSubtitle: 'Trusted by leading enterprises and growing startups alike',
  enterpriseTitle: 'Enterprise',
  smeTitle: "SME's & Startups",
  clients: [
    { id: '1', name: 'Max Chemical Ltd.', logo: '', category: 'enterprise' },
    { id: '2', name: 'Passco Steel Ltd', logo: '', category: 'enterprise' },
    { id: '3', name: 'Brickland Composite Ltd.', logo: '', category: 'enterprise' },
    { id: '4', name: 'Newline Clothings Ltd.', logo: '', category: 'enterprise' },
    { id: '5', name: 'Inclusive Bangladesh Development', logo: '', category: 'sme' },
    { id: '6', name: 'A.K. Oxygen Ltd.', logo: '', category: 'sme' },
    { id: '7', name: 'Healthport Bangladesh Ltd', logo: '', category: 'sme' }
  ]
}

export function ClientsSection({ content }: { content?: unknown }) {
  const c = coercePageContent<ClientsContent>(content, defaultContent)
  const enterpriseClients = c.clients.filter((x) => x.category === 'enterprise')
  const smeClients = c.clients.filter((x) => x.category === 'sme')

  return (
    <Section background="white" id="clients">
      <SectionHeader
        title={c.sectionTitle}
        subtitle={c.sectionSubtitle}
      />

      <div className="space-y-12">
        {/* Enterprise */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">{c.enterpriseTitle}</h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {enterpriseClients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border border-gray-100">
                  {client.logo ? (
                    <Image src={client.logo} alt={client.name} width={64} height={64} className="object-contain" />
                  ) : (
                    <span className="text-2xl font-bold text-gray-400">{client.name.charAt(0)}</span>
                  )}
                </div>
                <h4 className="font-medium text-gray-900 text-sm">{client.name}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* SMEs & Startups */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">{c.smeTitle}</h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {smeClients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border border-gray-100">
                  {client.logo ? (
                    <Image src={client.logo} alt={client.name} width={64} height={64} className="object-contain" />
                  ) : (
                    <span className="text-2xl font-bold text-gray-400">{client.name.charAt(0)}</span>
                  )}
                </div>
                <h4 className="font-medium text-gray-900 text-sm">{client.name}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <p className="text-center text-gray-500 italic">And many more...</p>
      </div>
    </Section>
  )
}
