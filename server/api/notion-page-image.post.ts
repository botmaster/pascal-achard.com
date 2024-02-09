import { Client } from '@notionhq/client';

const config = useRuntimeConfig();

// Initialize Notion Client
const notion = new Client({ auth: config.notionApiKey });

// Cache the image url
const imageUrlCache = new Map<string, string>();

// Cache duration: 1 day
const CACHE_DURATION = 1000 * 60 * 60 * 24;

// Cache the image url for 1 entire day
setInterval(() => {
  imageUrlCache.clear();
}, CACHE_DURATION);

export default defineEventHandler(async (event) => {
  const body = await readBody(event, { strict: true });

  // Get page id from body
  const pageId = body.page_id;

  // Check if the image url is already cached
  if (imageUrlCache.has(pageId))
    return imageUrlCache.get(pageId);

  // Get the page
  const blockResponse = await notion.blocks.children.list({
    block_id: String(pageId),
  });

  // Récupérer l'url du premier block image
  const imageBlock = blockResponse.results.find((block: any) => block.type === 'image') as {
    image: { type: 'external' | 'file', external: { url: string }, file: { url: string } }
  } | undefined;
  if (!imageBlock)
    return '';

  // Cache the image url
  const imageUrl = imageBlock.image.type === 'external' ? imageBlock.image.external.url : imageBlock.image.file.url;
  imageUrlCache.set(pageId, imageUrl);
  return imageUrl;
});
