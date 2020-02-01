const assert = require('assert')

// 与相邻数据两两比较，将最大值放到末尾
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let flag = true
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // 两两比较，较大值冒泡
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                flag = false
            }
        }
        if (flag) { // 如果已经排好序，直接跳出循环
            break
        }
    }
    return arr
}

// 查找待排序数组区间，将最小值放到有序区间中
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr
}

// 从待排序区间中取出一个数，插入到已排序区间中适合的位置
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
            [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
        }
    }
    return arr
}

// 归并排序
// 分：从中心点分割数组，知道子数组长度为 1
// 归并：创建临时的数据 temp，比较两个数组第一个元素，将较小的值放到 temp 中，最后在较长数组的剩余部分加到 temp 中
function mergeSort(arr) {
    _mergeSort(arr, 0, arr.length - 1)
    return arr
}

// 区间为 [l, r]
function _mergeSort(arr, l, r) {
    if (l >= r) return
    const mid = Math.floor((l + r) / 2)
    _mergeSort(arr, l, mid)
    _mergeSort(arr, mid + 1, r)
    merge(arr, l, r)
}

// 合并有序数组
function merge(arr, l, r) {
    const mid = Math.floor((l + r) / 2)
    const temp = []
    let i = l
    let j = mid + 1
    let k = 0
    while (i <= mid && j <= r) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++]
        } else {
            temp[k++] = arr[j++]
        }
    }

    while (i <= mid) {
        temp[k++] = arr[i++]
    }

    while (j <= r) {
        temp[k++] = arr[j++]
    }

    k = 0
    for (let i = l; i <= r; i++) {
        arr[i] = temp[k++]
    }
}


// -------------------
// Test

assert.deepStrictEqual(bubbleSort([3, 4, 5, 2, 1, 6]), [1, 2, 3, 4, 5, 6])
assert.deepStrictEqual(selectionSort([3, 4, 5, 2, 1, 6]), [1, 2, 3, 4, 5, 6])
assert.deepStrictEqual(insertionSort([3, 4, 5, 2, 1, 6]), [1, 2, 3, 4, 5, 6])
assert.deepStrictEqual(mergeSort([3, 4, 5, 2, 1, 6]), [1, 2, 3, 4, 5, 6])
console.log('All assertion passed')