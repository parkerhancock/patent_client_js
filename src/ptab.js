require("@babel/polyfill");
const request = require('request-promise-native');

class PtabModel {
    constructor(data) {
        for (var key of Object.keys(data)) {
            this[key] = (key.includes("Date") ? new Date(data[key]) : data[key]);
        }
    }
}

class PtabManager {
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

    async length() {
        let page = await this.getPage(0)
        return page.metadata.count
    }

    async getPage(pageNumber) {
        if (!(pageNumber in this.pages)) {
            let page = await request.get({
                url: "https://ptabdata.uspto.gov/ptab-api/" + this.endpoint,
                qs:  {...this.params, ...{offset: pageNumber * 25}},
                json: true,
            })
            this.pages[pageNumber] = page
        }
        return this.pages[pageNumber]
    }

    async next() {
        let pageNumber = Math.floor(this.iteratorIndex / 25);
        let index = this.iteratorIndex % 25;
        this.iteratorIndex++
        let page = await this.getPage(pageNumber);
        return new this.modelClass(page.results[index]);
    }

    async get(params) {
        let manager = this.filter(params);
        return await manager.next();
    }
}

class PtabTrial extends PtabModel {
    constructor(params){
        super(params)
        this.documents = PtabDocument.objects.filter(this.trialNumber)
    }
};

class PtabTrialManager extends PtabManager {
    defaultQuery = "trialNumber"
    endpoint = "trials"
    modelClass = PtabTrial
}

class PtabDocument extends PtabModel {
    constructor(params){
        super(params)
        this.trial = PtabDocument.objects.filter(this.trialNumber)
    }
};

class PtabDocumentManager extends PtabManager {
    defaultQuery = "trialNumber"
    endpoint = "documents"
    modelClass = PtabDocument
}
PtabTrial.objects = new PtabTrialManager({})
PtabDocument.objects = new PtabDocumentManager({})

module.exports = {
    PtabTrial: PtabTrial,
    PtabDocument: PtabDocument,
}