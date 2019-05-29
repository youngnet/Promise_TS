let parentData = [
    { id: 1, pid: 0, name: "xxx" },
    { id: 2, pid: 0, name: "ccc" }
];

let childData = [
    { id: 3, pid: 1, name: "zzz" },
    { id: 4, pid: 3, name: "vvv" }
];

let allData = [...parentData, ...childData];

let data = allData.reduce((prev, current) => {
    if (current.pid) {
        let parent = allData.find(item => item.id === current.pid);
        if (parent) {
            parent.children
                ? parent.children.push(current)
                : (parent.children = [current]);
        }
    } else {
        prev.push(current);
    }
    return prev;
}, []);
console.log(data);

new Promise((resolve, reject) => {
    reject(1);
})
    .then(undefined, data => {
        return Promise.reject(222);
    })
    .then(
        data => {
            console.log(data, "11111");
        },
        data => {
            console.log(data, "2222");
        }
    )
    .catch(() => {
        console.log(123124);
    });
