export interface RSSItem {
  guid: string;
  title: string;
  content?: string;
  link: string;
  isoDate?: string; // ISO timestamp
  [key: string]: unknown; // other RSS fields
}
