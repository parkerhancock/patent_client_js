require("@babel/polyfill");

class Model {
    constructor(data) {
        for (var key of Object.keys(data)) {
            this[key] = (key.includes("Date") ? new Date(data[key]) : data[key]);
        }
    }
}

class Manager {
    constructor (params) {
        this.params = this.applyDefaultQuery(params);
        this.pages = {}
        this.docLocation = "results"
    }

    [Symbol.asyncIterator] = async function*() {
        let length = await this.length()
        for (let i = 0; i < length; i++) {
            let pageNumber = Math.floor(i / 20);
            let position = i % 20;
            let page = await this.getPage(pageNumber);
            let data = null
            if (this.docLocation) {
                data = this.docLocation.split(".").reduce((agg, next) => agg[next], page)
            } else {
                data = page
            }
            yield new this.modelClass(data[position])
        }
    }

    applyDefaultQuery(params) {
        if (typeof params === 'string' || params instanceof String) {
            params = {[this.defaultQuery]: params}
        } 
        return params
    }

    filter(params) {
        return new this.constructor({...this.params, ...this.applyDefaultQuery(params)})
    }

    async get(params) {
        let manager = this.filter(params)
        let length = manager.length()
        if (length > 1) {
            throw new Error("More than one object found!")
        } else if (length == 0) {
            throw new Error("No objects found!")
        }
        return manager.first()
    }

    async first() {
        let item = await this[Symbol.asyncIterator]().next()
        return item.value
    }

    async getPage(pageNumber) {
        if (!(pageNumber in this.pages)) {
            this.pages[pageNumber] = await this.fetchPage(pageNumber)
        }
        return this.pages[pageNumber]
    }
};

module.exports = {
    Model: Model,
    Manager: Manager,
}