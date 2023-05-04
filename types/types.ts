import { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";

export interface ITheme {
  name: string;
  label: string;
  icon: string;
}

export interface IPage extends MarkdownParsedContent {
  coverTitle: string;
  coverUpTitle?: string;
  coverSubtitle?: string;
  coverInfo?: string;
}
