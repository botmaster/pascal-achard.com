import { Client } from '@notionhq/client';

// Get the runtime config
const config = useRuntimeConfig();

// Initialize Notion Client
const notion = new Client({ auth: config.notionApiKey });

export default defineEventHandler(async (event) => {
  // Get Query
  const query = getQuery(event);

  // Get the database id from the query
  const databaseId = query.database_id;

  // Get the database
  // return
  return await notion.databases.retrieve(
    {
      database_id: String(databaseId),
    },
  );
});
