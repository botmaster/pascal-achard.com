/**
 * Pinia Articles store
 */
import { FetchError } from 'ofetch';
import type { IArticle } from '~/types/types';

export const useArticlesStore = defineStore('articles', () => {
  // State
  const articlesResponse = ref<{
    articles: IArticle[]
    response: any
  }>();
  const loading = ref(false);
  const error = ref<null | Error>(null);

  // Actions
  const fetchArticles = async (body: any) => {
    loading.value = true;

    try {
      const response = await $fetch('/api/notion-page-list', {
        body,
        method: 'POST',
      });
      articlesResponse.value = {
        articles: response.results,
        response,
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

  return {
    articlesResponse,
    loading,
    error,
    fetchArticles,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot));
