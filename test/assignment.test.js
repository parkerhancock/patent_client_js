const pc = require("../src/assignment");
const Assignment = pc.Assignment

test("can get an assignment", async () => {
    let assignment = await Assignment.objects.get("14476402")
    expect(assignment.patAssigneeNameFirst).toBe("AMERICAN EXPRESS TRAVEL RELATED SERVICES COMPANY, INC.");
}, 10000)

test("can get multiple assignments from an owner name", async () => {
    let manager = Assignment.objects.filter({"ownerName": "American Express"})
    let length = await manager.length()
    expect(length).toBeGreaterThan(2000)
    let limited = manager.filter({limit: 5})
    let rfNums = new Array()
    for await (const assignment of limited) {
        rfNums.push(assignment.id)
    }
    expect(rfNums).toEqual([
        "44207-319",
        "43564-381",
        "43548-43",
        "47152-133",
        "43347-993",
        ])
}, 20000)
