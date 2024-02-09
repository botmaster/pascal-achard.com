import { NotionClient } from '~/server/NotionClient';

export interface INotionArticle {
  title: string
  description?: string
  tags: string[]
  image?: string
  url: string
  date: string
  id: string
  score?: string
  status: {
    name: 'To read' | 'Reading' | 'Read' | 'Canceled'
    color: string
    id: string
  }
}

// Initialize Notion Client
const notion = NotionClient.getInstance().getClient();

// Define the event handler
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Get the database id from the query
  const database_id = String(body.database_id);

  // Get the limit
  const page_size = Number(body.page_size) || 20;

  // Get the cursor
  const start_cursor = body.start_cursor ? String(body.start_cursor) : undefined;

  // Fetch the database
  const response = await notion.databases.query(
    {
      ...body,
      database_id,
      start_cursor,
      page_size,
    },
  );

  // Transform the pages
  const results = await Promise.all(response.results.map(transformPage));

  // return
  return {
    response,
    results,
  };
});

// Fetch the image url for a page
async function getImageUrl(pageId: string) {
  return await $fetch('/api/notion-page-image', {
    body: {
      page_id: pageId,
    },
    method: 'POST',
  });
}

// function - transform a page to add imageUrl and sanitize the response
// @note - page is type any because I don't know how to type it.
// @param page - the page to transform
// @returns the transformed page
//
async function transformPage(page: any): Promise<INotionArticle> {
  const imageUrl = await getImageUrl(page.id);
  return {
    title: page.properties.Name.title[0]?.plain_text || '',
    description: page.properties.Description?.rich_text?.[0]?.plain_text || '',
    tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    image: imageUrl || page.properties.Image?.url || '',
    url: page.properties.URL?.url || '',
    date: page.properties.Date?.date?.start || '',
    score: page.properties.Score?.select?.name,
    status: {
      name: page.properties.Status?.select?.name,
      color: page.properties.Status?.select?.color,
      id: page.properties.Status?.select?.id,
    },
    id: page.id,
  };
}
