import { Client } from '@notionhq/client';

export interface SanitizedResponse {
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

const config = useRuntimeConfig();

// Initialize Notion Client
const notion = new Client({ auth: config.notionApiKey });

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here

  const body = await readBody(event);
  console.log('query ---->', { ...body });

  // Get the database id from the query
  const database_id = String(body.database_id);

  // Get the limit
  const page_size = Number(body.page_size) || 20;

  // Get the cursor
  const start_cursor = body.start_cursor ? String(body.start_cursor) : undefined;

  // console.log('startCursor ---->', cursor);

  // Fetch the database
  const response = await notion.databases.query(
    {
      ...body,
      database_id,
      start_cursor,
      page_size,
    },
  );

  // Sanitize the response
  const results = response.results.map<SanitizedResponse | undefined>((result) => {
    // Check if result has the necessary properties
    if ('id' in result && 'properties' in result) {
      const id = result.id;
      const properties = result.properties;

      // Check if properties have the necessary sub-properties
      const title = properties.Name.title[0]?.plain_text || '';
      const description = properties.Description?.rich_text?.[0]?.plain_text || '';
      const tags = properties.Tags?.multi_select?.map(tag => tag.name) || [];
      const image = properties.Image?.url || '';
      const url = properties.URL?.url || '';
      const date = properties.Date?.date?.start || '';
      const score = properties.Score?.select?.name;
      const status = {
        name: properties.Status?.select?.name,
        color: properties.Status?.select?.color,
        id: properties.Status?.select?.id,
      };

      return {
        title,
        description,
        tags,
        image,
        url,
        date,
        score,
        status,
        id,
      };
    }

    // Return undefined if result does not have the necessary properties
    return undefined;
  }).filter(Boolean); // Filter out undefined values

  // return
  return {
    response,
    results,
  };
});