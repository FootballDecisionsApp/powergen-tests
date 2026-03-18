import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

/**
 * Server-side fetch with ISR revalidation.
 * Use in Server Components and API routes only — never in client components.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate: number = 3600
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  })
}
