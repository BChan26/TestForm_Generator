import { WListLevel } from './list-level';
/**
 * @private
 */
export declare class WAbstractList {
    private abstractListIdIn;
    levels: WListLevel[];
    abstractListId: number;
    clear(): void;
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    destroy(): void;
    clone(): WAbstractList;
}
