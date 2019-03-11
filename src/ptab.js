const request = require('request-promise-native');

class PtabModel {
    constructor(data) {
        var dates = ["filingDate", "accordedFlingDate", "institutionDecisionDate"];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var field = data[key]
                if (dates.indexOf(key) > -1) {
                    field = new Date(field);
                }
                this[key] = field;
            }
        }
    }
}

class PtabManager {
    constructor(params, defaultQuery) {
        if (typeof params === 'string' || params instanceof String) {
            this.params = {
                [defaultQuery]: params
            };
        } else {
        this.params = params;
        };
        this.defaultQuery = defaultQuery
        this.iteratorIndex = 0;
        this.pages = {};
    }

    filter(params) {
        if (typeof params === 'string' || params instanceof String) {
            params = {[this.defaultQuery]: params}
        }
        console.log(this.prototype)
        return this.prototype.call(params)
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
        let page = await getPage(pageNumber)
        return new this.modelClass(page[index])
    }

    async get(params) {
        let manager = this.filter(params);
        return manager.next();
    }




}

class PtabTrial extends PtabModel {};

class PtabTrialManager extends PtabManager {
    constructor(params) {
        super(params, "trialNumber")
        this.endpoint = "trials"
        this.modelClass = PtabTrial
    }

    /*
    async get(params) {
        var manager = new PtabTrialManager(params)
        return request.get({url: "https://ptabdata.uspto.gov/ptab-api/" + this.endpoint, 
        qs: manager.params,
        json: true,
        }).then(response => {return new PtabTrial(response.results[0])})
    }
    */
}

class PtabDocumentManager {

}




PtabTrial.objects = new PtabTrialManager({})





module.exports = {
    PtabTrial: PtabTrial,
}