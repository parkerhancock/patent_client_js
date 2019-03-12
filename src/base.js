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
        this.params = this.constructor.applyDefaultQuery(params);
        this.iteratorIndex = 0;
        this.pages = {};
    }

    filter(params) {
        return this.constructor({...this.params, ...this.constructor.applyDefaultQuery(params)})
    }

    static applyDefaultQuery(params) {
        if (typeof params === 'string' || params instanceof String) {
            params = {trialNumber: params}
        } 
        return params
    }

    async get(params) {
        let manager = this.filter(params);
        return await manager.next();
    }
}

module.exports = {
    Model: Model,
    Manager: Manager,
}