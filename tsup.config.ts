import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    bus: 'src/event/bus/bus.ts',
    indexeddb: 'src/storage/indexedDB/indexedDB.ts',
    watermark: 'src/browser/waterMark/waterMark.ts',
    location: 'src/browser/location/index.ts',
    'promise-queue': 'src/async/promiseQueue/index.ts',
    uuid: 'src/utils/uuid/index.ts',
    memoize: 'src/utils/memoize/memoize.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  target: 'es2020',
  splitting: false,
  clean: true,
  treeshake: true,
});
