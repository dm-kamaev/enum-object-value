export type EnumValues<Input extends Record<any, any>> = Input[keyof Input];
export type EnumNames<Input extends Record<any, any>> = keyof Input;

type СreateHashNames<Input extends Record<any, any>> = { [key in keyof Input]: key };

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

export default class EnumObject<InputObj extends Record<any, any> = Record<any, any>> {
  public readonly name: СreateHashNames<InputObj> = {} as СreateHashNames<InputObj>;

  constructor(
    public readonly prop: InputObj,
    private readonly options?: { order?: Array<EnumNames<InputObj>> },
  ) {
    (Object.keys(prop) as Array<EnumNames<InputObj>>).forEach((name) => {
      this.name[name] = name;
    });
  }

  createAsIs<Name extends EnumNames<InputObj> & (string | boolean | number)>(name: Name, value: InputObj[Name]) {
    return new EnumObject({ [name]: value }).get(name);
  }

  createByTemplate<Name extends EnumNames<InputObj> & (string | boolean | number)>(
    name: Name,
    value: DeepMutable<InputObj[Name]>,
  ) {
    return new EnumObject({ [name]: value }).get(name);
  }

  createByGeneralizedTemplate<Name extends EnumNames<InputObj> & (string | boolean | number)>(
    name: Name,
    value: UpCast<DeepMutable<InputObj>[Name]>,
  ) {
    return new EnumObject({ [name]: value }).get(name);
  }

  forEach(handler: (name: EnumNames<InputObj>, value: EnumValues<InputObj>) => void) {
    const keys = this.options?.order || this.getNames();
    keys.forEach((name) => {
      const value = this.prop[name];
      handler(name, value);
    });
  }

  get<Name extends EnumNames<InputObj> & (string | boolean | number)>(name: Name) {
    if (!(name in this.prop)) {
      throw new Error(`Not found key: "${name}"`);
    }

    return this.prop[name];
  }

  getNames() {
    return Object.keys(this.prop) as Array<EnumNames<InputObj>>;
  }

  getValues() {
    return Object.values(this.prop) as Array<EnumValues<InputObj>>;
  }

  *[Symbol.iterator](): Generator<[keyof InputObj, InputObj[keyof InputObj]], void, unknown> {
    const keys = this.options?.order || this.getNames();
    for (let i = 0, l = keys.length; i < l; i++) {
      const name = keys[i];
      const value = this.prop[name];
      yield [name, value];
    }
  }
}
