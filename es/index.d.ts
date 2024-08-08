import Bus from "./OOP/bus/bus";
import IndexedDBWrapper from "./OOP/indexedDB/indexedDB";
import Watermark from "./OOP/waterMark/waterMark";
import uuid from "./AOP/uuid/index";
export { Bus, IndexedDBWrapper, Watermark, uuid };
declare const _default: {
    Bus: typeof Bus;
    IndexedDBWrapper: typeof IndexedDBWrapper;
    Watermark: typeof Watermark;
    uuid: {
        buildShortID: () => string;
        buildID: () => string;
    };
};
export default _default;
