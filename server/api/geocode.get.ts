// Proxies place search to Nominatim (OpenStreetMap).
// Server-side so we can set a compliant User-Agent (required by the OSM usage
// policy) and keep the browser free of CORS concerns.

interface NominatimResult {
  place_id: number
  display_name: string
  name?: string
  lat: string
  lon: string
}

export interface GeocodeResult {
  id: number
  name: string
  address: string
  lat: number
  lng: number
}

export default defineEventHandler(async (event): Promise<GeocodeResult[]> => {
  const { q } = getQuery(event)
  const query = String(q ?? '').trim()

  if (query.length < 3) return []

  const results = await $fetch<NominatimResult[]>('https://nominatim.openstreetmap.org/search', {
    query: {
      q: query,
      format: 'jsonv2',
      addressdetails: 1,
      limit: 6,
      countrycodes: 'my'
    },
    headers: {
      'User-Agent': 'CarousellClone/1.0 (educational project)'
    }
  })

  return results.map(result => ({
    id: result.place_id,
    name: result.name || result.display_name.split(',')[0]!,
    address: result.display_name,
    lat: Number(result.lat),
    lng: Number(result.lon)
  }))
})
