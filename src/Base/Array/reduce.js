function selfReduce(func, initialValue) {
    const arr = Array.prototype.slice.call(this)
    let value, startIndex = 0
    if (!initialValue) {
        for (let i = 0; i < arr.length; i++) {
            if (!arr.hasOwnProperty(i)) continue
            value = arr[i]
            startIndex = ++i
            break
        }
    } else {
        value = initialValue
    }

    for (let i = startIndex; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue
        value = func.call(null, value, arr[i], i, this)
    }

    return value
}