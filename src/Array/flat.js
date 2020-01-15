// 遍历的方式
function selfFlat(depth = 1) {
    const arr = Array.prototype.slice.call(this)
    if(depth === 0) return arr
    return arr.reduce((pre, curr) => {
        if(Array.isArray(curr)) {
            return [...pre, ...selfFlat.call(curr, depth - 1)]
        }else {
            return [...pre, curr]
        }
    }, [])
}

// 堆栈的方式
function stackFlat() {
    const arr = Array.prototype.slice.call(this)
    const stack = [...arr]
    const res = []
    while(stack.length) {
        let top = stack.pop()
        if(Array.isArray(top)) {
            stack.push(...top)
        }else {
            res.push(top)
        }
    }
    return res.reverse()
}