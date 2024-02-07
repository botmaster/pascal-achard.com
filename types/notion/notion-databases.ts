/*
export interface QueryResponse {
  object: string
  results: Result[]
  next_cursor: string
  has_more: boolean
  type: string
  page_or_database: PageOrDatabase
  request_id: string
}

export interface PageOrDatabase {
}

export interface Result {
  object: string
  id: string
  created_time: Date
  last_edited_time: Date
  created_by: TedBy
  last_edited_by: TedBy
  cover: null
  icon: Icon
  parent: Parent
  archived: boolean
  properties: Properties
  url: string
  public_url: null
}

export interface TedBy {
  object: 'user'
  id: string
}

export interface Icon {
  type: string
  external: External
}

export interface External {
  url: string
}

export interface Parent {
  type: string
  database_id: string
}

export interface Properties {
  URL: URL
  Score: Score
  Status: Score
  'Created time': CreatedTime
  Tags: Tags
  Name: Name
}

export interface CreatedTime {
  id: string
  type: string
  created_time: Date
}

export interface Name {
  id: string
  type: string
  title: Title[]
}

export interface Title {
  type: string
  text: Text
  annotations: Annotations
  plain_text: string
  href: null
}

export interface Annotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

export interface Text {
  content: string
  link: null
}

export interface Score {
  id: ID
  type: 'select'
  select: Select | null
}

export enum ID {
  The5Czxs = '%5CZXS',
  UIx5E = 'UIx%5E',
}

export interface Select {
  id: string
  name: string
  color: string
}

export interface Tags {
  id: string
  type: string
  multi_select: Select[]
}

export interface URL {
  id: string
  type: string
  url: string
}
*/
