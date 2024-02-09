import { NotionClient } from '~/server/NotionClient';

// Initialize Notion Client
const notion = NotionClient.getInstance().getClient();

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
