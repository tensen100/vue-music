/**
 * 添加class
 * @param el
 * @param className
 */
export function addClass(el, className) {
    if ( !hasClass(el, className)) {
        const newClass = el.className.split(' ');
        newClass.push(className);
        el.className = newClass.join(' ')
    }

}

/**
 * 是否有class
 * @param el
 * @param className
 * @returns {boolean}
 */
export function hasClass(el, className) {
    const reg = new RegExp('(^|\\s)'+ className + '(\\s|$)');
    return reg.test(el.className)
}

/**
 * 获取/设置自定义属性
 * @param el
 * @param name
 * @param val
 * @returns {*}
 */
export function getData(el, name, val) {
    name = 'data-'+ name;
    return val ? el.setAttribute(name, val) : el.getAttribute(name);
}

const elementStyle = document.createElement('div').style;

/**
 *  计算前缀
 * @type {*|boolean}
 */
const vendor = (() => {
    const transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }
    return false
})();

/**
 * 自动添加前缀
 * @param style
 * @returns {*}
 */
export function prefixStyle(style) {
    if (vendor === false) {
        return false
    }
    if (vendor === 'standard') {
        return style
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}