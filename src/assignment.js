require("@babel/polyfill");
const request = require('request-promise-native');
const base = require('./base')

const Model = base.Model
const Manager = base.Manager

class Assignment extends Model {};

class AssignmentManager extends Manager {
    defaultQuery = "applicationNumber"
    docLocation = "docs"
    modelClass = Assignment

    async fetchPage(pageNumber) {
        let response = await request.get({
            url: "https://assignment-api.uspto.gov/patent/advancedSearch",
            qs: {...{start: pageNumber * 20, rows: 20, facet: false}, ...this.params},
            strictSSL: false
        })

        return this.objectFromXml(response)
    }

    async length() {
        return await this.getPage(0).length
    }

    objectFromXml = (xml_str) => {
        let parser = new DOMParser()
        let xml_obj = parser.parseFromString(xml_str, "application/xml")
        let docs = Array.from(xml_obj.getElementsByTagName("doc")).map(this.parseDoc);
        let length = parseInt(xml_obj.getElementsByTagName("result")[0].getAttribute("numFound"), 10)
        return {
            length: length,
            docs: docs,
        }
    }

    parseDoc = (doc) => {
        return Array.from(doc.childNodes.values())
            .reduce((obj, node) => {
                obj[node.getAttribute("name")] = this.parseChild(node); 
                return obj
            }, {})
    }

    parseChild = (node) => {
        switch (node.nodeName) {
            case "arr":
                return Array.from(node.childNodes.values()).map(node => this.parseChild(node));
            case "date":
                return new Date(node.textContent);
            default:
                return node.textContent;
        }
    }
};

Assignment.objects = new AssignmentManager({})

module.exports = {
    Assignment: Assignment,
}