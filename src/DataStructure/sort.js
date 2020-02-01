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

// -------------------
// Test

assert.deepEqual(bubbleSort([3, 4, 5, 2, 1, 6]), [1, 2, 3, 4, 5, 6])
assert.deepEqual(selectionSort([3, 4, 5, 2, 1, 6]), [1, 2, 3, 4, 5, 6])
assert.deepEqual(insertionSort([3, 4, 5, 2, 1, 6]), [1, 2, 3, 4, 5, 6])
console.log('All assertion passed')