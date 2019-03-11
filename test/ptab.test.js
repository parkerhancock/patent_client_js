const ptab = require("../src/ptab");
PtabTrial = ptab.PtabTrial
test("can get a trial", () => {
    return PtabTrial.objects.get("IPR2016-00831").then( data => {
        expect(data.trialNumber).toBe("IPR2016-00831");
        expect(data.patentNumber).toBe("6162705");
        expect(data.filingDate.getTime()).toBe(new Date("2016-04-01").getTime());
    })
});