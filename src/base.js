require("@babel/polyfill");

class Model {
    constructor(data) {
        for (var key of Object.keys(data)) {
            this[key] = (key.includes("Date") ? new Date(data[key]) : data[key]);
        }
    }
}

class Manager {
    constructor(params) {
        this.params = this.applyDefaultQuery(params);
        this.iteratorIndex = 0;
        this.pages = {};
    }

    filter(params) {
        return this.constructor({...this.params, ...this.applyDefaultQuery(params)})
    }

    applyDefaultQuery(params) {
        if (typeof params === 'string' || params instanceof String) {
            params = {[this.defaultQuery]: params}
        } 
        return params
    }

    async get(params) {
        let manager = this.filter(params);
        return await manager.next();
    }

    async getPage(pageNumber) {
        if (!(pageNumber in this.pages)) {
            this.pages[pageNumber] = await this.fetchPage(pageNumber)
        }
        return this.pages[pageNumber]
    }    

    async next() {
        return await this[Symbol.asyncIterator].next()
        /*
        let pageNumber = Math.floor(this.iteratorIndex / 20);
        let index = this.iteratorIndex % 20;
        this.iteratorIndex++
        let page = await this.getPage(pageNumber);
        let data = null
        if (this.docLocation) {
            data = this.docLocation.split(".").reduce((agg, next) => agg[next], page)
        } else {
            data = page
        }
        let length = await this.length()
        let done = this.iteratorIndex >= await length - 1
        
        return new (this.modelClass(data[index]), done);
        */
    }
}

async function* iterateManager(manager) {
    let length = await manager.length()
    for (let i = 0; i < length; i++) {
        let pageNumber = Math.floor(manager.iteratorIndex / 20);
        let position = manager.iteratorIndex % 20;
        let page = await manager.getPage(pageNumber);
        let data = null
        if (manager.docLocation) {
            data = manager.docLocation.split(".").reduce((agg, next) => agg[next], page)
        } else {
            data = page
        }
        yield data[position]
    }
}

module.exports = {
    Model: Model,
    Manager: Manager,
}