import EnumObject from '../index';

describe('[EnumObject]', () => {
  const userRoleEnum = new EnumObject({
    ROOT: { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
    ADMIN: { value: 'admin', permission: ['create', 'remove', 'read'] },
    EMPLOYEE: { value: 'employee', permission: ['read'] },
  } as const);

  it('should create an instance of SuperEnum', () => {
    expect(userRoleEnum).toBeInstanceOf(EnumObject);
    expect(userRoleEnum.name).toBeDefined();
    expect(userRoleEnum.prop).toBeDefined();
    expect(userRoleEnum.forEach).toBeDefined();
    expect(userRoleEnum.get).toBeDefined();
    expect(userRoleEnum.get).toBeDefined();
    expect(userRoleEnum.getValues).toBeDefined();
  });

  it('should get the correct value by name', () => {
    const result = userRoleEnum.get('ROOT');
    expect(result).toEqual({
      value: 'root',
      permission: ['create:admin', 'create', 'remove', 'read'],
    });
  });

  it('forEach', () => {
    const keys: string[] = [];
    const values: Array<{ value: string; permission: readonly string[] }> = [];
    userRoleEnum.forEach((k, v) => {
      keys.push(k);
      values.push(v);
    });

    expect(keys).toEqual(['ROOT', 'ADMIN', 'EMPLOYEE']);
    expect(values).toEqual([
      { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
      { value: 'admin', permission: ['create', 'remove', 'read'] },
      { value: 'employee', permission: ['read'] },
    ]);
  });

  it('for of', () => {
    const keys: string[] = [];
    const values: Array<{ value: string; permission: readonly string[] }> = [];

    for (const [name, { value, permission }] of userRoleEnum) {
      keys.push(name);
      values.push({ value, permission });
    }

    expect(keys).toEqual(['ROOT', 'ADMIN', 'EMPLOYEE']);
    expect(values).toEqual([
      { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
      { value: 'admin', permission: ['create', 'remove', 'read'] },
      { value: 'employee', permission: ['read'] },
    ]);
  });

  it('getNames', () => {
    const keys = userRoleEnum.getNames();
    expect(keys).toEqual(['ROOT', 'ADMIN', 'EMPLOYEE']);
  });

  it('getValues', () => {
    const values = userRoleEnum.getValues();
    expect(values).toEqual([
      { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
      { value: 'admin', permission: ['create', 'remove', 'read'] },
      { value: 'employee', permission: ['read'] },
    ]);
  });

  it('get not exist key', () => {
    expect(() => userRoleEnum.get('address' as any)).toThrow(Error);
  });

  it('createAsIs', () => {
    const admin = userRoleEnum.createAsIs('ADMIN', { value: 'admin', permission: ['create', 'remove', 'read'] });

    expect(admin.value).toBe('admin');
    expect(admin.permission).toEqual(['create', 'remove', 'read']);
  });

  // it('createByTemplate', () => {
  //   const admin = userRoleEnum.createByTemplate('ADMIN', {
  //     value: 'admin',
  //     permission: ['create', 'remove', 'read', 'someth'],
  //   });
  //   expect(admin.value).toBe('admin');
  //   expect(admin.permission).toEqual(['create', 'remove', 'read']);
  // });

  it('createByGeneralizedTemplate', () => {
    const admin = userRoleEnum.createByGeneralizedTemplate('ADMIN', {
      value: 'admin1',
      permission: ['something', 'create', 'remove', 'read'],
    });
    expect(admin.value).toBe('admin1');
    expect(admin.permission).toEqual(['something', 'create', 'remove', 'read']);
  });
});

describe('[EnumObject: change sort]', () => {
  const userRoleEnum = new EnumObject(
    {
      ROOT: { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
      ADMIN: { value: 'admin', permission: ['create', 'remove', 'read'] },
      EMPLOYEE: { value: 'employee', permission: ['read'] },
    } as const,
    { order: ['EMPLOYEE', 'ADMIN', 'ROOT'] },
  );

  it('forEach', () => {
    const keys: string[] = [];
    const values: Array<{ value: string; permission: readonly string[] }> = [];
    userRoleEnum.forEach((k, v) => {
      keys.push(k);
      values.push(v);
    });

    expect(keys).toEqual(['EMPLOYEE', 'ADMIN', 'ROOT']);
    expect(values).toEqual([
      { value: 'employee', permission: ['read'] },
      { value: 'admin', permission: ['create', 'remove', 'read'] },
      { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
    ]);
  });

  it('for of', () => {
    const keys: string[] = [];
    const values: Array<{ value: string; permission: readonly string[] }> = [];

    for (const [name, { value, permission }] of userRoleEnum) {
      keys.push(name);
      values.push({ value, permission });
    }

    expect(keys).toEqual(['EMPLOYEE', 'ADMIN', 'ROOT']);
    expect(values).toEqual([
      { value: 'employee', permission: ['read'] },
      { value: 'admin', permission: ['create', 'remove', 'read'] },
      { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
    ]);
  });
});
