function selfBind(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Function prototype bind - what is trying to be bound is not callable!')
    }
    var self = this // 调用 bind 的 func
    var args = Array.prototype.slice.call(arguments, 1)
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(
            this instanceof fBound ? this : context,
            args.concat(bindArgs)
        )
    }
    var FNOP = function () { }
    FNOP.prototype = this.prototype
    fBound.prototype = new FNOP()
    return fBound
}

// 软绑定，如果绑定丢失则指向给定的对象，否则使用默认绑定
function softBind(Obj) {
    const args = Array.prototype.slice.call(arguments, 1)
    const fn = this
    let bound = function () {
        return fn.apply(
            (!this || this === (window || undefined)) ? Obj : this,
            args.concat.apply(args, arguments)
        )
    }
    bound.prototype = Obj.create(fn.prototype)
    return bound
}