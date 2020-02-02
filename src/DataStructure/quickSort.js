const assert = require('assert')

// function swap(arr, i, j) {
//     let tmp = arr[i]
//     arr[i] = arr[j]
//     arr[j] = tmp
// }

function qSort(arr) {
    function _qSort(arr, l, r) {
        if (l >= r) return

        const p = partition2(arr, l, r)
        _qSort(arr, l, p - 1)
        _qSort(arr, p + 1, r)
    }

    // 解决大量重复问题
    function partition2(arr, l, r) {
        // 随机取 p，防止时间复杂度退化成 O(n^2)
        let randIndex = (Math.floor(Math.random() * (r - l + 1)) + l);
        [arr[l], arr[randIndex]] = [arr[randIndex], arr[l]]

        let v = arr[l]
        // [l+1...i), (j, r]
        let i = l + 1, j = r
        while (true) {
            while (i <= r && arr[i] < v) i++
            while (j >= l + 1 && arr[j] > v) j--
            if (i > j) break
            [arr[j], arr[i]] = [arr[i], arr[j]]
            j--
            i++
        }
        ;[arr[l], arr[j]] = [arr[j], arr[l]]

        return j
    }

    // 对 arr[l, r] 部分进行 partition 操作
    // 返回 p， 使得 arr[l...p-1] < arr[p], arr[p+1...r] > arr[p]
    function partition(arr, l, r) {
        // 随机取 p，防止时间复杂度退化成 O(n^2)
        let randIndex = Math.floor(Math.random() * (r - l + 1)) + l;
        [arr[l], arr[randIndex]] = [arr[randIndex], arr[l]]

        let v = arr[l]
        let j = l
        for (let i = l + 1; i <= r; i++) {
            if (arr[i] < v) {
                [arr[j + 1], arr[i]] = [arr[i], arr[j + 1]]
                j++
            }
        }
        ;[arr[j], arr[l]] = [arr[l], arr[j]]
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