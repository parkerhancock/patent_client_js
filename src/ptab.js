require("@babel/polyfill");
const request = require('request-promise-native');
const base = require('./base')

const Model = base.Model
const Manager = base.Manager

class PtabModel extends Model {};

class PtabManager extends Manager {
    docLocation = "results"
    async length() {
        let page = await this.getPage(0)
        return page.metadata.count
    }

    async fetchPage(pageNumber) {
        return await request.get({
            url: "https://ptabdata.uspto.gov/ptab-api/" + this.endpoint,
            qs:  {...this.params, ...{offset: pageNumber * 25}},
            json: true,
        })
    }
};

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