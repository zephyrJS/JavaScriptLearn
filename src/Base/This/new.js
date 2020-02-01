function create() {
    // 1 获取构造函数，同时删除 arguments 中的第一个参数
    // 2 创建实例对象并链接构造函数的原型对象
    // 3 绑定 this 实现继承，obj 能访问构造函数的属性、方法
    // 4 优先返回构造函数返回的方法
    const Con = Array.prototype.shift.call(arguments)
    const obj = Object.create(Con.prototype)
    const res = Con.apply(obj, arguments)
    return res instanceof Object ? res : obj
}