const { getCheckItems, updateCheckItem } = require("../api.js")

let cardID = "664e365cdce19138025824e0"
let checklistID = "664e366ac441959b2a62cb4f";

getCheckItems(checklistID)
    .then((checkItems) => {
        return checkItems.reduce((promise, item) => {
            return promise.then(() => {
                return updateCheckItem(cardID, item.id, false)
            })
        }, Promise.resolve())
    })
    .then(() => {
        console.log("All checkItems updated to incomplete successfully");
    })
    .catch((error) => {
        console.log(`Error in updating checkItems state to incomplete, sequentially: ${error}`);
    })
