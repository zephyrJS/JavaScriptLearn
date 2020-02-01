function selfCall(context) {
    context = context || window
    context.fn = this
    var args = []
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']')
    }
    var res = eval('context.fn(' + args + ')')
    delete context.fn
    return res
}

function selfApply(context, arr) {
    context = context || window
    context.fn = this
    var res
    if (!arr) {
        res = context.fn()
    } else {
        var args = []
        for (var i = 0; i < arr.length; i++) {
            args.push('arr[' + i + ']')
        }
        eval('context.fn(' + args + ')')
    }
    delete context.fn
    return res
}