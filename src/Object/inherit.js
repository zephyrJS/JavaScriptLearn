
/**
 * 模拟 class，支持实例，静态属性、方法的继承
 *
 * @param {*} subType
 * @param {*} superType
 */
function inherit(subType, superType) {
    subType = Object.create(superType.prtotype, {
        constructor: {
            enumerable: false,
            configurable: true,
            writable: true,
            value: subType
        }
    })
    Object.setPrototypeOf(subType, superType)
}
