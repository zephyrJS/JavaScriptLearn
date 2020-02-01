/**
 * 使用遍历实现 filter 方法
 *
 * @param {*} func
 * @param {*} context
 * @returns
 */
function selfFilter(func, context) {
    if (typeof func !== 'function') {
        throw new TypeError(`${func} is not a function!`)
    }
    const arr = Array.prototype.slice.call(this)
    const resArr = []
    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue
        func.call(context, arr[i], i, this) && resArr.push(arr[i])
    }
    return resArr
}


/**
 * 适用 reduce 实现 filter 方法
 *
 * @param {*} func
 * @param {*} context
 * @returns
 */
function reduceFilter(func, context) {
    if (typeof func !== 'function') {
        throw new TypeError(`${func} is not a function!`)
    }
    const arr = Array.prototype.slice.call(this)
    return arr.reduce((pre, curr, index) => {
        let res = func.call(context, curr, index, this)
        return res ? [...pre, curr] : [...pre]
    }, [])
}
