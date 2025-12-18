import 'server-only'

import prisma from '@/lib/db/prisma'

export async function getPageContents(
  page: string,
  sections: string[]
): Promise<Record<string, unknown | null>> {
  const rows = await prisma.pageContent.findMany({
    where: {
      page,
      section: { in: sections }
    }
  })

  const map: Record<string, unknown | null> = Object.fromEntries(
    sections.map((s) => [s, null])
  )

  for (const row of rows) {
    try {
      map[row.section] = JSON.parse(row.content)
    } catch {
      map[row.section] = row.content
    }
  }

  return map
}

export async function getPageContent(
  page: string,
  section: string
): Promise<unknown | null> {
  const row = await prisma.pageContent.findUnique({
    where: {
      page_section: { page, section }
    }
  })

  if (!row) return null

  try {
    return JSON.parse(row.content)
  } catch {
    return row.content
  }
}
