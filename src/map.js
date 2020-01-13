/**
 * 适用遍历的方式来实现 map 函数
 *
 * @param {*} fn
 * @param {*} context
 * @returns
 */
function selfMap(fn, context) {
    const arr = Array.prototype.slice.call(this)
    const len = arr.length >>> 0
    const resArr = new Array(len)
    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue
        resArr[i] = fn.call(context, arr[i], i, this)
    }
    return resArr
}


/**
 * 适用 reduce 实现 map
 *
 * @param {*} fn
 * @param {*} context
 * @returns
 */
function reduceMap(fn, context) {
    const arr = Array.prototype.slice.call(this)
    return arr.reduce((pre, curr, index) => {
        return [...pre, fn.call(context, curr, index, this)]
    }, [])
}

function selfMap2(fn, thisArg) {
    let T, A, k
    // this 不为 null
    if (this === null) {
        throw new TypeError('this is null or not defined')
    }

    const O = Object(this)
    // 保证 length 为非负整数
    // [this.length >>> 0表示什么](https://www.zhihu.com/question/20693429)
    const len = O.length >>> 0

    // 需要 fn 回调函数
    if (typeof fn !== 'function') {
        throw new TypeError(`${fn} is not a function`)
    }

    if (arguments.length > 1) {
        T = arguments[1]
    }

    A = new Array(len)

    k = 0

    while (k < len) {
        let kValue, mappedValue

        if (k in O) {
            kValue = O[k]
            mappedValue = fn.call(T, kValue, k, O)
            A[k] = mappedValue
        }
        k++
    }
    
    return A
}