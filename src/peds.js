require("@babel/polyfill");
const request = require('request-promise-native');
const base = require('./base')

class USApplication extends base.Model {};

class USApplicationManager extends base.Manager {
    modelClass = USApplication
    defaultQuery = "applId"
    docLocation = "response.docs"

    async fetchPage(pageNumber) {
        let response = await request.post({
            url: "https://ped.uspto.gov/api/queries",
            body: this.getQuery(pageNumber),
            json: true,
        })
        return response.queryResults.searchResponse
        
    }

    async length(){
        if (this.params.limit) {
            return this.params.limit
        }
        let page = await this.getPage(0)
        return page.response.numFound
    }

    getQuery(pageNumber) {
        let query = {
            qf:"appEarlyPubNumber applId appLocation appType appStatus_txt appConfrNumber appCustNumber appGrpArtNumber appCls appSubCls appEntityStatus_txt patentNumber patentTitle primaryInventor firstNamedApplicant appExamName appExamPrefrdName appAttrDockNumber appPCTNumber appIntlPubNumber wipoEarlyPubNumber pctAppType firstInventorFile appClsSubCls rankAndInventorsList",
            facet:"false",
            sort:"applId asc",
            start: pageNumber * 20,
        }
        function reducer(accumulator, param) {
            let [field, query] = param
            if (field == "limit") {
                return accumulator
            } else {
                return accumulator + `${field}:(${query}) `
            }
        }
        query.searchText = Object.entries(this.params).reduce(reducer, "")
        return query
    }
};

USApplication.objects = new USApplicationManager({});

module.exports = {
    USApplication: USApplication
}