import { TreeParams, Params } from './params.types';
import {
  Asset,
  Assets,
  CollectionTree,
  endpoint,
  Entries,
  Entry,
  Form,
  Forms,
  Globals,
  NavigationTree,
  Term,
  Terms,
  User,
  Users,
} from './client.types';
import { buildParams, setSiteFilter } from './params';
import {
  parseAsset,
  parseCollectionTree,
  parseEntry,
  parseForm,
  parseForms,
  parseGlobal,
  parseGlobals,
  parseNavigationTree,
  parseTaxonomyTerm,
  parseUser,
} from './responseParsers';

export class Client {
  private readonly apiUrl: string;
  private readonly defaultRequestInit: RequestInit;
  private readonly defaultSite: string;

  /**
   * Create a new Client instance.
   * @param apiUrl The Statamic API URL, for example: https://example.com/api/.
   * @param defaultRequestInit A RequestInit object to be used as default for all requests.
   * @param defaultSite A string describing the default site handle to use for all requests.
   *                    Only required if the site is a multisite. For example: 'en'.
   */
  constructor(
    apiUrl?: string,
    defaultRequestInit?: RequestInit,
    defaultSite?: string
  ) {
    if (!apiUrl) {
      throw new Error('No API URL provided');
    }

    if (apiUrl[apiUrl.length - 1] !== '/') {
      throw new Error('API URL must end with a slash');
    }

    this.apiUrl = apiUrl ? apiUrl : process.env.STATAMIC_API_URL;
    this.defaultRequestInit = defaultRequestInit
      ? defaultRequestInit
      : {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };

    if (defaultSite) {
      this.defaultSite = defaultSite;
    }
  }

  /**
   * Perform a fetch request to URL with RequestInit.
   * @param url The URL to fetch.
   * @param requestInit A RequestInit object passed to fetch.
   */
  private async request(url: URL, requestInit?: RequestInit) {
    if (!requestInit) {
      requestInit = this.defaultRequestInit;
    }

    requestInit.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(requestInit?.headers ?? {}),
    };

    try {
      const response = await fetch(url, requestInit);

      if (!response.ok) {
        throw new Error(
          `Request failed with status code ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      // stringify the requestInit object for better error messages
      throw new RequestError(error, url, requestInit);
    }
  }

  /**
   * Perform a GET request to a path with optional Params.
   * @param path The path to fetch.
   * @param params A Params object.
   * @returns JSON response
   */
  async get(path: string, params?: Params) {
    const url = this.buildURL(path, this.apiUrl, params);
    return await this.request(url);
  }

  /**
   * Build a URL object from a path, the apiUrl and the Params object.
   * @param path The path to fetch.
   * @param base The base URL to use.
   * @param params A Params object.
   * @returns URL object
   */
  private buildURL(path: string, base: string, params?: Params): URL {
    const url = new URL(path, base);
    const urlParams = params ? buildParams(params).toString() : '';

    return new URL(`${url.toString()}${urlParams ? '?' + urlParams : ''}`);
  }

  /**
   * Get all entries from a collection.
   * @param collection A string describing the collection handle.
   * @param params A Params object.
   */
  async getEntries(collection: string, params?: Params): Promise<Entries> {
    const path = `${endpoint.COLLECTIONS}/${collection}/${endpoint.ENTRIES}`;

    // When using multi-site, the entries endpoint will serve from all sites at once.
    params = setSiteFilter(params);

    return await this.get(path, params);
  }

  /**
   * Get a single entry from a collection by its ID.
   * @param collection A string describing the collection handle.
   * @param id A string describing the entry ID.
   * @param params A Params object.
   */
  async getEntry(
    collection: string,
    id: string,
    params?: Params
  ): Promise<Entry> {
    const path = `${endpoint.COLLECTIONS}/${collection}/${endpoint.ENTRIES}/${id}`;
    return parseEntry(await this.get(path, params));
  }

  /**
   * Get the collection tree by its handle.
   * @param collection
   * @param params
   */
  async getCollectionTree(
    collection: string,
    params?: TreeParams
  ): Promise<CollectionTree> {
    const path = `${endpoint.COLLECTIONS}/${collection}/${endpoint.TREE}`;
    return parseCollectionTree(await this.get(path, params));
  }

  /**
   * Get the navigation tree by its handle.
   * @param navigation
   * @param params
   */
  async getNavigationTree(
    navigation: string,
    params?: TreeParams
  ): Promise<NavigationTree> {
    const path = `${endpoint.NAVIGATION}/${navigation}/${endpoint.TREE}`;
    return parseNavigationTree(await this.get(path, params));
  }

  /**
   * Get the taxonomy terms by its taxonomy handle.
   * @param taxonomy
   * @param params
   */
  async getTaxonomyTerms(taxonomy: string, params?: Params): Promise<Terms> {
    const path = `${endpoint.TAXONOMIES}/${taxonomy}/${endpoint.TERMS}`;

    // When using multi-site, the terms endpoint will serve from all sites at once.
    params = setSiteFilter(params);

    return await this.get(path, params);
  }

  /**
   * Get a single taxonomy term by its slug.
   * @param taxonomy
   * @param slug
   * @param params
   */
  async getTaxonomyTerm(
    taxonomy: string,
    slug: string,
    params?: Params
  ): Promise<Term> {
    const path = `${endpoint.TAXONOMIES}/${taxonomy}/${endpoint.TERMS}/${slug}`;
    return parseTaxonomyTerm(await this.get(path, params));
  }

  /**
   * Get all the globals.
   * @param params
   */
  async getGlobals(params?: Params): Promise<Globals> {
    const path = `${endpoint.GLOBALS}`;

    // When using multi-site, the globals endpoint will serve from all sites at once.
    params = setSiteFilter(params);

    return parseGlobals(await this.get(path, params));
  }

  /**
   * Get a single global by its handle.
   * @param handle
   * @param params
   */
  async getGlobal(handle: string, params?: Params): Promise<Global> {
    const path = `${endpoint.GLOBALS}/${handle}`;
    return parseGlobal(await this.get(path, params));
  }

  /**
   * Get all the forms.
   * @param params
   */
  async getForms(params?: Params): Promise<Forms> {
    const path = `${endpoint.FORMS}`;
    return parseForms(await this.get(path, params));
  }

  /**
   * Get a single form by its handle.
   * @param handle
   * @param params
   */
  async getForm(handle: string, params?: Params): Promise<Form> {
    const path = `${endpoint.FORMS}/${handle}`;
    return parseForm(await this.get(path, params));
  }

  /**
   * Get all the users.
   * @param params
   */
  async getUsers(params?: Params): Promise<Users> {
    const path = `${endpoint.USERS}`;
    return await this.get(path, params);
  }

  /**
   * Get a single user by its ID.
   * @param id
   * @param params
   */
  async getUser(id: string, params?: Params): Promise<User> {
    const path = `${endpoint.USERS}/${id}`;
    return parseUser(await this.get(path, params));
  }

  /**
   * Get all the assets from a container.
   * @param container
   * @param params
   */
  async getAssets(container: string, params?: Params): Promise<Assets> {
    const path = `${endpoint.ASSETS}/${container}`;
    return await this.get(path, params);
  }

  /**
   * Get a single asset by its path.
   * @param container
   * @param path
   * @param params
   */
  async getAsset(
    container: string,
    path: string,
    params?: Params
  ): Promise<Asset> {
    const apiPath = `${endpoint.ASSETS}/${container}/${path}`;
    return parseAsset(await this.get(apiPath, params));
  }
}

class RequestError extends Error {
  constructor(error: Error, url: URL, requestInit: RequestInit) {
    super(error.message);
    this.name = 'RequestError';
    this.message =
      error.message +
      '\n' +
      'URL: ' +
      url.toString() +
      '\n' +
      JSON.stringify(requestInit, null, 2);
  }
}
