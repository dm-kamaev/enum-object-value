import EnumObject, { EnumNames, EnumValues, GetEnumValueByName } from '.';
// import EnumObject, { EnumNames, EnumValues, GetEnumValueByName } from 'enum-object-value';

const data = {
  ROOT: { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
  ADMIN: { value: 'admin', permission: ['create', 'remove', 'read'] },
  EMPLOYEE: { value: 'employee', permission: ['read'] },
} as const;

const userRoleEnum = new EnumObject(data);
type UserRoleEnumNames = EnumNames<typeof userRoleEnum>;
//   ^?
type UserRoleEnumValues = EnumValues<typeof userRoleEnum>;

// const superEnum = new SuperEnum([ 'admin', true, root: true, employee: true });

const ADMIN_NAME = userRoleEnum.name.ADMIN;
//     ^?
console.log(ADMIN_NAME);

const result = userRoleEnum.prop;
//    ^?
console.log(result);
const result2 = userRoleEnum.prop.ADMIN;
result2;
//    ^?
userRoleEnum.forEach((key, value) => {
  console.log(`${key} => ${value}`);
});
const keys = userRoleEnum.getNames();
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

// const admin3 = userRoleEnum2.createByTemplate('ADMIN', { value: 'admin', permission: ['create', 'remove', 'read'] });
// admin3.value;
// //      ^?
// admin3.permission;
//      ^?

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

function example_switch_case(role: UserRoleEnumNames, input: typeof userRoleEnum) {
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

const paymentTypeEnum = new EnumObject({
  CARD: (number: string, holderName: string, expirationDate: Date) => ({
    type: paymentTypeEnum.name.CARD,
    number,
    holderName,
    expirationDate,
  }),
  GIFT_CERTIFICATE: (number: string) => ({ type: paymentTypeEnum.name.GIFT_CERTIFICATE, number }),
  PAYPALL: (transactionId: string, transactionAuthCode?: string) => ({
    type: paymentTypeEnum.name.PAYPALL,
    transactionId,
    transactionAuthCode,
  }),
} as const);

type PaymentTypeEnumValues = ReturnType<EnumValues<typeof paymentTypeEnum>>;
type PaymentTypeEnumNames = EnumNames<typeof paymentTypeEnum>;

function showInfo(value: PaymentTypeEnumValues) {
  if (value.type === 'CARD') {
    console.log('Card number', value.number);
  } else if (value.type === 'GIFT_CERTIFICATE') {
    console.log('Gift number', value.number);
  } else if (value.type === 'PAYPALL') {
    console.log('Paypal transaction id', value.transactionId);
  }
}
{
  const card = paymentTypeEnum.prop.CARD('234234', 'Peter D', new Date());
  showInfo(card);
}

// function createByName<Name extends PaymentTypeEnumNames>(type: Name): GetEnumValueByName<typeof paymentTypeEnum, Name> {
//   if (type === paymentTypeEnum.name.CARD) {
//     return paymentTypeEnum.createAsIs(
//       type as PaymentTypeEnumNames,
//       (number: string, holderName: string, expirationDate: Date) => ({
//         type: paymentTypeEnum.name.CARD,
//         number,
//         holderName,
//         expirationDate,
//       }),
//     ) as GetEnumValueByName<typeof paymentTypeEnum, Name>;
//   } else if (type === paymentTypeEnum.name.GIFT_CERTIFICATE) {
//     return paymentTypeEnum.createAsIs(type as PaymentTypeEnumNames, (number: string) => ({
//       type: paymentTypeEnum.name.GIFT_CERTIFICATE,
//       number,
//     })) as GetEnumValueByName<typeof paymentTypeEnum, Name>;
//   } else if (type === paymentTypeEnum.name.PAYPALL) {
//     return paymentTypeEnum.createAsIs(
//       type as PaymentTypeEnumNames,
//       (transactionId: string, transactionAuthCode?: string) => ({
//         type: paymentTypeEnum.name.PAYPALL,
//         transactionId,
//         transactionAuthCode,
//       }),
//     ) as GetEnumValueByName<typeof paymentTypeEnum, Name>;
//   } else {
//     throw new Error('Error');
//   }
// }

function getValue<Name extends PaymentTypeEnumNames>(type: Name): GetEnumValueByName<typeof paymentTypeEnum, Name> {
  return paymentTypeEnum.prop[type];
}

{
  const createCard = getValue('CARD');
  const card = createCard('11313', 'Peter D', new Date());
  console.log(card);
}
