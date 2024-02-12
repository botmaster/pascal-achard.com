/**
 * Pinia Article Database store
 */
import type { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { FetchError } from 'ofetch';
import type { IArticleTag } from '~/types/types';

export const useArticleDatabaseInfoStore = defineStore('articleDatabaseInfo', () => {
  const config = useRuntimeConfig();

  // State
  const database = ref<GetDatabaseResponse>();
  const loading = ref(false);
  const error = ref<null | Error>(null);

  // Actions
  const fetchDatabase = async () => {
    loading.value = true;

    try {
      const response = await $fetch('/api/notion-database-info', {
        params: {
          database_id: config.public.notionDatabaseId,
        },
        method: 'GET',
      });
      database.value = response;
      return response;
    }

    catch (e) {
      if (e instanceof FetchError) {
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

  // Getters
  // Get "tags" multi-select value from dbResponse
  const tagList = computed<IArticleTag[]>(() => {
    const selectProperty = database.value?.properties?.Tags as {
      type: 'multi_select'
      multi_select: {
        options: Array<IArticleTag>
      }
      id: string
      name: string
    };
    return selectProperty?.multi_select?.options || [];
  });

  return {
    loading,
    error,
    database,
    fetchDatabase,
    tagList,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useArticleDatabaseInfoStore, import.meta.hot));
