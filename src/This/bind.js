function selfBind(context) {
    if(typeof this !== 'function') {
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
    var FNOP = function() {}
    FNOP.prototype = this.prototype
    fBound.prototype = new FNOP()
    return fBound
}