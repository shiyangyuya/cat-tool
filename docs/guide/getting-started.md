# Quick Start {#getting-started}

## Installation {#installation}

Install `cat-tool` using your preferred package manager:

::: code-group

```sh [npm]
$ npm install cat-tool
```

```sh [pnpm]
$ pnpm add cat-tool
```

```sh [yarn]
$ yarn add cat-tool
```

:::

## Usage Examples {#usage}

### 1. Basic Usage (Named Imports)

`cat-tool` recommends using named imports to leverage **Tree Shaking** in modern bundlers (like Vite, Webpack, or Rollup).

```js
import { uuid, Watermark } from 'cat-tool';

// Generate a short ID
const id = uuid.buildShortID();

// Add a page watermark
const wm = new Watermark({ content: 'Confidential' });
```

### 2. Async Orchestration (IndexedDB)

Most interactive tools provide Promise-based asynchronous interfaces:

```js
import { IndexedDBWrapper } from 'cat-tool';

const db = new IndexedDBWrapper('MyStorage', 'users', 1);

async function saveUser() {
  await db.add({ id: 1, name: 'Cat' });
  const user = await db.get(1);
  console.log(user);
}
```

## Next Steps {#next-steps}

- 📚 **Explore APIs**: All tools are categorized in the left sidebar.
- 🔍 **Detailed Specs**: Each tool has dedicated documentation with parameter details and scenarios.
- 🧪 **Reliability**: All example code is verified by our internal unit tests.
