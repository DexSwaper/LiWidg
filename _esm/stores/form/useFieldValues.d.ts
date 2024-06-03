import type { FormFieldArray } from './types.js';
export declare const useFieldValues: <T extends (keyof import("./types.js").DefaultValues)[]>(...names: T) => FormFieldArray<T>;
