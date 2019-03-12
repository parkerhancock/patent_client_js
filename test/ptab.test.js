const ptab = require("../src/ptab");
const PtabTrial = ptab.PtabTrial
const PtabDocument = ptab.PtabDocument

test("can get a trial", () => {
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
    return PtabTrial.objects.get("IPR2016-00831").then( data => {
        expect(data.trialNumber).toBe("IPR2016-00831");
        expect(data.patentNumber).toBe("6162705");
        expect(data.filingDate.getTime()).toBe(new Date("2016-04-01").getTime());
    })
});

test("can get a trial from a patent number", () => {
    return PtabTrial.objects.get({patentNumber: "6162705"}).then(trial => {
        expect(trial.trialNumber).toBe("IPR2016-00831");
    })
})

test("can get documents for a trial", () => {
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
    return PtabDocument.objects.get("IPR2016-00831").then( data => {
        expect(data.trialNumber).toBe("IPR2016-00831")
        expect(data.title).toBe("U.S. Provisional Application No. 60/046,276")
        expect(data.sizeInBytes).toBe(3226184)
        expect(data.filingParty).toBe("petitioner")
        expect(data.filingDatetime.getTime()).toBe(new Date("2016-04-01T15:59:39").getTime())
    })
})

test("can get documents from a trial", () => {
    return PtabTrial.objects.get("IPR2016-00831").then(data => data.documents.next()).then(data => {
        expect(data.title).toBe("U.S. Provisional Application No. 60/046,276")
    })
})

test("can get trial from a document", ()=>{
    return PtabDocument.objects.filter("IPR2016-00831").next().then(doc => {
        doc.trial.get().then(trial => expect(trial.trialNumber).toBe("IPR2016-00831"))
    }
    )
})

test("can iterate through documents", () => {
    return PtabTrial.objects.get("IPR2016-00831").then(trial => {
        trial.documents.length().then(length => expect(length).toBe(82))
        let docs = Array(3);
        for (let i=0; i < 3; i++) {
            docs[i] = trial.documents.next()
        }
        return Promise.all(docs)
    }).then(data => {
        let doc_nums = data.map(doc => doc.documentNumber, data)
        expect(doc_nums).toEqual(['1009', '3', '1008'])
    })
})