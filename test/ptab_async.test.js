const ptab = require("../src/ptab_async");
const PtabTrial = ptab.PtabTrial
const PtabDocument = ptab.PtabDocument

test("can iterate through trials", async () => {
    /* Trial JSON expected
    {
      "trialNumber": "IPR2016-00831",
      "applicationNumber": "09026118",
      "patentNumber": "6162705",
      "petitionerPartyName": "Commissariat a l’Energie Atomique et aux Energies Alternatives",
      "patentOwnerName": "Silicon Genesis Corporation",
      "inventorName": "FRANCOIS HENLEY",
      "prosecutionStatus": "Terminated-Settled",
      "filingDate": "2016-04-01",
      "accordedFilingDate": "2016-04-01",
      "institutionDecisionDate": "2016-09-28",
      "lastModifiedDatetime": "2017-07-06T16:06:59",
    */
    let manager = PtabTrial.objects.filter({limit: 5});
    let counter = 0;
    console.log(`Manager: ${manager}`)
    for await (const trial of manager) {
        counter += 1
    };
    expect(counter).toBeGreaterThan(5)
});
