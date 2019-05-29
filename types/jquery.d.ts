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
declare namespace Jquery {
    function ajax(url: string): void;
    let name: string;
    namespace fn {
        function extend(object: any): void;
    }
}
