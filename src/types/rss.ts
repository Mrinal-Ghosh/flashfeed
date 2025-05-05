export interface RSSItem {
  guid: string;
  title: string;
  content?: string;
  link: string;
  isoDate?: string; // ISO timestamp
  [key: string]: any; // other RSS fields
}
