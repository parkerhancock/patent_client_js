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
        
        return new this.modelClass(data[index]);
    }
}

module.exports = {
    Model: Model,
    Manager: Manager,
}