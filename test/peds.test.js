const peds = require("../src/peds");
const USApplication = peds.USApplication

test("can get an application", async () => {
    let app = await USApplication.objects.get("12342091")
    expect(app.patentNumber).toBe("8577933");
})

test("can get multiple applications for an assignee", async () => {
    let iterator = USApplication.objects.filter({"firstNamedApplicant": "Tesla", "limit": 5})
    let counter = 0;
    for await (let app of iterator) {
        counter += 1;
    }
    expect(counter).toBe(5);

})
