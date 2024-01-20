import { Client } from '@notionhq/client';

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here

  // Get Query
  const query = getQuery(event);
  console.log('query ---->', query);

  // Get the runtime config
  const config = useRuntimeConfig();

  // Initialize Notion Client
  const notion = new Client({ auth: config.notionApiKey });

  // Get the database id from the query
  const databaseId = query.database_id;
  console.log('database_id ---->', databaseId);

  // Get the database
  const response = await notion.databases.retrieve(
    {
      database_id: String(databaseId),
    },
  );
  // console.log('database ---->', database);

  // return
  return response;
});
