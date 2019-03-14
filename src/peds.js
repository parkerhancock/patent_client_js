require("@babel/polyfill");
const request = require('request-promise-native');
const base = require('./base')

const Model = base.Model
const Manager = base.Manager

class USApplication extends Model {};

class USApplicationManager extends Manager {
    modelClass = USApplication
    defaultQuery = "applId"
    docLocation = "queryResults.searchResponse.response.docs"

    async fetchPage(pageNumber) {
        return await request.post({
            url: "https://ped.uspto.gov/api/queries",
            body: this.getQuery(pageNumber),
            json: true,
        })
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
            return accumulator + `${field}:(${query}) `
        }
        query.searchText = Object.entries(this.params).reduce(reducer, "")
        return query
    }
};

USApplication.objects = new USApplicationManager({});

module.exports = {
    USApplication: USApplication
}