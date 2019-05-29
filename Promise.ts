interface PromiseHandle {
    (resolve: Function, reject: Function): void;
}
type PromiseStatus = "pending" | "resolved" | "rejected";

const syncExecute = (cb: Function) => {
    setTimeout(() => {
        cb();
    });
};

let staticProperty: string = "";
class MyPromise {
    private __status: PromiseStatus = "pending";
    private __value: any = undefined;
    private __reason: any = undefined;
    private fulfilledCallbackList: Function[] = [];
    private rejectedCallbackList: Function[] = [];
    constructor(execute: PromiseHandle) {
        try {
            execute(this.__resolve, this.__reject);
        } catch (error) {
            this.__reject(error);
        }
    }

    private __reject = (reason: any) => {
        if (this.__status !== "pending") {
            return;
        }
        this.__status = "rejected";
        this.__reason = reason;
        let cb;
        while ((cb = this.rejectedCallbackList.shift())) {
            syncExecute(cb.bind(this, this.__reason));
        }
    };

    private __resolve = (value: any) => {
        if (this.__status !== "pending") {
            return;
        }
        this.__status = "resolved";
        this.__value = value;
        let cb;
        while ((cb = this.fulfilledCallbackList.shift())) {
            syncExecute(cb.bind(this, this.__value));
        }
    };

    /**
     * then 返回Promise
     */
    public then(onfulfilled: any, onrejected?: any) {
        let promise2: any;
        if (this.__status === "pending") {
            promise2 = new MyPromise(() => {
                this.fulfilledCallbackList.push((value: any) => {
                    try {
                        onfulfilled(value);
                    } catch (error) {
                        onrejected(error);
                    }
                });
                this.rejectedCallbackList.push((value: any) => {
                    try {
                        onfulfilled(value);
                    } catch (error) {
                        onrejected(error);
                    }
                });
            });
        }
        if (this.__status === "resolved") {
            promise2 = new MyPromise((resolve, reject) => {
                syncExecute(() => {
                    try {
                        let x = onfulfilled(this.__value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }
        if (this.__status === "rejected") {
            promise2 = new MyPromise((resolve, reject) => {
                syncExecute(() => {
                    try {
                        let x = onrejected(this.__reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }
    }

    /**
     * catch
     */
    public catch(onrejected: any) {
        this.then(null, onrejected);
    }
    /**
     * resolve
     */
    static resolve(value: any) {
        return new MyPromise(resolve => resolve(value));
    }
    /**
     * reject
     */
    static reject(reason: any) {
        return new MyPromise((undefined, reject) => reject(reason));
    }
    /**
     * all
     */
    static all(values: any) {
        let count = 0;
        const resolveData: any[] = [];
        return new MyPromise((resolve, reject) => {
            try {
                values.forEach((item: any, index: number) => {
                    if (typeof item.then === "function") {
                        item.then((data: any) => {
                            count++;
                            resolveData[index] = data;
                            if (count === values.length) {
                                resolve(resolveData);
                            }
                        });
                    } else {
                        count++;
                        resolveData[index] = item;
                        if (count === values.length) {
                            resolve(resolveData);
                        }
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * race
     */
    static race(values: any) {
        return new MyPromise((resolve, reject) => {
            try {
                values.forEach((item: any) => {
                    if (typeof item.then === "function") {
                        item.then((data: any) => {
                            resolve(data);
                        });
                    } else {
                        resolve(item);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    static get staticProperty(): string {
        return staticProperty;
    }
    static set staticProperty(v: string) {
        staticProperty = v;
    }
}

function resolvePromise(
    promise2: MyPromise,
    x: any,
    resolve: Function,
    reject: Function
) {
    if (promise2 === x) {
        return reject(new TypeError("循环引用"));
    }
    let then,
        called = false;
    if (x != null && (typeof x === "object" || typeof x === "function")) {
        try {
            then = x.then;
            then.call(
                x,
                function(value: any) {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, value, resolve, reject);
                },
                function(reason: any) {
                    if (called) return;
                    called = true;
                    reject(reason);
                }
            );
        } catch (error) {
            if (called) return;
            called = true;
            reject(error);
        }
    } else {
        resolve(x);
    }
}

