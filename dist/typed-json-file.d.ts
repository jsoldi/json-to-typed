import { Convert, Guard } from 'to-typed';
export declare class TypedJsonFile<T> {
    readonly path: string;
    readonly defaults: Convert<T>;
    constructor(path: string, defaults: Convert<T>);
    read(): Promise<T>;
    write(data: T): Promise<void>;
    static fromDefaults<S>(path: string, defaults: S): TypedJsonFile<S | (S extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<S> : S extends Guard<infer R> ? R : S extends { [k in keyof S]: any; } ? S extends infer T ? { [k_1 in keyof T]: S[k_1] extends infer T_1 ? T_1 extends S[k_1] ? T_1 extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<T_1> : T_1 extends Guard<infer R> ? R : T_1 extends { [k_2 in keyof T_1]: any; } ? T_1 extends infer T_2 ? { [k_3 in keyof T_2]: T_1[k_3] extends infer T_3 ? T_3 extends T_1[k_3] ? T_3 extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<T_3> : T_3 extends Guard<infer R> ? R : T_3 extends { [k_4 in keyof T_3]: any; } ? T_3 extends infer T_4 ? { [k_5 in keyof T_4]: T_3[k_5] extends infer T_5 ? T_5 extends T_3[k_5] ? T_5 extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<T_5> : T_5 extends Guard<infer R> ? R : T_5 extends { [k_6 in keyof T_5]: any; } ? T_5 extends infer T_6 ? { [k_7 in keyof T_6]: T_5[k_7] extends infer T_7 ? T_7 extends T_5[k_7] ? T_7 extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<T_7> : T_7 extends Guard<infer R> ? R : T_7 extends { [k_8 in keyof T_7]: any; } ? T_7 extends infer T_8 ? { [k_9 in keyof T_8]: T_7[k_9] extends infer T_9 ? T_9 extends T_7[k_9] ? T_9 extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<T_9> : T_9 extends Guard<infer R> ? R : T_9 extends { [k_10 in keyof T_9]: any; } ? T_9 extends infer T_10 ? { [k_11 in keyof T_10]: T_9[k_11] extends infer T_11 ? T_11 extends T_9[k_11] ? T_11 extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<T_11> : T_11 extends Guard<infer R> ? R : T_11 extends { [k_12 in keyof T_11]: any; } ? T_11 extends infer T_12 ? { [k_13 in keyof T_12]: T_11[k_13] extends infer T_13 ? T_13 extends T_11[k_13] ? T_13 extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<T_13> : T_13 extends Guard<infer R> ? R : T_13 extends { [k_14 in keyof T_13]: any; } ? T_13 extends infer T_14 ? { [k_15 in keyof T_14]: T_13[k_15] extends infer T_15 ? T_15 extends T_13[k_15] ? T_15 extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<T_15> : T_15 extends Guard<infer R> ? R : T_15 extends { [k_16 in keyof T_15]: any; } ? T_15 extends infer T_16 ? { [k_17 in keyof T_16]: T_15[k_17] extends infer T_17 ? T_17 extends T_15[k_17] ? T_17 extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<T_17> : T_17 extends Guard<infer R> ? R : T_17 extends { [k_18 in keyof T_17]: any; } ? T_17 extends infer T_18 ? { [k_19 in keyof T_18]: T_17[k_19] extends infer T_19 ? T_19 extends T_17[k_19] ? T_19 extends import("to-typed/dist/types/types").SimpleType ? import("to-typed/dist/types/types").SimpleTypeOf<T_19> : T_19 extends Guard<infer R> ? R : T_19 extends { [k_20 in keyof T_19]: any; } ? T_19 extends infer T_20 ? { [k_21 in keyof T_20]: any; } : never : unknown : never : never; } : never : unknown : never : never; } : never : unknown : never : never; } : never : unknown : never : never; } : never : unknown : never : never; } : never : unknown : never : never; } : never : unknown : never : never; } : never : unknown : never : never; } : never : unknown : never : never; } : never : unknown : never : never; } : never : unknown)>;
}