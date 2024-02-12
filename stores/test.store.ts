/**
 * Pinia test store
 */
import { FetchError } from 'ofetch';

export const useTestStore = defineStore('test', () => {
  // State
  const database = ref<any>();
  const loading = ref(false);
  const error = ref<null | Error>(null);

  // Actions
  const fetchTest = async () => {
    loading.value = true;

    try {
      const response = await $fetch('/api/test', {
        retry: 0,
        retryDelay: 500,
        cache: 'no-cache',
      });

      database.value = response;
      return response;
    }
    catch (e) {
      // console.error('!!! e.data ---->', e.data);
      /* error.value = createError({
        ...e.data,
        // statusMessage: `Could not fetch data from`,
      });

      // console.error('!!!---->', error.value);
      throw error.value; */

      if (e instanceof FetchError) {
        console.error('!!! e ---->', e);
        error.value = e.data;
        throw e;
      }
      else {
        error.value = e as Error;
        return e;
      }
    }

    finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    database,
    fetchTest,
  };
});
