# Statamic Client

Javascript client to interact with the [Statamic API](https://statamic.dev/rest-api).

## Installation
`npm install statamic-client`

## Configuration
The client needs to be configured with the base URL (`https://yourwebsite.test/api/`) of the Statamic API. This can be done in two ways:
- Set the `apiUrl` option in the `Client` constructor.
- Set the `STATAMIC_API_URL` environment variable.

Make sure the Statamic API is enabled in your `.env` file:

```
STATAMIC_API_ENABLED=true
```

Each resource that is requested from the API [needs to be enabled](https://statamic.dev/rest-api#enable-resources)
in the `config/statamic/api.php` file.

## Usage

There are two ways to use the client. 
The first is to use the `StatamicClient` class directly.
The second is to use the provided hooks. These hooks make use of SWR to cache the data and can
only be used in React components.


#### Using the `StatamicClient` class directly:

```javascript
import { Client } from 'statamic-client';

const client = new Client({
  apiUrl: 'https://statamic.test/api/',
});

const entry = await client.getEntry('pages', 'home');

console.log(entry.title);
```

#### Using the hooks:

```javascript
import { useEntry } from 'statamic-client';

export function Component() {
    const { data: entry, error, isLoading } = useEntry('pages', 'home');

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!entry) {
        return <div>Loading...</div>;
    }

    return <div>{entry.title}</div>;
}
```

#### Hook components need to be wrapped in a `ClientContextProvider`:

```javascript
import { ClientContextProvider } from 'statamic-client';

export function App() {
    return (
        <ClientContextProvider apiUrl="https://statamic.test/api/">
            <Component />
        </ClientContextProvider>
    );
}
```

See the [SWR documentation](https://swr.vercel.app/) for more information.

## API responses
The client will return unmodified responses from the [Statamic API](https://statamic.dev/rest-api), 
except for the following endpoints:
+ Entry
+ CollectionTree
+ NavigationTree
+ TaxonomyTerm
+ Globals
+ Global
+ Forms
+ Form
+ User
+ Asset

These responses usually only contain an object with a data property. The client will return the data property directly.


```json
{
  "title": "My First Day"
}
```



 All other responses are paginated and unmodified:

```json
{
  
  "data": [
    {
      "title": "Music"
    },
    {
      "title": "Movies"
    },
    {
      "title": "Books"
    }
  ],
  "links": {
    "first": "https://statamic.test/api/collections/pages/entries?page=1",
    "last": "https://statamic.test/api/collections/pages/entries?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
      },
      {
        "url": "https://statamic.test/api/collections/pages/entries?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": null,
        "label": "Next &raquo;",
        "active": false
      }
    ],
    "path": "https://statamic.test/api/collections/pages/entries",
    "per_page": 50,
    "to": 1,
    "total": 1
  }
}
```

## Parameters

### Filtering

Make sure to [enable filtering]('https://statamic.dev/rest-api#enabling-filters') for the resource you want to filter.

See the [Statamic documentation](https://statamic.dev/rest-api#filtering) for more information.

```javascript
const entries = await client.getEntries('pages', {
    filter: {
        /**
         * A string describing the field to filter by.
         */
        field: 'title',
        /**
         * A string describing the condition to filter by.
         * If omitted, defaults to `equals` in Statamic.
         * See the `Condition` enum for all available conditions.
         */
        condition: Condition.EQUALS,
        /**
         * A string used as value to compare the field against.
         */
        value: 'Home'
    },
});
``` 

#### Multiple filters

```javascript
const entries = await client.getEntries('pages', {
    filter: [
        {
            field: 'title',
            condition: Condition.EQUALS,
            value: 'Home'
        },
        {
            field: 'slug',
            condition: Condition.EQUALS,
            value: 'home'
        }
    ],
});
```

### Selecting a field

See the [Statamic documentation](https://statamic.dev/rest-api#selecting-fields) for more information.

```javascript
const entries = await client.getEntries('pages', {
  select: 'title',
});
```

#### Selecting multiple fields

```javascript
const entries = await client.getEntries('pages', {
  select: [
        'title',
        'slug',
    ],
});
```


### Sorting
See the [Statamic documentation](https://statamic.dev/rest-api#sorting) for more information.

```javascript
const entries = await client.getEntries('pages', {
  sort: {
        /**
         * A string describing the field to sort by.
         */
        field: 'fieldA',
        /**
         * A boolean describing whether the sort should be reversed.
         */
        reverse: true,
    },
});
```

#### Sorting by multiple fields


```javascript
const entries = await client.getEntries('pages', {
  sort: [
        {
            field: 'fieldA',
            reverse: true,
        },
        {
            field: 'fieldB',
        }
    ],
});
```

### Pagination

```javascript
const entries = await client.getEntries('pages', {
  /**
   * A number describing which page of results to return.
   */
  page: 2,
  /**
   * A number describing how many results to return per page.
   * Set to 25 by default by Statamic.
   */
  limit: 10,
});
```

### Site locale

```javascript
const entries = await client.getEntries('pages', {
  site: 'nl',
});
```

### Maximum tree depth

```javascript
const tree = await client.getCollectionTree('pages', {
  /**
   * A number describing the maximum depth of the tree to return.
   */
  maxDepth: 2,
});
```
