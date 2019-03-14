const peds = require("../src/peds");
const USApplication = peds.USApplication

test("can get an application", () => {
    return USApplication.objects.get("12342091").then( data => {
        expect(data.patentNumber).toBe("8577933");
    })
})