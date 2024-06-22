/**
 * Pinia Articles store
 */
import { FetchError } from 'ofetch';
import type { IArticle } from '~/types/types';

export const useArticlesStore = defineStore('articles', () => {
  const config = useRuntimeConfig();

  // State
  const articlesResponse = ref<{
    articles: IArticle[]
    response: any
  }>();
  const loading = ref(false);
  const error = ref<null | Error>(null);

  // Actions
  const fetchArticles = async (body: any) => {
    // console.log('Fetching articles');
    loading.value = true;

    try {
      const response = await $fetch('/api/notion-page-list', {
        body: {
          database_id: config.public.notionDatabaseId,
          ...body,
        },
        method: 'POST',
      });
      articlesResponse.value = {
        articles: response.results,
        response: response.response,
      };
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

  // Has more
  const hasMore = computed(() => {
    return articlesResponse.value?.response.has_more;
  });

  return {
    articlesResponse,
    loading,
    error,
    fetchArticles,
    hasMore,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot));
