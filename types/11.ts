// 类型声明   index.d.ts
// declare const $: (
//     selector: string
// ) => {
//     click(): void;
//     width(length?: number): void;
// };

// declare let lodash: () => {
//     map(): void;
// };

// $("#root");

// 命名空间
// declare namespace Jquery {
//     function ajax(url: string): void;
//     let name: string;
//     namespace fn {
//         function extend(object: any): void;
//     }
// }

declare global {
    interface String {
        ddd(): string;
    }
}

String.prototype.ddd = function() {
    return this + "";
};

interface Animal {
    name: string;
    age: number;
}

let a: Animal = { name: "", age: 1 };

// 使用命名空间扩展类
class Form {
    username: Form.Item = "";
    password: Form.Item = "";
}

namespace Form {
    export class Item {}
}

function gretting(str: string): string {
    return gretting.words + str;
}
namespace gretting {
    export const words = "kkk";
}

export {};
