// 类型保护 根据运算符推断类型
function double(val: number | string | boolean) {
    // val.toFixed(2); Error
    if (typeof val === "number") {
        // ok
        val.toFixed(2);
    } else if (typeof val === "string") {
        val.length;
    } else {
        val.valueOf();
    }
}

// instanceof
class Animal2 {
    name: string | undefined;
}
class Lion extends Animal2 {
    age: number | undefined;
}
function getName(obj: Animal) {
    if (obj instanceof Lion) {
        obj.age;
    }
}

// null保护
function protectNull(params: string | null = "") {
    params!.charAt(0);
}
function protectNull2(params: string | null) {
    // 忽略null判断
    // params?.charAt(0);
    params!.charAt(0);
}

class AAA {
    constructor(private name: string) {}
}

// 可辨识的联合运算符
interface Warning {
    class: "warning";
    text: "提示";
}
interface Danger {
    class: "danger";
    delete: "警告";
}

type Button = Warning | Danger;
function getButton(button: Button) {
    // 属性判断
    if (button.class === "danger") {
        button.delete;
    } else {
        button.text;
    }
    if ("delete" in button) {
        button.delete;
    }
}

// 自定义类型保护
interface Bird1 {
    leg: number;
}
interface Dog {
    leg: number;
}
function isBird(x: Bird1 | Dog): x is Bird1 {
    return (x as Bird1).leg === 2;
}
