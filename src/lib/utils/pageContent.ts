export function coercePageContent<T>(input: unknown, fallback: T): T {
  if (input == null) return fallback

  if (typeof input === 'string') {
    try {
      return JSON.parse(input) as T
    } catch {
      return fallback
    }
  }

  if (typeof input === 'object') {
    return input as T
  }

  return fallback
}
