const ptab = require("./lib/ptab")
const assignment = require("./lib/assignment")
const peds = require("./lib/peds")

module.exports = {
    PtabTrial: ptab.PtabTrial,
    PtabDocument: ptab.PtabDocument,
    Assignment: assignment.Assignment,
    USApplication: peds.USApplication,
    version: "1.1.5",
}