// 泛型

function createArray(length: number, value: any): Array<any> {
    let result: any[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

function GenericsArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

GenericsArray<string>(1, "111");

function sum(...arg: Array<number>): number {
    return 1;
}

// let root = document.getElementById("root");

// let children: HTMLCollection = root.children;
// let nodeList: NodeList = root.childNodes;
// HTMLInputElement HTMLElement HashChangeEvent
// Window
// let input: HTMLInputElement = null;

class GenericsClass<T> {
    private list: T[] = [];
    add(val: T): void {
        this.list.push(val);
    }
}

// 泛型接口
interface Calculate {
    <T>(a: T, b: T): T;
}

let cal: Calculate = function<T>(a: T, b: T): T {
    // let res :T = a+b;
    return a;
};
cal<number>(1, 2);

// 交换顺序 多个泛型 默认类型
function swap<T = number, P = string>(tuple: [T, P]): [P, T] {
    return [tuple[1], tuple[0]];
}

swap([1, "22"]);

// 泛型约束
interface LengthObj {
    length: number;
}
function len<T extends LengthObj>(a: T, b: T): number {
    return a.length + b.length;
}
len<String>(new String("123"), "xx");

function total<T extends number>(a: T, b: T): number {
    return a + b;
}

// 泛型接口
interface Cart<T> {
    list: T[];
}
let cart: Cart<number> = {
    list: [1]
};

// 泛型类型别名
type t1 = "a" | "b";
let tt: t1 = "a";
interface User {
    name: string;
}
type MyUser = User;
