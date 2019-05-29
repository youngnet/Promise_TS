interface Tiger {
    name: string;
    fly(): void;
}
interface Cat {
    name: string;
    eat(): void;
}
type catType = Tiger & Cat;
let catTiger: catType = {
    name: "young",
    fly() {},
    eat() {}
};

// 类型复用
let pp3 = { name: "", age: 1 };
type ppp = typeof pp3;
let p1: ppp = { name: "", age: 2 };

// 访问索引操作符 子类型
interface Peo {
    name: string;
    interest: { name: string; score: number }[];
}
let j: Peo["name"] = "young";
let interest: Peo["interest"][0]["score"] = 111;

// keyof 索引类型操作符

interface Key {
    name: string;
    age: number;
    gender: "man" | "woman";
}
type attrKey = keyof Key;
function attr(obj: Key, key: attrKey): any {
    return obj[key];
}

// 映射类型
interface PrisonIn {
    name: string;
    age: 10;
    gender: "man" | "woman";
}
// 局部映射 Partial
type PartPerson = { readonly [key in keyof PrisonIn]?: PrisonIn[key] };
type PartialPrisonIn = Partial<PrisonIn>;
let part: PartialPrisonIn = {
    name: ""
};

// 所有项都为必填项
/**
 * type Require<T> = { [P in keyof T]-?: T[P] };
 */
interface Person5 {
    name: string;
    age: number;
    gender?: "male" | "female";
}
let p4: Required<Person5> = {
    name: "zhufeng",
    age: 10,
    gender: "male"
};

//type Readonly<T> = { readonly [P in keyof T]: T[P] };
let pp2: Readonly<Person5> = {
    name: "zhufeng",
    age: 10,
    gender: "male"
};
// pp2.age = 1

interface Animal1 {
    name: string;
    age: number;
    gender: string;
}
/**
 * From T pick a set of properties K
 * type Pick<T, K extends keyof T> = { [P in K]: T[P] };
 */
// 摘取 Animal 中的 name 属性
type AnimalSub = Pick<Animal1, "name">; //{ name: string; }
let a1: AnimalSub = {
    name: "zhufeng"
    // age: 10
};

// 判断继承
interface Fish {
    a: string;
}
interface Water {
    namea: string;
}
interface Bird {
    b: string;
}
interface Sky {
    nameb: string;
}
//三元运算符
type Condition<T> = T extends Fish ? Water : Sky;
let condition: Condition<Fish> = { namea: "水" };

// 条件类型分发
let cond1: Condition<Fish | Bird> = {
    namea: ""
};

// ReturnType
function getUserInfo(name: string): { name: string } {
    return { name };
}
type t = ReturnType<typeof getUserInfo>;
let ttt: t = {
    name: ""
};

// instanceType
class Person3 {
    constructor(public name: string) {}
    public getName() {
        this.name;
    }
}

// 获取实例类型 构造函数类型
type p = InstanceType<typeof Person3>;
let ppp2 = new Person3("");
