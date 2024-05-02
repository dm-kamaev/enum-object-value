# Enum Object

[![Actions Status](https://github.com/dm-kamaev/enum_object/workflows/Build/badge.svg)](https://github.com/dm-kamaev/enum_object/actions) ![Coverage](https://github.com/dm-kamaev/enum_object/blob/master/coverage/badge-statements.svg)

The library for create enum which support object as values. You can simulate enum like Swift associated values or Rust enum with her help.
It has supports TypeScript </>



## Install
```sh
npm i enum_object -S
```

## About
Definition of enum in TypeScript can't using object as value.
```ts
// ❌ Error
enum UserRole = {
  root = { value: 'root', permission: ['create:admin'] }
}
```

Library `enum_object` offers a solution to the problem. It make work with enums by analogy associated values in Swift or Rust enum.

### Definition
```ts
import EnumObject from 'enum_object';

const userRoleEnum = new EnumObject({
  ROOT: { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
  ADMIN: { value: 'admin', permission: ['create', 'remove', 'read'] },
  EMPLOYEE: { value: 'employee', permission: ['read'] },
} as const);
```

### Access to properties and names of enum:
```ts
const admin = userRoleEnum.prop.ADMIN;
// {
//    readonly value: "admin";
//    readonly permission: readonly ["create", "remove", "read"];
// }
const ADMIN = userRoleEnum.name.ADMIN;
// ADMIN
```

### Iteration
```ts
for (const [name, { value, permission }] of userRoleEnum) {
  console.log(`${name} => { value: ${value}, permission: ${permission} } }`);
}

// OR
userRoleEnum.forEach((name, { value, permission }) => {
  console.log(`${name} => { value: ${value}, permission: ${permission} } }`);
});
```

If you want change  order of iteration by enum values, you can pass order as optional field of second argument `EnumObject`:
```ts
 const userRoleEnum = new EnumObject(
    {
      ROOT: { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
      ADMIN: { value: 'admin', permission: ['create', 'remove', 'read'] },
      EMPLOYEE: { value: 'employee', permission: ['read'] },
    } as const,
    { order: ['EMPLOYEE', 'ADMIN', 'ROOT'] },
  );
```


### Get names and properties
```ts
userRoleEnum.getNames();
// ("ROOT" | "ADMIN" | "EMPLOYEE")[]

userRoleEnum.getValues();
// {
//     readonly ROOT: {
//         readonly value: "root";
//         readonly permission: readonly ["create:admin", "create", "remove", "read"];
//     };
//     readonly ADMIN: {
//         readonly value: "admin";
//         readonly permission: readonly ["create", "remove", "read"];
//     };
//     readonly EMPLOYEE: {
//         readonly value: "employee";
//         readonly permission: readonly ["read"];
//     };
// }
```
### Typings

### Create by template

### Examples


