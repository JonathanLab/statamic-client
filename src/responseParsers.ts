// TODO: responseParsers.ts is a WIP. Right now only the bare minimum is implemented.
//  Maybe will be useful later in case the API change or if we'd like to make responses more convenient.
import {
  Asset,
  Assets,
  CollectionTree,
  Entries,
  Entry,
  Form,
  Forms,
  Global,
  Globals,
  NavigationTree,
  Term,
  Terms,
  User,
  Users,
} from './client.types';

/**
 * WIP response, to be expanded.
 */
interface Response {
  [key: string]: unknown;
}

export const parseEntry = (response: Response): Entry => {
  return <Entry>response.data;
};

export const parseEntries = (response: Response): Entries => {
  return <Entries>response.data;
};

export const parseCollectionTree = (response: Response): CollectionTree => {
  return <CollectionTree>response.data;
};
export const parseNavigationTree = (response: Response): NavigationTree => {
  return <NavigationTree>response.data;
};

export const parseTaxonomyTerms = (response: Response): Terms => {
  return <Terms>response.data;
};

export const parseTaxonomyTerm = (response: Response): Term => {
  return <Term>response.data;
};

export const parseGlobals = (response: Response): Globals => {
  return <Globals>response.data;
};

export const parseGlobal = (response: Response): Global => {
  return <Global>response.data;
};

export const parseForms = (response: Response): Forms => {
  return <Forms>response.data;
};

export const parseForm = (response: Response): Form => {
  return <Form>response.data;
};

export const ParseUsers = (response: Response): Users => {
  return <Users>response.data;
};

export const parseUser = (response: Response): User => {
  return <User>response.data;
};

export const parseAssets = (response: Response): Assets => {
  return <Assets>response.data;
};

export const parseAsset = (response: Response): Asset => {
  return <Asset>response.data;
};
