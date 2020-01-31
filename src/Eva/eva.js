const assert = require('assert')
const Environment = require('./Environment')

class Eva {
    constructor(global = new Environment()) {
        this.global = global
    }

    eval(exp, env = this.global) {
        // ---------------------
        // Self evaluating expression
        if (isNumber(exp)) {
            return exp
        }
        if (isString(exp)) {
            return exp.slice(1, -1)
        }

        // -------------------
        // Math expression
        if (exp[0] === '+') {
            return this.eval(exp[1]) + this.eval(exp[2])
        }
        if (exp[0] === '*') {
            return this.eval(exp[1]) * this.eval(exp[2])
        }

        // -------------------
        // variable declaration
        if (exp[0] === 'var') {
            const [_, name, value] = exp
            return env.define(name, this.eval(value))
        }

        if (isVariableName(exp)) {
            return env.lookup(exp)
        }

        throw 'Unimplemented'
    }
}

function isNumber(exp) {
    return typeof exp === 'number'
}
function isString(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"'
}
function isVariableName(exp) {
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z_]*$/.test(exp)
}

// ----------------------------------
// Test.

const eva = new Eva(new Environment({
    null: null,

    true: true,
    false: false,

    VERSION: '0.1'
}))

assert.strictEqual(eva.eval(1), 1)
assert.strictEqual(eva.eval('"hello"'), 'hello')

// Math expression
assert.strictEqual(eva.eval(['+', 1, 5]), 6)
assert.strictEqual(eva.eval(['+', ['+', 1, 2], 3]), 6)

// variable declaration
assert.strictEqual(eva.eval(['var', 'a', 1]), 1)

// variable access
assert.strictEqual(eva.eval('a'), 1)
assert.strictEqual(eva.eval(['var', 'b', 'true']), true)

console.log('All assertions passed')
