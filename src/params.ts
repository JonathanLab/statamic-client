import {
  Params,
  Field,
  FilterField,
  SortField,
  TreeParams,
} from './params.types';

/**
 * Build a URLSearchParams object from a Params object
 */
export const buildParams = (params: Params | TreeParams): URLSearchParams => {
  const { select, filter, sort } = params;

  // page, limit, site, max_depth
  return new URLSearchParams({
    ...Object.fromEntries(buildSelectParams(select)),
    ...Object.fromEntries(buildFilterParams(filter)),
    ...Object.fromEntries(buildSortParams(sort)),
    ...Object.fromEntries(buildOtherParams(params)),
  });
};

/**
 * Build a URLSearchParams object from a select field or array of select fields.
 */
const buildSelectParams = (select: Field | Field[]): URLSearchParams => {
  if (!select) {
    return new URLSearchParams();
  }

  const parsedSelect = Array.isArray(select) ? select.join(',') : select;
  return new URLSearchParams([['fields', parsedSelect]]);
};

/**
 * Build a URLSearchParams object from a sort field or array of sort fields.
 */
const buildFilterParams = (
  filter: FilterField | FilterField[]
): URLSearchParams => {
  const parsedFilter = new URLSearchParams();

  if (!filter) {
    return parsedFilter;
  }

  if (Array.isArray(filter)) {
    filter.forEach((filterField) => {
      const [key, value] = buildFilterParam(filterField);
      parsedFilter.append(key, value);
    });
  } else {
    const [key, value] = buildFilterParam(filter);
    parsedFilter.append(key, value);
  }

  return parsedFilter;
};

/**
 * Build a tuple from a filter field in the shape of `[key, value]`. For example `['filter[title:equals]', 'foo']`.
 * @returns A tuple in the shape of `[key, value]`
 */
const buildFilterParam = (filter: FilterField): [string, string] => {
  const { field, condition, value } = filter;

  if (condition) {
    return [`filter[${field}:${condition}]`, value];
  } else {
    return [`filter[${field}]`, value];
  }
};

/**
 * Build a string from a sort field.
 * @returns A string in the shape of `field` or `-field` if reverse is true
 */
const buildSortParam = (sort: SortField): string => {
  if (typeof sort === 'string') {
    return sort;
  }

  const { field, reverse } = sort;
  return reverse ? `-${field}` : field;
};

/**
 * Build a URLSearchParams object from a sort field or array of sort fields
 */
const buildSortParams = (sort: SortField | SortField[]): URLSearchParams => {
  if (!sort) {
    return new URLSearchParams();
  }

  const parsedSort = Array.isArray(sort)
    ? sort.map(buildSortParam).join(',')
    : buildSortParam(sort);

  return new URLSearchParams([['sort', parsedSort]]);
};

/**
 * Build all other params from a Params object.
 */
const buildOtherParams = (params: Params): URLSearchParams => {
  const parsedParams = new URLSearchParams();

  // This is a bit of a hack: We don't check whether values are primitives before calling toString on them.
  Object.entries(params).forEach(([key, value]) => {
    if (!['select', 'filter', 'sort'].includes(key)) {
      parsedParams.append(key, value.toString());
    }
  });

  return parsedParams;
};

/**
 * Utility function to set the site filter on a params object, replacing the site param.
 */
export const setSiteFilter = (params: Params): Params => {
  if (params?.site) {
    params.filter = params.filter ?? [];
    const siteFilter = {
      field: 'site',
      value: params.site,
    };

    if (Array.isArray(params.filter)) {
      params.filter.push(siteFilter);
    } else {
      params.filter = [params.filter, siteFilter];
    }

    delete params.site;
  }

  return params;
};
