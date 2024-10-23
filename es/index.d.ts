import Bus from "./OOP/bus/bus";
import IndexedDBWrapper from "./OOP/indexedDB/indexedDB";
import Watermark from "./OOP/waterMark/waterMark";
import uuid from "./FP/uuid/index";
import getLocaltion from "./FP/location/index";
import { Memoize } from "./FP/memoize/memoize";
export { Bus, IndexedDBWrapper, Watermark, uuid, getLocaltion, Memoize };
declare const _default: {
    Bus: typeof Bus;
    IndexedDBWrapper: typeof IndexedDBWrapper;
    Watermark: typeof Watermark;
    uuid: {
        buildShortID: () => string;
        buildID: () => string;
    };
    getLocaltion: (timeout?: number | undefined) => Promise<{
        latitude: number;
        longitude: number;
    }>;
    Memoize: typeof Memoize;
};
export default _default;
