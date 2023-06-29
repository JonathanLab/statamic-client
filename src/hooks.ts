'use client';

import { useContext } from 'react';
import { ClientContext } from './ClientContextProvider';
import { Client } from './client';
import useSWR, { SWRConfiguration } from 'swr';
import { Params } from './params.types';

export const useClient = (): Client => {
  const client = useContext(ClientContext);

  if (!client) {
    throw new Error('useClient must be used within a ClientContextProvider');
  }

  return client;
};

export const useEntry = (
  collection: string,
  handle: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [collection, handle, params],
    ([...args]) => client.getEntry(...args),
    swrConfig
  );
};

export const useEntries = (
  collection: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [collection, params],
    ([...args]) => client.getEntries(...args),
    swrConfig
  );
};

export const useCollectionTree = (
  collection: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [collection, params],
    ([...args]) => client.getCollectionTree(...args),
    swrConfig
  );
};

export const useNavigationTree = (
  navigation: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [navigation, params],
    ([...args]) => client.getNavigationTree(...args),
    swrConfig
  );
};

export const useTaxonmyTerms = (
  taxonomy: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [taxonomy, params],
    ([...args]) => client.getTaxonomyTerms(...args),
    swrConfig
  );
};

export const useTaxonomyTerm = (
  taxonomy: string,
  slug: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [taxonomy, slug, params],
    ([...args]) => client.getTaxonomyTerm(...args),
    swrConfig
  );
};

export const useGlobals = (params?: Params, swrConfig?: SWRConfiguration) => {
  const client = useClient();

  return useSWR([params], ([...args]) => client.getGlobals(...args), swrConfig);
};

export const useGlobal = (
  handle: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [handle, params],
    ([...args]) => client.getGlobal(...args),
    swrConfig
  );
};

export const useForms = (params?: Params, swrConfig?: SWRConfiguration) => {
  const client = useClient();

  return useSWR([params], ([...args]) => client.getForms(...args), swrConfig);
};

export const useForm = (
  handle: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [handle, params],
    ([...args]) => client.getForm(...args),
    swrConfig
  );
};

export const useUsers = (params?: Params, swrConfig?: SWRConfiguration) => {
  const client = useClient();

  return useSWR([params], ([...args]) => client.getUsers(...args), swrConfig);
};

export const useUser = (
  id: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [id, params],
    ([...args]) => client.getUser(...args),
    swrConfig
  );
};

export const useAssets = (
  container: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [container, params],
    ([...args]) => client.getAssets(...args),
    swrConfig
  );
};

export const useAsset = (
  container: string,
  path: string,
  params?: Params,
  swrConfig?: SWRConfiguration
) => {
  const client = useClient();

  return useSWR(
    [container, path, params],
    ([...args]) => client.getAsset(...args),
    swrConfig
  );
};
