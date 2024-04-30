import EnumObject, { EnumNames, EnumValues } from '.';

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
const list = {
  ROOT: { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
  ADMIN: { value: 'admin', permission: ['create', 'remove', 'read'] },
  EMPLOYEE: { value: 'employee', permission: ['read'] },
} as const;

type UserRoleEnum = typeof list;

const userRoleEnum = new EnumObject<UserRoleEnum>(list);
type UserRoleEnumValues = EnumValues<UserRoleEnum>;
type UserRoleEnumNames = EnumNames<UserRoleEnum>;
// const superEnum = new SuperEnum([ 'admin', true, root: true, employee: true });

const result = userRoleEnum.prop;
//    ^?
console.log(result);
const result2 = userRoleEnum.prop.ADMIN;
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
const result3 = userRoleEnum.prop[str as UserRoleEnumNames];
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

function example_switch_case(role: UserRoleEnumNames, input: EnumObject<UserRoleEnum>) {
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

const paymentType = new EnumObject({
  CARD: (number: string, holderName: string, expirationDate: Date) => ({
    type: paymentType.name.CARD,
    number,
    holderName,
    expirationDate,
  }),
  GIFT_CERTIFICATE: (number: string) => ({ type: paymentType.name.GIFT_CERTIFICATE, number }),
  PAYPALL: (transactionId: string, transactionAuthCode?: string) => ({
    type: paymentType.name.PAYPALL,
    transactionId,
    transactionAuthCode,
  }),
} as const);

const card = paymentType.prop.CARD('234234', 'sdfsfsdf', new Date());
console.log(card);
if (card.type === 'CARD') {
  card.number;
}
