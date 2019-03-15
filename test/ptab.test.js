const ptab = require("../src/ptab");
const PtabTrial = ptab.PtabTrial
const PtabDocument = ptab.PtabDocument

test("can get a trial", async () => {
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
    let trial = await PtabTrial.objects.get("IPR2016-00831")
    expect(trial.trialNumber).toBe("IPR2016-00831");
    expect(trial.patentNumber).toBe("6162705");
    expect(trial.filingDate.getTime()).toBe(new Date("2016-04-01").getTime());
});

test("can get a trial from a patent number", async () => {
    let trial = await PtabTrial.objects.get({patentNumber: "6162705"})
    expect(trial.trialNumber).toBe("IPR2016-00831");
})

test("can get documents for a trial", async () => {
    /* Document JSON expected
      trialNumber: 'IPR2016-00831',
      sizeInBytes: 3226184,
      filingParty: 'petitioner',
      filingDatetime: '2016-04-01T15:59:39',
      lastModifiedDatetime: '2016-04-06T13:50:24',
      documentNumber: '1009',
      title: 'U.S. Provisional Application No. 60/046,276',
      mediaType: 'application/pdf',
      id: 230910,
      type: 'exhibit',
    */
    let data = await PtabDocument.objects.get("IPR2016-00831")
    expect(data.trialNumber).toBe("IPR2016-00831")
    expect(data.title).toBe("U.S. Provisional Application No. 60/046,276")
    expect(data.sizeInBytes).toBe(3226184)
    expect(data.filingParty).toBe("petitioner")
    expect(data.filingDatetime.getTime()).toBe(new Date("2016-04-01T15:59:39").getTime())
})

test("can get documents from a trial", async () => {
    let data = await PtabTrial.objects.get("IPR2016-00831")
    let document = await data.documents.first()
    expect(document.title).toBe("U.S. Provisional Application No. 60/046,276")
})

test("can get trial from a document", async ()=>{
    let doc = await PtabDocument.objects.filter("IPR2016-00831").first()
    let trial = await doc.trial.get()
    expect(trial.trialNumber).toBe("IPR2016-00831")
})

test("can iterate through documents", async () => {
  let trial = await PtabTrial.objects.get("IPR2016-00831");
  let document_manager = trial.documents.filter({limit: 3})
  let doc_nums = new Array()
  for await (const doc of document_manager) {
    doc_nums.push(doc.documentNumber)
  }
  expect(doc_nums).toEqual(['1009', '3', '1008'])
})


test("can iterate through trials", async () => {
    let manager = PtabTrial.objects.filter({limit: 5, sort:"filingDate"});
    let counter = 0;
    let trialNumbers = [
      "CBM2012-00001",
      "CBM2012-00002",
      "CBM2012-00003",
      "CBM2012-00004",
      "IPR2012-00001",
    ]
    for await (const trial of manager) {
        expect(trial.trialNumber).toBe(trialNumbers[counter])
        counter += 1
    };
    expect(counter).toBe(5)
});
