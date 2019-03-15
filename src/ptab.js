require("@babel/polyfill")
const request = require('request-promise-native');
const base = require('./base')

class PtabDocument extends base.Model {
    constructor(params){
        super(params)
        this.trial = PtabTrial.objects.filter(this.trialNumber)
    }
};
class PtabTrial extends base.Model {
    constructor(params){
        super(params)
        this.documents = PtabDocument.objects.filter(this.trialNumber)
    }
};

class PtabManager extends base.Manager {

    async fetchPage (pageNumber) {
        return await request.get({
            url: "https://ptabdata.uspto.gov/ptab-api/" + this.endpoint,
            qs:  {...this.params, ...{offset: pageNumber * 25}},
            json: true,
        })
    }

    async length() {
        if (this.params.hasOwnProperty('limit')) {
            return this.params.limit;
        };
        let page = await this.getPage(0)
        return page.metadata.count
    }
}

class PtabTrialManager extends PtabManager {
    defaultQuery = "trialNumber"
    endpoint = "trials"
    modelClass = PtabTrial
}

class PtabDocumentManager extends PtabManager {
    defaultQuery = "trialNumber"
    endpoint = "documents"
    modelClass = PtabDocument
}


PtabTrial.objects = new PtabTrialManager({});
PtabDocument.objects = new PtabDocumentManager({});

module.exports = {
    PtabTrial: PtabTrial,
    PtabDocument: PtabDocument
}