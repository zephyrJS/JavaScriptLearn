function create() {
    // 1 实例化一个对象
    const obj = new Object()
    // 2 获取构造函数
    const Con = Array.prototype.shift.call(arguments)
    // 3 将构造函数的原型对象赋值给实例对象
    obj.__proto__ = Con.prototype
    // 4 将构造函数的 this 指向实例对象
    Con.apply(obj, arguments)
    return obj
}