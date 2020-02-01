class Environment {

    /**
     * Creates an instance of Environment with given record.
     * @param {*} [record={}]
     * @memberof Environment
     */
    constructor(record = {}) {
        this.record = record
    }

    /**
     * Created a variable with the given name and value
     *
     * @param {*} name
     * @param {*} value
     * @returns
     * @memberof Environment
     */
    define(name, value) {
        this.record[name] = value
        return value
    }


    /**
     * Return the value of a defined variable, or throws 
     * if the variable is not defined
     *
     * @param {*} name
     * @memberof Environment
     */
    lookup(name) {
        return this.record[name]
    }
}

module.exports = Environment