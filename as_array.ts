type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type EnumValues<Input extends readonly { value: any }[]> = ArrayElement<Input>['value'];
export type EnumNames<Input extends readonly { name: any }[]> = ArrayElement<Input>['name'];

// const userRole = [
//   { name: 'ADMIN', value: 'ADMIN' },
//   { name: 'ROOT', value: 'ROOT' },
//   { name: 'EMPLOYEE', value: 'EMPLOYEE' },
// ] as const;
// type Result2 = GetKeys<typeof userRole>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type RecordCast = Record<string | number, any>;

type ConvertToPairNameValue<T> = T extends { name: string; value: any } ? { [index in T['name']]: T['value'] } : never;
type MergeArrayToObject<T extends ReadonlyArray<{ name: string | number; value: any }>> = UnionToIntersection<
  ConvertToPairNameValue<ArrayElement<T>>
>;

type ConvertToSetName<T> = T extends { name: string } ? { [index in T['name']]: T['name'] } : never;
type СreateHashName<T extends ReadonlyArray<{ name: string | number; value: any }>> = UnionToIntersection<
  ConvertToSetName<ArrayElement<T>>
>;

type Mutable<T> = {
  -readonly [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends number
      ? number
      : T[K] extends number
        ? number
        : T[K] extends [string]
          ? string[]
          : T[K] extends infer Object
            ? // eslint-disable-next-line @typescript-eslint/ban-types
              Mutable<Object>
            : never;
};

// eslint-disable-next-line no-use-before-define
type DeepMutableArray<T> = Array<DeepMutable<Mutable<T>>>;
export type DeepMutableObject<T> = {
  // eslint-disable-next-line no-use-before-define
  [P in keyof T]-?: DeepMutable<Mutable<T[P]>>;
};

type DeepMutable<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
    ? DeepMutableArray<T[number]>
    : T extends object
      ? DeepMutableObject<T>
      : T;

export type UpCast<T> = { [K in keyof T]: T[K] extends string ? string : T[K] };

export default class SuperEnum<
  List extends ReadonlyArray<{ name: string | number; value: any }> = ReadonlyArray<{
    name: string | number;
    value: any;
  }>,
> {
  public readonly prop: MergeArrayToObject<List> = {} as MergeArrayToObject<List>;
  public readonly name: СreateHashName<List> = {} as СreateHashName<List>;

  constructor(private readonly list: List) {
    list.forEach(({ name, value }) => {
      this.name[name] = name;
      this.prop[name] = value;
    });
  }

  createAsIs<Name extends keyof MergeArrayToObject<List>>(name: Name, value: MergeArrayToObject<List>[Name]) {
    return new SuperEnum([{ name: name as string, value }]).get(name as string);
  }

  createByTemplate<Name extends keyof MergeArrayToObject<List>>(
    name: Name,
    value: DeepMutable<MergeArrayToObject<List>[Name]>,
  ) {
    return new SuperEnum([{ name: name as string, value }]).get(name as string);
  }

  createByGeneralizedTemplate<Name extends keyof MergeArrayToObject<List>>(
    name: Name,
    value: UpCast<DeepMutable<MergeArrayToObject<List>[Name]>>,
  ) {
    return new SuperEnum([{ name: name as string, value }]).get(name as string);
  }

  forEach(handler: (name: EnumNames<List>, value: EnumValues<List>) => void) {
    this.list.forEach((el) => {
      handler(el.name as EnumNames<List>, el.value);
    });
  }

  get<K extends keyof MergeArrayToObject<List>>(name: K) {
    if (!(name in (this.prop as RecordCast))) {
      throw new Error(`Not found key: "${name as string}"`);
    }

    return this.prop[name];
  }

  getKeys() {
    return Object.keys(this.prop as RecordCast) as unknown as EnumNames<List>;
  }

  getValues() {
    return Object.values(this.prop as RecordCast) as unknown as EnumValues<List>;
  }

  *[Symbol.iterator]() {
    const list = this.list;
    for (let i = 0, l = list.length; i < l; i++) {
      const el = list[i];
      yield { name: el.name as EnumNames<List>, value: el.value as EnumValues<List> };
    }
  }
}
