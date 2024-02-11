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
  'href': string
  'aria-label': string
  'icon': {
    title: string
    name: string
  }
}

/**
 * Readings
 */

// Article
export interface IArticle {
  title: string
  description: string
  tags: IArticleTag[]
  image: string
  url: string
  createdTime: string
  lastEditedTime: string
  id: string
  score: IArticleScore
  status: IArticleStatus
}

export interface IArticleTag {
  id: string
  name: string
  color: NotionColorsEnum
}

export interface IArticleStatus {
  id: string
  name: string
  color: NotionColorsEnum
}

export interface IArticleScore {
  id: string
  name: string
  color: NotionColorsEnum
}

export enum NotionColorsEnum {
  default = 'default',
  gray = 'gray',
  brown = 'brown',
  orange = 'orange',
  yellow = 'yellow',
  green = 'green',
  blue = 'blue',
  purple = 'purple',
  pink = 'pink',
  red = 'red',
}
