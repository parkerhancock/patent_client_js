const peds = require("../src/peds");
const USApplication = peds.USApplication

test("can get an application", () => {
    return USApplication.objects.get("12342091").then( data => {
        expect(data.patentNumber).toBe("8577933");
    })
})

test("can get multiple applications for an assignee", async () => {
    let iterator = USApplication.objects.filter({"firstNamedApplicant": "Tesla"})
    let counter = 0;
    for await (let app of iterator) {
        console.log(app.patentTitle)
        counter += 1;
    }
    expect(counter).toBeGreaterThan(100);

})