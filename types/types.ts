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

/**
 * LastFM API
 * Recent tracks
 */

export interface Recenttracks {
  track: Track[]
  '@attr': RecenttracksAttr
}

export interface RecenttracksAttr {
  user: string
  totalPages: number
  page: number
  perPage: number
  total: number
}

export interface Track {
  artist: Artist
  mbid: string
  name: string
  image: Image[]
  streamable: string
  album: Album
  url: string
  '@attr'?: TrackAttr
  loved: string
  id: string
  date?: DateClass
}

export interface TrackAttr {
  nowplaying: string
}

export interface Album {
  mbid: string
  '#text': string
}

export interface Artist {
  url: string
  name: string
  image: Image[]
  mbid: string
}

export interface Image {
  size: Size
  '#text': string
}

export enum Size {
  Extralarge = 'extralarge',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export interface DateClass {
  uts: number
  '#text': string
}
