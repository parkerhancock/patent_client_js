require("@babel/polyfill")
const request = require('request-promise-native');
const base = require('./base')

const Model = base.Model

class PtabTrial extends Model {};

let PtabManager = class {
    constructor (params) {
        this.params = this.applyDefaultQuery(params);
        this.iteratorIndex = 0;
        this.pages = {}
        this.defaultQuery = "trialNumber"
        this.endpoint = "trials"
        this.modelClass = PtabTrial
    }
}

PtabManager.prototype.applyDefaultQuery = function (params) {
    if (typeof params === 'string' || params instanceof String) {
        params = {[this.defaultQuery]: params}
    } 
    return params
}

PtabManager.prototype.filter = function (params) {
    return new this.constructor({...this.params, ...this.applyDefaultQuery(params)})
}

PtabManager.prototype.getPage = async function (pageNumber) {
    if (!(pageNumber in this.pages)) {
        this.pages[pageNumber] = await this.fetchPage(pageNumber)
    }
    return this.pages[pageNumber]
}

PtabManager.prototype[Symbol.asyncIterator] = async function* () {
    let length = await this.length()
    for (let i = 0; i < length; i++) {
        let pageNumber = Math.floor(this.iteratorIndex / 20);
        let position = this.iteratorIndex % 20;
        let page = await this.getPage(pageNumber);
        let data = null
        if (this.docLocation) {
            data = this.docLocation.split(".").reduce((agg, next) => agg[next], page)
        } else {
            data = page
        }
        yield data[position]
    };
}

PtabManager.prototype.fetchPage = async function (pageNumber) {
    return await request.get({
        url: "https://ptabdata.uspto.gov/ptab-api/" + this.endpoint,
        qs:  {...this.params, ...{offset: pageNumber * 25}},
        json: true,
    })
};

PtabManager.prototype.length = async function () {
    let page = await this.getPage(0)
    return page.metadata.count
}

PtabTrial.objects = new PtabManager({});

module.exports = {
    PtabTrial: PtabTrial
}