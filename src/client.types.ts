// TODO: Fully type responses from Statamic API. https://statamic.dev/rest-api does not document all properties that are actually returned. See Entry for example.
// TODO: Comments for non-obvious properties.

export enum endpoint {
  COLLECTIONS = 'collections',
  ENTRIES = 'entries',
  NAVIGATION = 'navs',
  TREE = 'tree',
  TAXONOMIES = 'taxonomies',
  TERMS = 'terms',
  GLOBALS = 'globals',
  FORMS = 'forms',
  USERS = 'users',
  ASSETS = 'assets',
}

/**
 * A page contains the data of an entry in the entry tree.
 */
interface Page {
  children: Page[];
  depth: number;
  title: string;
  url: string;
}

export interface Entry {
  id: string;
  [key: string]: unknown;
}

export interface Entries {
  data: Entry[];
  links: Links;
  meta: Meta;
}

export type CollectionTree = CollectionTreeLeaf[];

interface CollectionTreeLeaf {
  entry: Entry;
  depth: number;
  page: Page;
  children: CollectionTreeLeaf[];
}

export type NavigationTree = NavigationTreeLeaf[];

export interface NavigationTreeLeaf {
  /**
   * Navigation item or entry.
   */
  item: NavigationItem | Entry;
  depth: number;
  page: Page;
  children: NavigationTreeLeaf[];
}

export interface NavigationItem {
  id: string;
  permalink: string;
  title: string;
  url: string;
  uri: string;
  [key: string]: unknown;
}

export interface Term {
  api_url: string;
  edit_url: string;
  entries_count: number;
  id: string;
  is_term: boolean;
  locale: string;
  permalink: string;
  slug: string;
  taxonomy: Taxonomy;
  title: string;
  updated_at: string;
  updated_by: Author;
  uri: string;
  url: string;
  [key: string]: unknown;
}

export interface Terms {
  data: Term[];
  links: Links;
  meta: Meta;
}

export interface Taxonomy {
  title: string;
  handle: string;
  uri: string;
  url: string;
  permalink: string;
}

export interface Global {
  api_url: string;
  handle: string;
  [key: string]: unknown;
}

export type Globals = Global[];

export interface Form {
  api_url: string;
  handle: string;
  title: string;
  /**
   * Returns empty array if no fields are defined.
   * Otherwise, returns an object with field handles as keys and field
   * data as values.
   */
  fields: [] | object;
  [key: string]: unknown;
}

export type Forms = Form[];

export interface User {
  id: string;
  email: string;
  api_url: string;
  [key: string]: unknown;
}

export interface Users {
  data: User[];
  links: Links;
  meta: Meta;
}

export interface Asset {
  id: string;
  api_url: string;
  url: string;
}

export interface Assets {
  data: Asset[];
  links: Links;
  meta: Meta;
}

interface Links {
  first: string;
  last: string;
  next: string;
  prev: string;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string;
    label: string;
    active: boolean;
  }[];
  path: URL;
  per_page: number;
  to: number;
  total: number;
}

interface Author {
  api_url: string;
  email: string;
  id: number;
  name: string;
}
