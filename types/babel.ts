// 接口兼容性

interface Animal {
    name: string;
    age: number;
}

type gender = "man" | "woman";
interface People {
    name: string;
    age: number;
    gender: gender;
}

let person: People = {
    name: "young",
    age: 18,
    gender: "man"
};

function getAnimal(animal: Animal): number {
    console.log(animal.age);
    return animal.age;
}
// 接口兼容性检测 includes is ok
getAnimal({ name: "", age: 1 });
getAnimal(person);

class Animal1 {
    name: string = "";
}

class Bird extends Animal1 {
    fly() {}
}
// ts结构决定类型 比较在于结构
let a: Animal1 = new Bird();
// let b: Animal1 = { name: "" };

// 函数的兼容性

type sumFn = (a: number, b: number) => number;

let sum1: sumFn;

sum1 = function(a, b): number {
    return a + b;
};

sum1 = function(b: number): number {
    return b;
};

// 协变

type logFn = (a: number | string) => void;
let log: logFn;
log = (a: number | string | boolean) => {};

interface Empty<T> {}

let x: Empty<string>;
let y: Empty<number>;
// x = y;
// console.log(x);
interface NotEmpty<T> {
    data: T;
}
let x1: NotEmpty<string>;
let y1: NotEmpty<number>;
// x1 = y1;
// Type 'NotEmpty<number>' is not assignable to type 'NotEmpty<string>'.
// Type 'number' is not assignable to type 'string'
// console.log(x1);

// 枚举的兼容性
enum Colors {
    yellow,
    red
}
let num: number = Colors.red;
console.log(Colors.yellow, Colors[1]);
