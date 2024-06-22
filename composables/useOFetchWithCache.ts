import { StorageSerializers } from '@vueuse/core';

export default async <T>(url: string, options: Record<string, any>): Promise<T> => {
  // Use sessionStorage to cache data
  const cached = useSessionStorage<T>(url, null, {
    serializer: StorageSerializers.object,
  });

  if (!cached.value) {
    try {
      // console.log(`Fetching value from ${url}`);
      const data = await $fetch<T>(url, { ...options });
      cached.value = data as T;
    }
    catch (e) {
      console.error(e);
      throw e;
    }
  }
  else {
    // console.log(`Getting value from cache for ${url}`);
  }

  return cached.value;
};
