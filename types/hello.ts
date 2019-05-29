interface Person {
    readonly id: number;
    name: string;
    [propName: string]: any;
}

let p: Person = {
    id: 1,
    name: "young",
    s: 1
};

interface Speakable {
    speakable: boolean;
}

interface SpeakChinese extends Speakable {
    speakChinese(): void;
}

class Man implements SpeakChinese {
    speakable = false;
    speakChinese() {}
}

// 接口修饰函数

interface Discount {
    (price: number): number;
}
let cost: Discount = function(price: number) {
    return price;
};

// 可索引接口
interface MeArray {
    [key: number]: string;
}
let arr: MeArray = ["1"];
let obj: MeArray = {
    1: "1"
};

// 约束类和类的构造函数
interface ClassWithName {
    new (name: string): Animal;
}
class Animal {
    constructor(public name: string) {}
}
function createClass(C: ClassWithName, name: string) {
    return new C(name);
}
createClass(Animal, "12131");
