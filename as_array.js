"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuperEnum {
    list;
    prop = {};
    name = {};
    constructor(list) {
        this.list = list;
        list.forEach(({ name, value }) => {
            this.name[name] = name;
            this.prop[name] = value;
        });
    }
    createAsIs(name, value) {
        return new SuperEnum([{ name: name, value }]).get(name);
    }
    createByTemplate(name, value) {
        return new SuperEnum([{ name: name, value }]).get(name);
    }
    createByGeneralizedTemplate(name, value) {
        return new SuperEnum([{ name: name, value }]).get(name);
    }
    forEach(handler) {
        this.list.forEach((el) => {
            handler(el.name, el.value);
        });
    }
    get(name) {
        if (!(name in this.prop)) {
            throw new Error(`Not found key: "${name}"`);
        }
        return this.prop[name];
    }
    getKeys() {
        return Object.keys(this.prop);
    }
    getValues() {
        return Object.values(this.prop);
    }
    *[Symbol.iterator]() {
        const list = this.list;
        for (let i = 0, l = list.length; i < l; i++) {
            const el = list[i];
            yield { name: el.name, value: el.value };
        }
    }
}
exports.default = SuperEnum;
