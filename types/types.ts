import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types';

export interface ITheme {
  name: string
  label: string
  icon: string
}

export interface IPage extends MarkdownParsedContent {
  coverTitle: string
  coverUpTitle?: string
  coverSubtitle?: string
  coverInfo?: string
}

// Socials links
export interface ISocialLink {
  href: string
  'aria-label': string
  icon: {
    title: string
    name: string
  }
}
