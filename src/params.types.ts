/**
 * A string describing the field to sort by.
 * See ['Tag Conditions - Statamic Docs'](https://statamic.dev/conditions#string-conditions) for more information.
 */
export enum Condition {
  /**
   * Field is equal to value.
   */
  EQUALS = 'is',
  /**
   * Field is not equal to value.
   */
  NOT_EQUALS = 'not',
  /**
   * Field exists.
   */
  EXISTS = 'exists',
  /**
   * Field does not exist.
   */
  DOES_NOT_EXIST = 'doesnt_exist',
  /**
   * Field contains value.
   */
  CONTAINS = 'contains',
  /**
   * Field does not contain value.
   */
  DOES_NOT_CONTAIN = 'doesnt_contain',
  /**
   * Field is in the provided array.
   */
  IN = 'in',
  /**
   * Field is not in the provided array.
   */
  NOT_IN = 'not_in',
  /**
   * Field starts with value.
   */
  STARTS_WITH = 'starts_with',
  /**
   * Field does not start with value.
   */
  DOES_NOT_START_WITH = 'doesnt_start_with',
  /**
   * Field ends with value.
   */
  ENDS_WITH = 'ends_with',
  /**
   * Field does not end with value.
   */
  DOES_NOT_END_WITH = 'doesnt_end_with',
  /**
   * Field is greater than value.
   */
  GreaterThan = 'gt',
  /**
   * Field is greater than or equal to value.
   */
  GREATER_THAN_OR_EQUAL = 'gte',
  /**
   * Field is less than value.
   */
  LESS_THAN = 'lt',
  /**
   * Field is less than or equal to value.
   */
  LESS_THAN_OR_EQUAL = 'lte',
  /**
   * Field matches case-insensitive regex.
   */
  REGEX = 'regex',
  /**
   * Field does not match case-insensitive regex.
   */
  NOT_REGEX = 'not_regex',
  /**
   * Field contains only alphabetical characters.
   */
  IS_ALPHA = 'is_alpha',
  /**
   * Field contains only numeric characters.
   */
  IS_NUMERIC = 'is_numeric',
  /**
   * Field contains only alphanumeric characters.
   */
  IS_ALPHANUMERIC = 'is_alpha_numeric',
  /**
   * Field is a valid URL.
   */
  IS_URL = 'is_url',
  /**
   * Field is an embeddable video URL.
   */
  IS_EMBEDDABLE = 'is_embeddable',
  /**
   * Field is a valid email address.
   */
  IS_EMAIL = 'is_email',
  /**
   * Field is after date.
   */
  IS_AFTER = 'is_after',
  /**
   * Field is before date.
   */
  IS_BEFORE = 'is_before',
}

export type Field = string;

export type FilterField = {
  /**
   * A string describing the field to filter by.
   */
  field: Field;
  /**
   * A string describing the condition to filter by.
   * If omitted, defaults to `equals` in Statamic.
   */
  condition?: Condition;
  /**
   * A string used as value to compare the field against.
   */
  value: string;
};

export type SortField =
  | string
  | {
      /**
       * A string describing the field to sort by.
       */
      field: Field;
      /**
       * A boolean describing whether the sort should be reversed.
       */
      reverse: boolean;
    };

/**
 * Available parameters for the Statamic API.
 */
export interface Params {
  /**
   * A field or array of fields to return in the result.
   * Only works for endpoints that provide paginated results.
   */
  select?: Field | Field[];
  /**
   * A filter or array of filters used to filter the result.
   * NOTE: For security, filtering is disabled by default.
   * To enable, you'll need to opt in by defining a list of allowed filters.
   * See ['Filtering - Statamic Docs'](https://statamic.dev/queries#filtering) for more information.
   */
  filter?: FilterField | FilterField[];
  /**
   * A field or array of fields used to sort the result.
   * Fields can be sorted in reverse by specifying a `FilterField`
   * object with a `reverse` property set to `true`.
   */
  sort?: SortField | SortField[];
  /**
   * A number describing which page of results to return.
   */
  page?: number;
  /**
   * A number describing how many results to return per page.
   * Set to 25 by default by Statamic.
   */
  limit?: number;
  /**
   * A string describing the multi-site handle to return results from.
   * Only available if the site is a multisite.
   */
  site?: string;
}

export interface TreeParams extends Params {
  /**
   * A number describing the maximum depth of the tree.
   */
  max_depth?: number;
}
