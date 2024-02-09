import { Client } from '@notionhq/client';

export class NotionClient {
  private static instance: NotionClient;
  private readonly client: Client;

  private constructor() {
    const config = useRuntimeConfig();
    this.client = new Client({ auth: config.notionApiKey });
  }

  public static getInstance(): NotionClient {
    if (!NotionClient.instance)
      NotionClient.instance = new NotionClient();

    return NotionClient.instance;
  }

  public getClient() {
    return this.client;
  }
}
