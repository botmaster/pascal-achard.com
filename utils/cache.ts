/**
 * Get cache from NuxtApp
 */
export function getCachedData(key: string) {
  const nuxtApp = useNuxtApp();
  const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  const TTL = 1000 * 30;

  // If no data is found, return null
  if (!data)
    return null;

  // If data is found, check if it's expired.
  if (data.fetchedAt) {
    const now = new Date();
    const diff = now.getTime() - data.fetchedAt.getTime();
    if (diff > TTL) {
      console.log(`Cache expired for ${key}`);
      return null;
    }
  }

  console.log(`Getting value from cache for ${key}`);
  return data;
}

/**
 * Transform data to add TTL
 */
export function transformData(data: any) {
  // console.log('Transform data');
  if (data) {
    return {
      ...data,
      fetchedAt: new Date(),
    };
  }
  return null;
}
