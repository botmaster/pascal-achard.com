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
    name: 'À lire' | 'En train de lire' | 'Lu' | 'Abandonné'
    color: string
  }
}

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here

  const query = getQuery(event);
  const config = useRuntimeConfig();

  // Initialize Notion Client
  const notion = new Client({ auth: config.notionApiKey });

  // Get the database id from the query
  const databaseId = query.database_id;

  // Get the limit
  const limit = Number(query.limit) || 20;

  // Get the cursor
  const cursor = query.start_cursor ? String(query.start_cursor) : undefined;

  console.log('strartCursor ---->', cursor);

  // Fetch the database
  const response = await notion.databases.query(
    {
      database_id: String(databaseId),
      page_size: limit,
      start_cursor: cursor,
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
