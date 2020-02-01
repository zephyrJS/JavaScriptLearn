const assert = require('assert')

// version 1
function qSort(arr) {
    function _qSort(arr, l, r) {
        if (l >= r) return

        const p = partition(arr, l, r)
        _qSort(arr, l, p - 1)
        _qSort(arr, p + 1, r)
    }

    // 对 arr[l, r] 部分进行 partition 操作
    // 返回 p， 使得 arr[l...p-1] < arr[p], arr[p+1...r] > arr[p]
    function partition(arr, l, r) {
        let v = arr[l]
        let j = l
        for (let i = l + 1; i <= r; i++) {
            if (arr[i] < v) {
                [arr[j + 1], arr[i]] = [arr[i], arr[j + 1]]
                j++
            }
        }
        [arr[j], arr[l]] = [arr[l], arr[j]]
        return j
    }

    // 区间 [0, n]
    _qSort(arr, 0, arr.length - 1)
    return arr
}

// -------------------------
// Test

assert.deepStrictEqual(qSort([6, 5, 4, 3, 2, 1]), [1, 2, 3, 4, 5, 6])
console.log('All assertion passed')