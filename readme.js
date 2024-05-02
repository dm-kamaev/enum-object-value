"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
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
};
const userRoleEnum2 = new _1.default(list);
const userRoleEnum = new _1.default({
    ROOT: { value: 'root', permission: ['create:admin', 'create', 'remove', 'read'] },
    ADMIN: { value: 'admin', permission: ['create', 'remove', 'read'] },
    EMPLOYEE: { value: 'employee', permission: ['read'] },
});
// const superEnum = new SuperEnum([ 'admin', true, root: true, employee: true });
const ADMIN_NAME = userRoleEnum2.name.ADMIN;
//     ^?
console.log(ADMIN_NAME);
const result = userRoleEnum2.prop;
//    ^?
console.log(result);
const result2 = userRoleEnum2.prop.ADMIN;
result2;
//    ^?
userRoleEnum2.forEach((key, value) => {
    console.log(`${key} => ${value}`);
});
const keys = userRoleEnum2.getNames();
keys;
// ^?
const values = userRoleEnum2.getValues();
values;
//  ^?
const str = 'ADMIN';
const result3 = userRoleEnum2.prop[str];
result3;
// ^?
const result4 = userRoleEnum2.get('ADMIN');
result4;
//   ^?
const admin = userRoleEnum2.createAsIs('ADMIN', { value: 'admin', permission: ['create', 'remove', 'read'] });
admin.value;
//      ^?
admin.permission;
//      ^?
const admin2 = userRoleEnum2.createByGeneralizedTemplate('ADMIN', {
    value: 'admin1',
    permission: ['create', 'remove', 'read'],
});
admin2.value;
//      ^?
admin2.permission;
//        ^?
for (const el of userRoleEnum2) {
    console.log('Via iterator ', el);
}
for (const el of userRoleEnum2) {
    console.log('Via iterator 2 ', el);
}
const teste = userRoleEnum2.name.ADMIN;
teste;
//  ^?
function example_switch_case(role, input) {
    switch (role) {
        case input.name.ADMIN:
            return userRoleEnum2.createAsIs(role, { value: 'admin', permission: ['create', 'remove', 'read'] });
        case input.name.EMPLOYEE:
            return userRoleEnum2.createAsIs(role, { value: 'employee', permission: ['read'] });
        default:
            throw new Error('Stop');
    }
}
const result234234 = example_switch_case('ADMIN', userRoleEnum2);
result234234;
//   ^?
function example_read_from_db() {
    const rows = [
        { id: 1, role: 'admin', permission: ['create', 'remove', 'read'] },
    ];
    return rows.map((el) => {
        const role = el.role.toUpperCase();
        const data = {
            value: el.role.toLowerCase(),
            permission: el.permission,
        };
        return {
            ...el,
            //  as unknown as UserRoleEnumValues
            role: userRoleEnum2.createAsIs(role, data),
        };
    });
}
const result234234234324 = example_read_from_db();
const output = result234234234324[0].role.permission;
output;
// ^?
const paymentType = new _1.default({
    CARD: (number, holderName, expirationDate) => ({
        type: paymentType.name.CARD,
        number,
        holderName,
        expirationDate,
    }),
    GIFT_CERTIFICATE: (number) => ({ type: paymentType.name.GIFT_CERTIFICATE, number }),
    PAYPALL: (transactionId, transactionAuthCode) => ({
        type: paymentType.name.PAYPALL,
        transactionId,
        transactionAuthCode,
    }),
});
const card = paymentType.prop.CARD('234234', 'sdfsfsdf', new Date());
console.log(card);
if (card.type === 'CARD') {
    card.number;
}
