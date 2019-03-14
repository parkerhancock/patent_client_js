const pc = require("../src/assignment");
const Assignment = pc.Assignment

test("can get an assignment", () => {
    return Assignment.objects.get("14476402").then( data => {
        expect(data.patAssigneeNameFirst).toBe("AMERICAN EXPRESS TRAVEL RELATED SERVICES COMPANY, INC.");
    })
}, 10000)

test("can get multiple assignments from an owner name", () => {
    return Assignment.objects.filter({"ownerName": "American Express"}).length().then( len => {
        expect(len).toBeGreaterThan(2000)
    })
}, 20000)