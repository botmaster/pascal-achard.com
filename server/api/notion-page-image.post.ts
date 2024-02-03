import { Client } from '@notionhq/client';

const config = useRuntimeConfig();

// Initialize Notion Client
const notion = new Client({ auth: config.notionApiKey });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Get page id from body
  const pageId = body.page_id;

  console.log('pageId', pageId);

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
