const assert = require('assert')

class Tokenizer {
    tokenize(input) {
        let current = 0
        const tokens = []
        while (current < input.length) {
            let char = input[current]
            const type = this.getCharType(char)
            if (type) {
                tokens.push({
                    type,
                    value: char
                })
                current++
                continue
            }

            // 处理数字
            if (isNumber(char)) {
                let value = ''
                while (isNumber(char)) {                    
                    value += char
                    char = input.charAt(++current)
                }
                tokens.push({
                    type: 'number',
                    value
                })
                continue
            }

            // 处理字符串
            if (char === '"') {
                let value = ''

                // 跳过第一个双引号
                char = input.charAt(++current)
                while (char !== '"') { // 暂时不处理双引号转义问题
                    value += char
                    char = input.charAt(++current)
                }
                // 跳过第二个双引号
                current++

                tokens.push({
                    type: 'string',
                    value
                })

                continue
            }

            // 处理标识符、关键字。以字母、$、_ 开头
            if (/[a-zA-Z\$\_]/.test(char)) {
                let value = ''
                while (/[a-zA-Z\d\$\_]/.test(char)) {
                    value += char
                    char = input.charAt(++current)
                }
                tokens.push({
                    type: 'identifier',
                    value
                })
                continue
            }

            // 处理空白符，如果是连续空白符则合并
            if (isWhiteSpace(char)) {
                let value = ''
                while (isWhiteSpace(char)) {
                    value = char
                    char = input.charAt(++current)
                }

                tokens.push({
                    type: 'whitespace',
                    value
                })
                continue
            }

            new Error(`${char} is Unexpected`)
        }
        return tokens
    }
    // 处理括号、分号、大括号、操作符
    getCharType(char) {
        if (['(', ')'].includes(char)) {
            return 'parens'
        }
        if (['{', '}'].includes(char)) {
            return 'brace'
        }
        if (';' === char) {
            return 'sep'
        }
        if (['<', '>', '+', '-', '*', '/', '='].includes(char)) {
            return 'operator'
        }
        return null
    }
}

function isNumber(char) {
    return /\d/.test(char)
}

function isWhiteSpace(char) {
    return /\s/.test(char)
}
tokenizer = new Tokenizer()
tokenizer.tokenize(`var a = 1`)

// -----------------
// Test

assert.deepStrictEqual(tokenizer.tokenize(`var a = 1`), [
    { type: 'identifier', value: 'var' },
    { type: 'whitespace', value: ' ' },
    { type: 'identifier', value: 'a' },
    { type: 'whitespace', value: ' ' },
    { type: 'operator', value: '=' },
    { type: 'whitespace', value: ' ' },
    { type: 'number', value: '1' }
])
console.log('All assertions passed')