import SuperEnum, { EnumNames, EnumValues } from './as_array';

// type UserRoleEnum = readonly [
//   {
//     readonly name: 'ROOT';
//     readonly value: {
//       readonly value: 'root';
//       readonly permission: readonly ['create:admin', 'create', 'remove', 'read'];
//     };
//   },
//   {
//     readonly name: 'ADMIN';
//     readonly value: {
//       readonly value: 'admin';
//       readonly permission: readonly ['create', 'remove', 'read'];
//     };
//   },
//   {
//     readonly name: 'EMPLOYEE';
//     readonly value: {
//       readonly value: 'employee';
//       readonly permission: readonly ['read'];
//     };
//   },
// ];

// const list: UserRoleEnum = [
const list = [
  { name: 'ROOT', value: { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] } },
  { name: 'ADMIN', value: { value: 'admin', permission: ['create', 'remove', 'read'] } },
  { name: 'EMPLOYEE', value: { value: 'employee', permission: ['read'] } },
] as const;

type UserRoleEnum = typeof list;

const userRoleEnum = new SuperEnum<UserRoleEnum>(list);
type UserRoleEnumValues = EnumValues<UserRoleEnum>;
type UserRoleEnumNames = EnumNames<UserRoleEnum>;
// const superEnum = new SuperEnum([ 'admin', true, root: true, employee: true });

const result = userRoleEnum.obj;
//    ^?
console.log(result);
const result2 = userRoleEnum.obj.ADMIN;
result2;
//    ^?
userRoleEnum.forEach((key, value) => {
  console.log(`${key} => ${value}`);
});
const keys = userRoleEnum.getKeys();
keys;
// ^?
const values = userRoleEnum.getValues();
values;
//  ^?
const str: string = 'ADMIN';
const result3 = userRoleEnum.obj[str as UserRoleEnumNames];
result3;
// ^?
const result4 = userRoleEnum.get('ADMIN');
result4;
//   ^?

const admin = userRoleEnum.createAsIs('ADMIN', { value: 'admin', permission: ['create', 'remove', 'read'] });
admin.value;
//      ^?
admin.permission;
//      ^?
const admin2 = userRoleEnum.createByGeneralizedTemplate('ADMIN', {
  value: 'admin1',
  permission: ['create', 'remove', 'read'],
});
admin2.value;
//      ^?
admin2.permission;
//        ^?

for (const el of userRoleEnum) {
  console.log('Via iterator ', el);
}

for (const el of userRoleEnum) {
  console.log('Via iterator 2 ', el);
}
const teste = userRoleEnum.name.ADMIN;
teste;
//  ^?

function example_switch_case(role: UserRoleEnumNames, input: SuperEnum<UserRoleEnum>) {
  switch (role) {
    case input.name.ADMIN:
      return userRoleEnum.createAsIs(role, { value: 'admin', permission: ['create', 'remove', 'read'] });
    case input.name.EMPLOYEE:
      return userRoleEnum.createAsIs(role, { value: 'employee', permission: ['read'] });
    default:
      throw new Error('Stop');
  }
}
const result234234 = example_switch_case('ADMIN', userRoleEnum);
result234234;
//   ^?

function example_read_from_db() {
  const rows = [
    { id: 1, role: 'admin' satisfies UserRoleEnumValues['value'], permission: ['create', 'remove', 'read'] },
  ];
  return rows.map((el) => {
    const role = el.role.toUpperCase() as UserRoleEnumNames;
    const data = {
      value: el.role.toLowerCase(),
      permission: el.permission,
    };
    return {
      ...el,
      //  as unknown as UserRoleEnumValues
      role: userRoleEnum.createAsIs(role, data as unknown as UserRoleEnumValues),
    };
  });
}
const result234234234324 = example_read_from_db();
const output = result234234234324[0].role.permission;
output;
// ^?
