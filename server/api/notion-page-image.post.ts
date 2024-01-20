import { Client } from '@notionhq/client';

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here

  const query = getQuery(event);
  const config = useRuntimeConfig();

  // Initialize Notion Client
  const notion = new Client({ auth: config.notionApiKey });

  // Get page id from query
  const pageId = query.page_id;

  // Get the page
  const blockResponse = await notion.blocks.children.list({
    block_id: String(pageId),
  });

  // Récupérer l'url du premier block image
  const imageBlock = blockResponse.results.find(block => block.type === 'image');
  if (!imageBlock)
    return '';

  return imageBlock.image.type === 'external' ? imageBlock.image.external.url : imageBlock.image.file.url;
});
