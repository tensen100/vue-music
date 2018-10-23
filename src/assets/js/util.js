/**
 * 获取随机整数
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 打乱数组顺序
 * @param arr
 * @returns {*}
 */
export function shuffle(arr) {
    let _arr = arr.slice();
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i);
        let t = _arr[i];
        _arr[i] = _arr[j];
        _arr[j] = t
    }
    return _arr
}

/**
 * 防抖函数
 * @param func
 * @param delay
 * @returns {Function}
 */
export function debounce(func, delay) {
    let timer;

    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}