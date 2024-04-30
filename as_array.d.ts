type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
export type EnumValues<Input extends readonly {
    value: any;
}[]> = ArrayElement<Input>['value'];
export type EnumNames<Input extends readonly {
    name: any;
}[]> = ArrayElement<Input>['name'];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type ConvertToPairNameValue<T> = T extends {
    name: string;
    value: any;
} ? {
    [index in T['name']]: T['value'];
} : never;
type MergeArrayToObject<T extends ReadonlyArray<{
    name: string | number;
    value: any;
}>> = UnionToIntersection<ConvertToPairNameValue<ArrayElement<T>>>;
type ConvertToSetName<T> = T extends {
    name: string;
} ? {
    [index in T['name']]: T['name'];
} : never;
type СreateHashName<T extends ReadonlyArray<{
    name: string | number;
    value: any;
}>> = UnionToIntersection<ConvertToSetName<ArrayElement<T>>>;
type Mutable<T> = {
    -readonly [K in keyof T]: T[K] extends string ? string : T[K] extends number ? number : T[K] extends number ? number : T[K] extends [string] ? string[] : T[K] extends infer Object ? Mutable<Object> : never;
};
type DeepMutableArray<T> = Array<DeepMutable<Mutable<T>>>;
export type DeepMutableObject<T> = {
    [P in keyof T]-?: DeepMutable<Mutable<T[P]>>;
};
type DeepMutable<T> = T extends (...args: any[]) => any ? T : T extends any[] ? DeepMutableArray<T[number]> : T extends object ? DeepMutableObject<T> : T;
export type UpCast<T> = {
    [K in keyof T]: T[K] extends string ? string : T[K];
};
export default class SuperEnum<List extends ReadonlyArray<{
    name: string | number;
    value: any;
}> = ReadonlyArray<{
    name: string | number;
    value: any;
}>> {
    private readonly list;
    readonly prop: MergeArrayToObject<List>;
    readonly name: СreateHashName<List>;
    constructor(list: List);
    createAsIs<Name extends keyof MergeArrayToObject<List>>(name: Name, value: MergeArrayToObject<List>[Name]): UnionToIntersection<ConvertToPairNameValue<ArrayElement<List>>>[Name];
    createByTemplate<Name extends keyof MergeArrayToObject<List>>(name: Name, value: DeepMutable<MergeArrayToObject<List>[Name]>): DeepMutable<UnionToIntersection<ConvertToPairNameValue<ArrayElement<List>>>[Name]>;
    createByGeneralizedTemplate<Name extends keyof MergeArrayToObject<List>>(name: Name, value: UpCast<DeepMutable<MergeArrayToObject<List>[Name]>>): UpCast<DeepMutable<UnionToIntersection<ConvertToPairNameValue<ArrayElement<List>>>[Name]>>;
    forEach(handler: (name: EnumNames<List>, value: EnumValues<List>) => void): void;
    get<K extends keyof MergeArrayToObject<List>>(name: K): UnionToIntersection<ConvertToPairNameValue<ArrayElement<List>>>[K];
    getKeys(): EnumNames<List>;
    getValues(): EnumValues<List>;
    [Symbol.iterator](): Generator<{
        name: EnumNames<List>;
        value: EnumValues<List>;
    }, void, unknown>;
}
export {};
